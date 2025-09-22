import React from 'react';
import { Routes, Route, Navigate,BrowserRouter } from 'react-router-dom';
import BodyClassController from "./components/BodyClassController.jsx";

// 페이지 모음
// 공통
import Login from './pages/Login.jsx';
// 어드민
import IGenManagement from './pages/admin/iGenManagement/IGenManagement.jsx';
import ModelImageManagement from './pages/admin/modelManagement/ModelImageManagement.jsx';
import ModelVideoManagement from './pages/admin//modelManagement/ModelVideoManagement.jsx';
import ModelTextManagement from './pages/admin/modelManagement/ModelTextManagement.jsx';
// 사용자
import Home from './pages/user/home/Home.jsx';
// 콘텐츠 생성 (3)

import GenerateContentsText from './pages/user/generateContents/GenerateContentsText.jsx'; // 마케팅 텍스트 생성
import GenerateContentsImage from './pages/user/generateContents/GenerateContentsImage.jsx'; // 마케팅 이미지 생성
import GenerateContentsVideo from './pages/user/generateContents/GenerateContentsVideo.jsx'; // 마케팅 동영상 생성
// 콘텐츠 편집 (2)
import EditContentsImage from './pages/user/editContents/EditContentsImage.jsx'; // 이미지 편집기
// 내 프로젝트
import ProjectText from './pages/user/myProjects/ProjectText.jsx'
import ProjectImage from './pages/user/myProjects/ProjectImage.jsx'
import ProjectVideo from './pages/user/myProjects/ProjectVideo.jsx'


// 레이아웃 컴포넌트
import LayoutSelector from './layout/LayoutSelector';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const adminMenuData = [
    {
      title: 'IGen 운영관리',
      path: '/iGenManagement',
      icon: { default: '', active: ''},
      disabled: true
    },
    {
      title: '모델 관리',
      path: '/modelManagement',
      icon: { default: '', active: '' },
      subMenu: [
        { title: '생성형 문구 모델 관리', path: '/modelManagement/aiTextManagement/view'},
        { title: '생성형 이미지 모델 관리', path: '/modelManagement/aiImageManagement/view' },
        { title: '생성형 동영상 모델 관리', path: '/modelManagement/aiVideoManagement/view'},
      ],
    },
  ];

  const userMenuData = [
    {
      title: '홈',
      path: '/home',
      icon: { default: '', active: '' },
    },
    {
      title: '콘텐츠 생성',
      path: '/generateContents',
      icon: { default: '', active: '' },
      subMenu: [
        { title: '마케팅 문구 생성', path: '/generateContents/generateContentsText' },
        { title: '마케팅 이미지 생성', path: '/generateContents/generateContentsImage' },
        { title: '마케팅 동영상(숏폼) 생성', path: '/generateContents/generateContentsVideo' },
      ],
    },
    {
      title: '콘텐츠 편집',
      path: '/editContents',
      icon: { default: '', active: '' },
      subMenu: [
        { title: '이미지 편집기', path: '/editContents/editContentsImage' ,disabled: true },
        { title: '영상 편집기', path: '/editContents/2',disabled: true },
      ],
    },
    {
      title: '내 프로젝트',
      path: '/myProjects',
      icon: { default: '', active: '' },
      subMenu: [
        { title: '마케팅 문구 생성물', path: '/myProjects/textProjects'},
        { title: '마케팅 이미지 생성물', path: '/myProjects/imageProjects'},
        { title: '마케팅 동영상 생성물', path: '/myProjects/videoProjects'},
      ],
    },
  ];

  return (
    <AuthProvider>
      {/* Body 클래스 제어 */}
      <BodyClassController />

      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />

        {/* 레이아웃 적용 페이지 */}
        <Route path="/" element={<LayoutSelector adminMenuData={adminMenuData} userMenuData={userMenuData} />}>
          {/* 관리자 페이지 */}
          <Route path="iGenManagement" element={<IGenManagement />} />

          {/* --------------- 모델 관리 페이지 --------------- */}
          <Route path="modelManagement">
            {/* 기본 접근 시 view로 리다이렉트 */}
            <Route path="aiTextManagement" element={<Navigate to="view" replace />} />
            <Route path="aiTextManagement/view" element={<ModelTextManagement />} />
            <Route path="aiTextManagement/learning" element={<ModelTextManagement />} />

            {/* 이미지 모델 */}
            <Route path="aiImageManagement" element={<Navigate to="view" replace />} />
            <Route path="aiImageManagement/view" element={<ModelImageManagement />} />
            <Route path="aiImageManagement/learning" element={<ModelImageManagement />} />

            {/* 동영상 모델 */}
            <Route path="aiVideoManagement" element={<Navigate to="view" replace />} />
            <Route path="aiVideoManagement/view" element={<ModelVideoManagement/>} />
            <Route path="aiVideoManagement/learning" element={<ModelVideoManagement/>} />
          </Route>

          {/* --------------- 사용자 페이지  ---------------*/}
          <Route path="home" element={<Home />} />
          {/* 콘텐츠 생성 */}
          <Route path="generateContents">
            <Route path="generateContentsText" element={<GenerateContentsText />} />{/* 콘텐츠 생성 > 마케팅 텍스트 생성 */}
            <Route path="generateContentsImage" element={<GenerateContentsImage />} />{/* 콘텐츠 생성 > 마케팅 이미지 생성 */}
            <Route path="generateContentsVideo" element={<GenerateContentsVideo />} />{/* 콘텐츠 생성 > 마케팅 동영상 생성 */}
          </Route>
          {/* 콘텐츠 편집 */}
          <Route path="editContents">
            <Route path="editContentsImage" element={<EditContentsImage />} />{/* 콘텐츠 편집 > 이미지 편집기 */}
          </Route>
          {/* 내 프로젝트 */}
          <Route path="myProjects">
            <Route path="textProjects" element={<ProjectText />} />{/* 내 프로젝트 > 텍스트 편집기 */}
            <Route path="imageProjects" element={<ProjectImage />} />{/* 내 프로젝트 > 이미지 편집기 */}
            <Route path="videoProjects" element={<ProjectVideo />} />{/* 내 프로젝트 > 동영상 편집기 */}
          </Route>
        </Route>
      </Routes>

    </AuthProvider>
  );
}

export default App;
