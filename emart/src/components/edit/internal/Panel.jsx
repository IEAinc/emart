/**
 * @file Panel.jsx
 * @brief 공통 패널 컴포넌트
 * @param {string} title - 패널 헤더에 표시될 제목
 * @param {string} [className] - editor-panel에 추가할 클래스
 * @param {string} [bodyClassName] - panel-body에 추가할 클래스 (스타일용)
 * @param {React.ReactNode} children - panel-body 내부에 렌더링될 내용
 */

const Panel = ({ title, children, className = '', bodyClassName = '' }) => {
  const panelClassName = `editor-panel ${className}`;
  const panelBodyClassName = `panel-body ${bodyClassName}`;

  return (
    <div className={panelClassName}>
      {/* 헤더 */}
      <div className="panel-header">
        <div className="panel-title">{title}</div>
      </div>

      {/* 바디 */}
      <div className={panelBodyClassName}>
        {children}
      </div>
    </div>
  );
};

export default Panel;