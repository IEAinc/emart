import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import { AuthContext } from '../contexts/AuthContext';

export default function LayoutSelector({ adminMenuData, userMenuData }) {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';

  const navigate = useNavigate();
  const location = useLocation();

  // 루트('/') 진입 시 역할에 따라 기본 페이지로 리다이렉트
  useEffect(() => {
    if (location.pathname === '/') {
      navigate(isAdmin ? '/iGenManagement' : '/home', { replace: true });
    }
  }, [location.pathname, isAdmin, navigate]);

  return isAdmin
    ? <AdminLayout menuData={adminMenuData} />
    : <UserLayout menuData={userMenuData} />;
}