import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Breadcrumb from '../components/Breadcrumb'

export default function Layout({ menuData }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 루트 경로('/')에 있을 때만 iGenManagement로 리다이렉트
    if (location.pathname === '/') {
      navigate('/home');
    }
  }, [location.pathname, navigate]);
  const hideBreadcrumb = location.pathname === '/home';
  console.log(hideBreadcrumb);

  return (
    <>
      {/* 헤더 */}
      <Header/>
      {/* 사이드바 */}
      <Sidebar menuData={menuData}/>
      {/* 콘텐츠 */}
      <div className="contents-wrap">
        {/* 브레드크럼 추가 */}
        {/*{!hideBreadcrumb &&
          <div>
            <Breadcrumb />
          </div>
        }*/}
        <div className="content-box">
          {/* 하위 콘텐츠 */}
          <Outlet/>
        </div>
      </div>
    </>
  )
}