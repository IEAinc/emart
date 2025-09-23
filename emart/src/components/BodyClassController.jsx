import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function BodyClassController() {
  const location = useLocation();

  useEffect(() => {
    // /myProjects와 하위 경로에서는 auto 제거, 나머지는 붙임
    if (location.pathname.startsWith('/myProjects') || location.pathname.startsWith('/home')) {
      document.body.classList.remove('auto');
    } else {
      document.body.classList.add('auto');
    }
  }, [location.pathname]);

  return null; // 화면에 렌더링 없음
}

export default BodyClassController;
