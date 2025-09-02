import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AiImageGenerationManagement from './tabs/AiImageGenerationManagement.jsx';
import AiImageGenerationLearning from './tabs/AiImageGenerationLearning.jsx';

const ModelImageManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL 끝부분으로 탭 결정
  const getTabFromPath = () => {
    if (location.pathname.includes('learning')) return 'ai-image-generation-learning';
    return 'ai-image-generation'; // 기본값 view
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath());

  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  const tabs = [
    {
      id: 'ai-image-generation',
      label: '생성형 이미지 모델 조회',
      component: <AiImageGenerationManagement />,
      path: 'aiImageManagement/view'
    },
    {
      id: 'ai-image-generation-learning',
      label: '생성형 이미지 모델 학습',
      component: <AiImageGenerationLearning />,
      path: 'aiImageManagement/learning'
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
      <div className="tab-content mt-6">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default ModelImageManagement;
