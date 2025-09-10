import {useState, useEffect, useContext} from 'react';
import { Link, useLocation} from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext.jsx';
// 사용한 컴포넌트
import Button from  '../components/common/forms/Button.jsx'

const Sidebar = ({menuData = []}) => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';
  // 아코디언 메뉴의 상태 관리
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation(); // 현재 경로 가져오기
  const [openSideBar, setOpenSidebar] = useState(true);
  const handleOpenSidebar = () => {
    setOpenSidebar(prev => !prev);
  }

  // 탭 있는 메뉴
  const tabbedPages = ['/modelManagement/aiImageManagement', '/modelManagement/aiVideoManagement'];

  // 현재 활성화된 메뉴의 인덱스를 찾아 설정
  useEffect(() => {
    const activeMenuIndex = menuData.findIndex((menu) => {
      // 상위 메뉴의 path가 현재 경로를 포함하는 경우
      // console.log(location.pathname,'경로확인')
      if (location.pathname.startsWith(menu.path)) {
        return true;
      }
      // 하위 메뉴가 있고, 하위 메뉴의 path가 현재 경로와 일치하는 경우
      if (
        menu.subMenu &&
        menu.subMenu.some((subMenu) => location.pathname.startsWith(subMenu.path))
      ) {
        return true;
      }
      return false;
    });
    // 활성화된 메뉴를 찾아 openMenu로 설정 (없다면 null)
    setOpenMenu(activeMenuIndex !== -1 ? activeMenuIndex : null);
  }, [location.pathname]); // location.pathname이 변경될 때마다 실행


  // 메뉴 열림/닫힘 상태 토글 함수
  const toggleMenu = (menuIndex) => {
    setOpenMenu((prevMenu) => (prevMenu === menuIndex ? null : menuIndex));
  };

  return (
    <div className={`sidebar-whole-wrap ${openSideBar ? 'open' : ''}`}>
      <div className={`sidebar`}>
        {/* 동적 메뉴 렌더링 */}
        {
          isAdmin &&
          <div className="sidebar-list-title">통합 모니터링</div>
        }
        <div className="sidebar-wrap">
          {menuData.map((menu, index) => {
            const isMenuActive = location.pathname.startsWith(menu.path); // 상위 메뉴 활성화 여부
            const isOpened = openMenu === index; // 현재 메뉴가 열려 있는 상태인지 확인

            return (
              <div className="sidebar-list" key={index}>
                {/* Link 또는 Button을 사용하여 경로 이동 처리 */}
                <Link
                  to={
                    menu.disabled || menu.subMenu ? "#" : menu.path
                  } // disabled이거나 하위 메뉴가 있으면 링크 없음
                  className={`first-depth ${
                    menu.subMenu
                      ? "" // 하위 메뉴가 있는 경우 active 붙이지 않음
                      : menu.disabled
                        ? "disabled" // disabled일 때 스타일용 클래스
                        : (isMenuActive ? "active" : "")
                  }`}
                  onClick={(event) => {
                    if (menu.subMenu || menu.disabled) {
                      event.preventDefault(); // 하위 메뉴 또는 disabled일 경우 클릭 막음
                      if (menu.subMenu) toggleMenu(index); // 아코디언만 처리
                    }
                  }}
                >
                  <div className="s-tit">{menu.title}</div>
                  {menu.subMenu && (
                    <span className={`arrow-btn ${isOpened ? "open" : ""}`}>
                      {isOpened ? <span className="sr-only">열림</span> : <span className="sr-only">닫힘</span>}
                    </span>
                  )}
                </Link>

                {/* 하위 메뉴 */}
                {menu.subMenu && (
                  <ul className={`depth ${isOpened ? "opened" : ""}`}>
                    {menu.subMenu.map((subMenu, subIndex) => {
                      // subMenu.path에서 마지막 segment 제거 (== base path)
                      const subMenuBase =
                        "/" +
                        subMenu.path
                          .split("/")
                          .slice(0, -1) // 마지막 segment 제거
                          .join("/");

                      // 탭 메뉴 매칭 확인
                      const matchedTp = tabbedPages.find(tp =>
                        location.pathname.startsWith(tp)
                      );

                      let isActive = false;

                      if (matchedTp) {
                        // location.pathname의 base path
                        const currentBase =
                          "/" +
                          location.pathname
                            .split("/")
                            .slice(0, matchedTp.split("/").length)
                            .join("/");

                        // base끼리 비교
                        isActive = currentBase === subMenuBase;
                      } else {
                        // 일반 메뉴는 path 완전 일치
                        isActive = location.pathname === subMenu.path;
                      }

                      return (
                        <li key={subIndex}>
                          {subMenu.disabled ? (
                            <>{subMenu.title}</>
                          ) : (
                            <Link to={subMenu.path} className={isActive ? "active" : ""}>
                              {subMenu.title}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}


              </div>
            );
          })}
        </div>
        {/*<Button
          onClick={handleOpenSidebar}
          className="sidebar-close-btn"
        >
          <span className="sr-only">닫기</span>
        </Button>*/}
      </div>
      <Button
        onClick={handleOpenSidebar}
        className={`sidebar-open-btn ${openSideBar ? 'open' : ''}`}
      >

      </Button>
    </div>
  );

}
export default Sidebar