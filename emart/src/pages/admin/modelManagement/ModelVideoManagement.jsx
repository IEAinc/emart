import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AiVideoGenerationManagement from './videoTabs/AiVideoGenerationManagement.jsx';
import AiVideoGenerationLearning from './videoTabs/AiVideoGenerationLearning.jsx';

const ModelImageManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL 끝부분으로 탭 결정
  const getTabFromPath = () => {
    if (location.pathname.includes('learning')) return 'ai-video-generation-learning';
    return 'ai-video-generation'; // 기본값 view
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath());

  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  const tabs = [
    {
      id: 'ai-video-generation',
      label: '생성형 동영상 모델 조회',
      component: <AiVideoGenerationManagement />,
      path: 'aiVideoManagement/view'
    },
    {
      id: 'ai-video-generation-learning',
      label: '생성형 동영상 모델 학습',
      component: <AiVideoGenerationLearning />,
      path: 'aiVideoManagement/learning'
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    navigate(`/modelManagement/${tab.path}`);
  };

  return (
    <div className="model-management-page">
      {/* 탭 네비게이션 */}
      <div className="tab-navigation">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {/* 탭 콘텐츠 */}
      <div className="tab-content">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default ModelImageManagement;
