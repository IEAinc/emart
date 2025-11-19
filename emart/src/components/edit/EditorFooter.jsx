const EditorFooter = ({ onMerge, onDownload, isDownloadable, isMergeDisabled }) => {
  return (
    <div className="video-editor-footer">
      <button
        className="video-editor-btn"
        onClick={onMerge}
        disabled={isMergeDisabled}
      >
        병합
      </button>
      <button
        className="video-editor-btn"
        onClick={onDownload}
        disabled={!isDownloadable}
      >
        다운로드
      </button>
    </div>
  );
};

export default EditorFooter;