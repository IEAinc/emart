import React, { useState } from 'react'
/* 컴포넌트 */
import Button from './common/forms/Button.jsx'
/* 탭 컴포넌트 */



/* 탭별 */
/* 3. text */
const ImageGeneratorAiSetting = ({ lists, onItemClick  }) => {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = lists[activeTab].component;
  return (
    <div className="generator-setting-wrap">
      <div className="ai-setting-wrap">
        <p>AI 편집 도구</p>
        <div className="tab-wrap">
          {lists.map((list, idx) => {
            // active 상태에 따라 아이콘 컴포넌트 선택
            const Icon = activeTab === idx ? list.iconActive : list.icon

            return (
              <Button
                key={idx}
                className={`tab ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {/* img 대신 SVG 컴포넌트 렌더링 */}
                <Icon style={{ width: 24, height: 24 }} />
                <span>{list.title}</span>
              </Button>
            )
          })}
        </div>

      </div>

      <div className="ai-setting-content">
        <ActiveComponent
          title={lists[activeTab].title}
          items={lists[activeTab].items}
          onItemClick={onItemClick}  // 상위 이벤트 그대로 전달
        />
      </div>
    </div>
  )
}
export default ImageGeneratorAiSetting;
