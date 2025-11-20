/**
 * @file EditContentsVideo.jsx
 * @brief 콘텐츠 편집 > 영상 편집 페이지 (메인)
 */
import { useState } from 'react';

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import VideoUploadPanel from '../../../components/edit/VideoUploadPanel.jsx'; // 1. 동영상 업로드
import VideoPreviewPanel from '../../../components/edit/VideoPreviewPanel.jsx'; // 2. 미리보기
import VideoTimelinePanel from '../../../components/edit/VideoTimelinePanel.jsx'; // 3. 타임라인
import EditorFooter from '../../../components/edit/EditorFooter.jsx'; // 4. 하단 버튼
import Loading from "../../../components/edit/internal/Loading.jsx";
import {api, errorHandler} from "../../../util/axios.jsx";
// metadata : 비디오 길이(duration) / 1초 시점의 썸네일(thumbnail) 추출
const getVideoMetadata = (file) => {

    return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        const canvas = document.createElement("canvas");
        const url = URL.createObjectURL(file);

        video.preload = "metadata";
        video.src = url;

        video.onloadedmetadata = () => {
            const duration = isFinite(video.duration) ? video.duration : 0;

            // 메타데이터는 있음 → seek 가능한지 확인
            if (video.readyState < 1) {
                // HAVE_METADATA
                reject(new Error("Video metadata loaded but video is not ready for seeking."));
                URL.revokeObjectURL(url);
                return;
            }

            // 너무 0초면 seeking 오류 → 0이 아닌 최소값
            video.currentTime = Math.min(0.1, Math.max(0.01, duration / 20));
        };

        video.onseeked = () => {
            try {
                if (!video.videoWidth) {
                    URL.revokeObjectURL(url);
                    resolve({ duration: video.duration, thumbnail: null });
                    return;
                }

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext("2d").drawImage(video, 0, 0);

                const thumbnail = canvas.toDataURL("image/jpeg", 0.8);
                URL.revokeObjectURL(url);

                resolve({
                    duration: video.duration,
                    thumbnail,
                });

            } catch (err) {
                URL.revokeObjectURL(url);
                reject(err);
            }
        };

        video.onerror = () => {
            alert("파일 확장자 또는 인코딩을 확인해주세요")
            console.log("VIDEO ERROR", video.error);
        };

    });
};

