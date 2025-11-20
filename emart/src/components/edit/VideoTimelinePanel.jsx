/**
 * @file VideoTimelinePanel.jsx
 * @brief [영상 편집 페이지 섹션] 타임라인 패널 (하단)
 */
import { useMemo } from 'react';
import { useSortable, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import Panel from './internal/Panel.jsx'; // 영상 편집 공통 패널
import VideoClipCard from './internal/VideoClipCard.jsx'; // 영상 클립 카드
// import TimelineRuler from './internal/TimelineRuler.jsx'; // 타임라인 눈금선

function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return '--:--';
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const remainder = Math.round(safe % 60);

  return `${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`; // mm:ss 형식 (ex-00:00)
}
const SortableVideoClipItem = ({ clip, start, duration, onRemove }) => {
  const {
    attributes, listeners, setNodeRef, transform, transition, isDragging,
  } = useSortable({ id: clip.id });

  return (
    <VideoClipCard
      clip={clip}
      start={start}
      duration={duration}
      onRemove={onRemove}
      // dnd-kit props
      attributes={attributes}
      listeners={listeners}
      setNodeRef={setNodeRef}
      transform={transform}
      transition={transition}
      isDragging={isDragging}
    />
  );
};

const VideoTimelinePanel = ({ clips, onRemoveClip }) => {
  const { timelineClips, totalDuration } = useMemo(() => { // clips가 바뀔 때 start/totalDuration 재계산
    let cursor = 0;
    const mapped = clips.map((clip) => {
      const start = cursor;
      const duration = clip.duration || 0;
      cursor += duration;
      return { ...clip, start, duration };
    });
    return { timelineClips: mapped, totalDuration: Math.round(cursor) };
  }, [clips]);

  const ids = useMemo(() => timelineClips.map((c) => c.id), [timelineClips]); // dnd-kit이 사용할 ID 배열
  const trackClassName = timelineClips.length > 0 ? 'timeline-box has-clips' : 'timeline-box';

  return (
    <Panel
      title="시퀀스"
      className="video-timeline-panel"
      bodyClassName="timeline-body-wrapper"
    >
      {/* 눈금자 */}
      {/* {totalDuration > 0 && (
        <TimelineRuler
          totalDuration={totalDuration}
        />
      )} */}
      {timelineClips.length > 0 && (
        <div className="timeline-summary">
          <span className="label">총 길이</span>
          <span className="value">{formatDuration(totalDuration)}</span>
        </div>
      )}
      <div className={trackClassName}>


        {timelineClips.length === 0 ? (
          <div className="placeholder">
            클립을 업로드하면 시간 순서에 즉시 표시됩니다.
          </div>
        ) : (
          <SortableContext
            items={ids}
            strategy={horizontalListSortingStrategy}
          >
            {timelineClips.map((clip) => (
              <SortableVideoClipItem
                key={clip.id}
                clip={clip}
                start={clip.start}
                duration={clip.duration}
                totalDuration={totalDuration}
                onRemove={onRemoveClip}
              />
            ))}
          </SortableContext>
        )}
      </div>
    </Panel>
  );
};

export default VideoTimelinePanel;