/**
 * @file VideoPreviewPanel.jsx
 * @brief [영상편집 페이지 섹션] 영상 미리보기 패널
 */
import Panel from './internal/Panel.jsx'; // 영상 편집 공통 패널

const VideoPreviewPanel = ({ videoUrl }) => {
  return (
    <Panel title="미리보기" className="video-preview-panel">
      <div className="preview-box">
        {!videoUrl && (
          <div className="placeholder">
            병합 결과가 준비되면 이곳에서 재생됩니다.
          </div>
        )}
        {/* videoUrl이 있으면 영상 재생 (조건 수정 가능) */}
        {videoUrl && (
          <video key={videoUrl} src={videoUrl} controls autoPlay muted loop />
        )}
      </div>
      <div className="merge-guide-section">
        <div className="guide-title">병합 안내</div>
        <ul>
          <li>좌측에서 영상을 업로드하고 순서를 조정하세요.</li>
          <li>완료되면 상단에서 결과 영상을 미리 볼 수 있습니다.</li>
        </ul>
      </div>
    </Panel>
  );
};

export default VideoPreviewPanel;