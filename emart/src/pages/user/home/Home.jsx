import { useState } from 'react';
// 이미지 모음 (예시)
import img1 from '../../../assets/images/slides/image1.jpg';
import swiperImage1 from '../../../assets/images/slides/image2.png'
// 스와이퍼
import BasicSwiper from '../../../components/common/BasicSwiper.jsx';

export default function Home() {
  const [activeTab, setActiveTab] = useState('tab1');

  const imageSlides = [
    { src: swiperImage1, alt: '이마트 예시 이미지1' },
  ];

  const projectsImg = [
    { id: 'project1', text: '마케팅 이미지1' },
    { id: 'project2', text: '마케팅 이미지2' },
    { id: 'project1', text: '마케팅 이미지3' },
    { id: 'project2', text: '마케팅 이미지4' },
    { id: 'project1', text: '마케팅 이미지5' },
    { id: 'project2', text: '마케팅 이미지6' },
    { id: 'project1', text: '마케팅 이미지7' },
    { id: 'project2', text: '마케팅 이미지8' },
    { id: 'project1', text: '마케팅 이미지9' },
    { id: 'project2', text: '마케팅 이미지10' },
  ];

  const projectsText = [
    { id: 'project1', text: '마케팅 문구1' },
    { id: 'project2', text: '마케팅 문구2' },
    { id: 'project1', text: '마케팅 문구3' },
    { id: 'project2', text: '마케팅 문구4' },
    { id: 'project1', text: '마케팅 문구5' },
    { id: 'project2', text: '마케팅 문구6' },
    { id: 'project1', text: '마케팅 문구7' },
    { id: 'project2', text: '마케팅 문구8' },
    { id: 'project1', text: '마케팅 문구9' },
    { id: 'project2', text: '마케팅 문구10' },
  ];

  const projectsVideo = [
    { id: 'project1', text: '마케팅 동영상1' },
    { id: 'project2', text: '마케팅 동영상2' },
    { id: 'project1', text: '마케팅 동영상3' },
    { id: 'project2', text: '마케팅 동영상4' },
    { id: 'project1', text: '마케팅 동영상5' },
    { id: 'project2', text: '마케팅 동영상6' },
    { id: 'project1', text: '마케팅 동영상7' },
    { id: 'project2', text: '마케팅 동영상8' },
    { id: 'project1', text: '마케팅 동영상9' },
    { id: 'project2', text: '마케팅 동영상10' },
  ];

  const tabs = [
    { id: 'tab1', label: '전체' },
    { id: 'tab2', label: '마케팅 문구' },
    { id: 'tab3', label: '마케팅 이미지' },
    { id: 'tab4', label: '마케팅 동영상' },
  ];

  // 현재 보여줄 프로젝트 배열 선택
  const getProjectsForTab = () => {
    switch (activeTab) {
      case 'tab2': return projectsText;
      case 'tab3': return projectsImg;
      case 'tab4': return projectsVideo;
      default: return [...projectsText, ...projectsImg, ...projectsVideo]; // 전체
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const projects = getProjectsForTab();

  return (
    <div>
      <div className="in-wrap">
        <BasicSwiper
          spaceBetween={0}
          slidesPerView={1}
          slides={imageSlides}
        />
      </div>

      {/* 최근 작업 목록 */}
      <div className="in-wrap">
        <div className="title-wrap">
          <h2>최근 작업 목록</h2>
        </div>

        {/* 탭 네비게이션 */}
        <div className="tab-navigation ver2">
          <nav className="">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={activeTab === tab.id ? 'active' : ''}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* 프로젝트 리스트 */}
        <ul className={`grid-box con-5 ${projects.length > 5 ? 'row-2' : ''}`}>
          {projects.map((project) => (
            <li key={project.id}>
              <div className="project-img-box">
                <p>{project.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
