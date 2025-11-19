/**
 * @file TimelineRuler.jsx
 * @brief 타임라인 시간 눈금자 (Canvas)
 */
import { useRef, useEffect, useMemo } from 'react';

function formatDuration(s) {
  if (!s && s !== 0) return '--:--';
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`; // MM:SS
}

// 눈금 간격
function chooseStep(total) {
  if (total <= 30) return 5; // 30초 이하 5초 간격
  if (total <= 60) return 10; // 1분 이하: 10초 간격 
  if (total <= 180) return 30; // 3분 이하: 30초 간격
  if (total <= 600) return 60; // 10분 이하: 1분 간격
  return 120;
}

// 눈금 배열 생성
function buildTicks(total, step) {
  if (!total || !Number.isFinite(total) || total <= 0) return [];
  const ticks = [];

  for (let t = 0; t < total + (step / 2); t += step) {
    ticks.push(Math.round(t));
  }

  const lastTickInArray = ticks[ticks.length - 1];
  if (Math.round(total) > lastTickInArray + (step / 4)) {
    ticks.push(Math.round(total));
  } else if (Math.round(total) !== lastTickInArray) {
    ticks[ticks.length - 1] = Math.round(total);
  }

  return ticks;
}

// 눈금 그리기 설정
const TICK_CONFIG = {
  majorTickHeight: 32,
  minorTickHeight: 12,
  textColor: '#727272',
  tickColor: '#727272',
  font: '10px "Pretendard"',
};

// 캔버스
function drawRuler(canvas, totalDuration, majorTicks, majorStep) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height); // 캔버스 초기화

  const tickStartY = 2;      // 캔버스 상단 (y=5)에서 시작
  const textY = 20;      // 캔버스 하단 (y=20)에 그림

  const pixelsPerSecond = totalDuration > 0 ? width / totalDuration : 0;

  ctx.fillStyle = TICK_CONFIG.textColor;
  ctx.strokeStyle = TICK_CONFIG.tickColor;
  ctx.font = TICK_CONFIG.font;
  ctx.textBaseline = 'top'; // 텍스트를 y=20 지점 아래

  // 9개 작은 눈금
  const minorStep = majorStep / 10;

  // 작은 눈금 그리기
  for (let sec = 0; sec <= totalDuration + (minorStep / 9); sec += minorStep) {
    const roundedSec = Math.round(sec);
    if (majorTicks.includes(roundedSec) && roundedSec !== Math.round(totalDuration)) {
      continue;
    }
    const x = sec * pixelsPerSecond;
    if (x < 0 || x > width) continue;

    ctx.beginPath();
    ctx.moveTo(x, tickStartY);
    ctx.lineTo(x, tickStartY + TICK_CONFIG.minorTickHeight);
    ctx.stroke();
  }

  // 주요 눈금 그리기
  const lastTick = majorTicks[majorTicks.length - 1];
  majorTicks.forEach(sec => {
    const x = sec * pixelsPerSecond;

    if (x < 0 || x > width) return;

    ctx.beginPath();
    ctx.moveTo(x, tickStartY);
    ctx.lineTo(x, tickStartY + TICK_CONFIG.majorTickHeight);
    ctx.stroke();

    // 시간 텍스트 정렬 로직
    if (sec === lastTick || x > width - ctx.measureText(formatDuration(sec)).width - 5) {
      ctx.textAlign = 'right';
      ctx.fillText(formatDuration(sec), x - 3, textY);
    } else {
      ctx.textAlign = 'left';
      ctx.fillText(formatDuration(sec), x + 3, textY);
    }
  });
}

const TimelineRuler = ({ totalDuration }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const majorStep = useMemo(() => chooseStep(totalDuration), [totalDuration]);
  const majorTicks = useMemo(() => buildTicks(totalDuration, majorStep), [totalDuration, majorStep]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    canvas.width = containerWidth;
    canvas.height = 30;

    drawRuler(canvas, totalDuration, majorTicks, majorStep, formatDuration);

  }, [totalDuration, majorTicks, majorStep]);

  return (
    <div ref={containerRef} className="timeline-ruler-canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TimelineRuler;