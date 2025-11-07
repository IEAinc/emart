/**
 * @file VideoUploadPanel.jsx
 * @brief [영상편집 페이지 섹션] 영상 업로드 패널
 */
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Panel from './internal/Panel.jsx'; // 영상 편집 공통 패널

const VideoUploadPanel = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    const videoFiles = acceptedFiles.filter(file => file.type.startsWith('video/'));
    if (videoFiles.length > 0) {
      onFileUpload(videoFiles);
    }

    if (fileRejections && fileRejections.length > 0) {
      alert('파일 확장자를 확인해주세요.');
      // alert('파일 확장자를 확인해주세요. (mp4, mov, wmv, avi, mkv)');
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { 'video/*': ['.mp4', '.mov', '.wmv', '.avi', '.mkv'] },
    noClick: true,
    noKeyboard: true,
  });

  const openFileDialog = () => {
    open(); //react-dropzone open 함수 사용
  };

  return (
    <Panel title="동영상 업로드" className="video-upload-panel">
      <div className="upload-section" {...getRootProps()}>
        <input {...getInputProps()} id="video-file-input" style={{ display: 'none' }} />
        <span className="video-img alone">동영상 업로드</span>
        <p>동영상 업로드</p>
        <button type="button" className="btn video-upload-btn" onClick={openFileDialog}>
          파일선택
        </button>
        <span>MP4, MOV 등 대부분의 영상을 지원합니다.</span>
      </div>
      <div className="work-guide-section">
        <div className="guide-title">작업가이드</div>
        <ul>
          <li>동영상을 드래그 앤 드롭하거나 파일 선택 버튼을 사용하세요.</li>
          <li>타임라인에 자동으로 추가되며 순서를 자유롭게 조절할 수 있습니다.</li>
        </ul>
      </div>
    </Panel>
  );
};

export default VideoUploadPanel;