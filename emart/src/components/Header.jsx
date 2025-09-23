import {useContext, useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
/* 이미지 */
import Logo from './../assets/images/logo/logo.svg?react'
import User from './../assets/images/icon/ico_user.svg?react'
/* 컴포넌트 */
import Button from './common/forms/Button.jsx'
const Header = () => {
  const { user, logout } = useContext(AuthContext); // 로그아웃
  const navigate = useNavigate();
  // 어드민 / 사용자 구분
  const isAdmin = user?.role === 'admin';

  // 매뉴열기
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const clickMenu = () => {
    setMenuOpen(prev => !prev); // true ↔ false 토글
  };
  // 로그아웃
  const handleLogout = () => {
    logout();              // 사용자 상태 및 localStorage 초기화
    navigate('/login');         // 원하는 경로로 이동 (예: '/login' 또는 '/iGenManagement')
  };

  // 외부클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header>
      {/* admin / user 여부에 따라 css 달라짐 */}
      <div className={`inner-content ${isAdmin ? 'admin' : ''}`}>
        <div className="inner-left">
          <h1
            onClick={() => {
              if (isAdmin) {
                navigate('/iGenManagement')
              } else {
                navigate('/home')
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            <Logo/>
          </h1>
        </div>
        <div className="inner-right">
          <div className="menu-wrap" ref={menuRef}>
            <Button
              onClick={clickMenu}
            >
              <User/>
            </Button>
            {menuOpen
              &&
              <div className="menu-box">
                <ul>
                  <li>
                    <Button onClick={handleLogout}>로그아웃</Button>
                  </li>
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;