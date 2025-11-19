/**
 * @file VideoClipCard.jsx
 * @brief 타임라인 패널 > 영상 클립 카드
 */
import { CSS } from '@dnd-kit/utilities';

function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return '--:--';
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const remainder = Math.round(safe % 60);

  return `${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`; // mm:ss 형식 (ex-00:00)
}

export default function VideoClipCard({
  clip,
  duration,
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
  isDragging,
  onRemove,
}) {
  const style = { // 카드 스타일 적용
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.8 : 1,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: '78px',
    border: isDragging ? '2px solid var(--color-primary)' : 'none'
  };

  // 클립 제거
  const handleRemove = (event) => {
    event.stopPropagation();
    onRemove?.(clip.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`timeline-clip ${isDragging ? 'is-dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      {/* 썸네일 이미지 */}
      {clip.thumbnail ? (
        <img src={clip.thumbnail} alt="썸네일" className="clip-thumbnail" />
      ) : (
        <div className="clip-thumbnail-placeholder" />
      )}
      <div className="clip-content-wrapper">
        <div className="clip-header">
          <button
            type="button"
            onClick={handleRemove}
            className="clip-remove-btn-simple"
            aria-label="클립 제거"
          >
            ×
          </button>
        </div>
        <div className="clip-footer">
          {/* 영상 제목 */}
          <span className="clip-name" title={clip.name}>{clip.name}</span>
          {/* 영상 길이 */}
          <span className="clip-time">{formatDuration(duration)}</span>
        </div>
      </div>
    </div>
  );
}
////////////////////////////////////////////////////////////////////
// 개별 영상 시작~끝시간 (필요 시 사용)
// const startLabel = formatDuration(start);
// const endLabel = formatDuration(start + duration);