const EditContentsVideo = () => {
  const [clips, setClips] = useState([]); // 클립 배열
  const [previewVideoUrl, setPreviewVideoUrl] = useState(null); // 병합 후 생성된 영상의 URL
  const [isLoading, setIsLoading] = useState(false); // 병합 또는 다운로드 진행 중 상태 

  const sensors = useSensors( // dnd-kit sensor
    useSensor(PointerSensor, { // 마우스/터치 입력 감지
      activationConstraint: {
        distance: 5, // 5px 이상 움직여야 드래그 시작 (수정 가능)
      },
    })
  );

  // 업로드 > clips 상태 업데이트
  const handleFileUpload = async (newFiles) => {
    const processingPromises = newFiles.map(async (file) => {
      try {
        const { duration, thumbnail } = await getVideoMetadata(file); // 메타데이터 추출
        return {
          id: `clip-${Date.now()}-${Math.random()}`,
          file: file,
          url: URL.createObjectURL(file), // 해제 필요(메모리 누수 방지)
          name: file.name, //파일명
          duration: duration, // 영상 길이
          thumbnail: thumbnail // 썸네일 dataURL
        };
      } catch (error) {
        console.error("error:", file.name, error);
        return null;
      }
    });

    const processedClips = (await Promise.all(processingPromises))
      .filter(clip => clip !== null);
    setClips(prevClips => [...prevClips, ...processedClips]);
  };

  // clips 배열 순서 변경
  const handleDragEnd = (event) => {
    const { active, over } = event; // active :들고 있는 객체, over :내려놓은 객체

    if (!over || active.id === over.id) return;

    const oldIndex = clips.findIndex(item => item.id === active.id); // 기존 인덱스 찾기
    const newIndex = clips.findIndex(item => item.id === over.id); // 변경 후 인덱스 찾기

    setClips((items) => arrayMove(items, oldIndex, newIndex));
  };

  // 영상 병합
  const handleMerge = async () => {

     if (isLoading) return;
     setIsLoading(true);
     let files=[]
      const formData = new FormData();
      clips.forEach(e=>{
          formData.append('files', e.file);
      })
      let response=null;
      try {
          response = await api.post("/VIDEO/video/concatenate", formData, {headers: {
                  "Content-Type": "multipart/form-data", // 생략해도 됨
              }, responseType: 'blob',timeout: 1800000})
          const blob = await response.data;
          console.log("blot"+blob)
          console.log("URL.createObjectURL(blob)"+URL.createObjectURL(blob))
          setPreviewVideoUrl(URL.createObjectURL(blob))
          setIsLoading(false);
      } catch (error) {
          setIsLoading(false);
          console.error('사용자 목록 조회 실패:', errorHandler.handleError(error));

      }

    // ------ (서버 API 호출 로직) 참고용 임시로직 ------ clips 데이터-> formData
    // const formData = new FormData();
    // clips.forEach(clip => {
    //   formData.append('videos', clip.file);
    // });
    // formData.append('order', JSON.stringify(clips.map(clip => clip.id)));
    // try {
    //   const response = await api.post("/VIDEO/mergeVideo", formData);
    //   setPreviewVideoUrl(response.data.save_url);
    // } catch (error) {
    //   console.error('병합 실패:', error);
    // } finally {
    //   setIsLoading(false);
    // }
    // -----------------------------------------------

  };

  // 영상 다운로드
  const handleDownload = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch(previewVideoUrl, { mode: "cors", cache: "no-store" });
      const blob = await res.blob(); // Blob으로 변환
      const blobUrl = URL.createObjectURL(blob); // 로컬 URL 브라우저 메모리에 생성
      const a = document.createElement("a");

      a.style.display = 'none'; // 앵커태그 생성
      a.href = blobUrl;

      const now = new Date(); //파일명 날짜, 시간 계산
      const MM = (now.getMonth() + 1).toString().padStart(2, '0');
      const DD = now.getDate().toString().padStart(2, '0');
      const HH = now.getHours().toString().padStart(2, '0');
      const mm = now.getMinutes().toString().padStart(2, '0');
      const timestamp = `${MM}${DD}${HH}${mm}`;

      a.download = `${timestamp}_IGEN_VIDEO_MERGE.mp4`;// 파일명 : MMDDHHMM_IGEN_VIDEO_MERGE.mp4

      document.body.appendChild(a); //
      a.click(); // 클릭 ->  파일 다운로드 시작
      a.remove(); // DOM에서 앵커태그 제거
      URL.revokeObjectURL(blobUrl); // 임시 Blob URL 해제(메모리 누수 방지)

      setIsLoading(false);
    } catch (error) {
      console.error("다운로드 중 오류 발생:", error);
      alert("파일을 다운로드하는 데 실패했습니다.");
    }
  };

  // 영상 클립 카드 제거
  const handleRemoveClip = (clipId) => {
    setClips((prevClips) => {
      const clipToRemove = prevClips.find(clip => clip.id === clipId);

      if (clipToRemove && clipToRemove.url) {
        URL.revokeObjectURL(clipToRemove.url);
      }
      return prevClips.filter(clip => clip.id !== clipId);// 새 배열 반환
    });
  };

  return (
    <div className="video-editor-container">
      {isLoading && (
        <div className="loading-overlay-wrapper">
          <Loading />
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="video-editor-layout">
          <div className="top-row">
            <VideoUploadPanel onFileUpload={handleFileUpload} />
            <VideoPreviewPanel videoUrl={previewVideoUrl} isLoading={isLoading} />
          </div>
          <div className="bottom-row">
            {clips.length > 0 ? (
              <SortableContext
                items={clips.map(c => c.id)}
                strategy={horizontalListSortingStrategy}
              >
                <VideoTimelinePanel
                  clips={clips}
                  onRemoveClip={handleRemoveClip}
                />
              </SortableContext>
            ) : (
              <VideoTimelinePanel // 선택된 영상 없을 때 배열 비우기
                clips={[]}
                onRemoveClip={handleRemoveClip}
              />
            )}
          </div>

        </div>
      </DndContext>
      <EditorFooter
        onMerge={handleMerge} // 병합
        onDownload={handleDownload} // 다운로드
        isDownloadable={!!previewVideoUrl} // 병합된 영상이 없으면 다운로드 버튼 disabled
        isMergeDisabled={clips.length <= 1} // 영상 1개 이하 일 때 병합버튼 disabled
      />
    </div>
  );
};

export default EditContentsVideo;