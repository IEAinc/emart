
/* 사용한 컴포넌트 */
import VideoGeneratorSetting from '../../../components/generator/video/VideoGeneratorSetting.jsx'
import VideoGeneratorPrompt from '../../../components/generator/video/VideoGeneratorPrompt.jsx'
import VideoList from '../../../components/generator/video/VideoList.jsx'
import {useState} from "react";
import {api, errorHandler} from "../../../util/axios.jsx";
import Radio2 from '../../..//assets/images/generate/generate_916.svg?react'
const GenerateContentsVideo = () => {
  const [isGen,setIsGen]=useState(false)
  const [imgUrl,setImgURl]=useState(null)
  const [allVideos, setAllVideos] = useState([
    // {
    //   id: 1,
    //   src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //   alt: 'Big Buck Bunny',
    //   title: '테스트 영상 1',
    // },
  ]); // 전체 이미지
  const [settings, setSettings] = useState({
    model: { label: 'v.1.0', value: 'v.1.0' },
    generateMode: { label: '표준', value: '표준' },
    style: { label: '실사 스타일', value: '실사 스타일'},
    brand: { label: '모던하고 심플한', value: '모던하고 심플한' },
    ratio:     { label: '9:16', value: '9:16', icon: <Radio2 /> },
    resolution: { label: '512*512', value: '512*512' }, // 해상도 기본값
    imageCount: { label: '1', value: '1' },
  });

  // VideoGeneratorSetting에서 전달된 값 업데이트
  const handleSettingsChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    console.log('설정 업데이트:', key, value);
  };

  // VideoGeneratorPrompt에서 전달된 텍스트 추가
  const handleAddText = async ({text, file, previewUrl}) => {
    // text가 문자열인지 확인
    const trimmedText = typeof text === 'string' ? text.trim() : '';

    if (!trimmedText && !file) return;
    console.log(settings)
    setIsGen(true)

    let data = {
      "model": settings.model.value,
      "mode": settings.generateMode.value,
      "style": settings.style.value,
      "tone": settings.brand.value,
      "ratio": settings.ratio.value,
      "resolution": 720,
      "second": Number(settings.imageCount.value),
      "img_url": imgUrl,
      "user_input": text
    }
    let response = null;
    try {
      response = await api.post("/VIDEO/video/makeVideo", data, {})
    } catch (error) {
      console.error('사용자 목록 조회 실패:', errorHandler.handleError(error));
      setIsGen(false)
      return false;
    }
    console.log(response.data.save_url)
    const newItem = {
      id: Date.now(),
      text: trimmedText,
      file: file || null,        // 선택한 이미지 파일
      previewUrl: previewUrl || '', // 미리보기 URL
      src:response.data.save_url,
      settings,                  // 현재 선택된 설정값
    };

    setAllVideos((prev) => {
      //const updated = [...prev, newItem];
      const updated = [newItem];
      console.log('전체 이미지 배열:', updated);
      setIsGen(false)
      return updated;
    });
  };
  
  /* 다운로드 */
  const handleDownload = async () => {
    // S3/CloudFront에 CORS가 열려 있어야 합니다.
    const res = await fetch(allVideos[0].src, {mode: "cors", cache: "no-store"});
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const blob = await res.blob(); // ⚠️ 대용량이면 메모리 부담 큼
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = allVideos[0].id+".mp4"; // 파일명
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(blobUrl);
  }

  return (
    <div className="generator-content-wrap">
      <VideoGeneratorSetting  settings={settings} onChange={handleSettingsChange} />
      <div className="generator-box">
        <VideoList allVideos={allVideos} onDownload={handleDownload} isGenerate={isGen}/>
        <VideoGeneratorPrompt onAddText={handleAddText}  setImgURl={setImgURl} />
      </div>
    </div>
  );
}
export default GenerateContentsVideo;