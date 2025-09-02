import { useLocation } from "react-router-dom";

const Breadcrumb = ({subText='서버에 업로드한 모델 정보를 조회합니다.'}) => {
  const location = useLocation(); // 현재 경로 가져오기
  const pathnames = location.pathname.split("/").filter((x) => x); // 경로를 배열로 분리 (빈 값 제거)
  console.log(pathnames)


  // 경로명과 한글 매핑
  const routeNames = {
    // 사용자 화면
    home: '홈',
    generateContents: '콘텐츠 생성',
    editContents: '콘텐츠 편집',
    myProjects: '나의 프로젝트',
    // 어드민 화면
    aiImageManagement:'생성형 이미지 모델 조회'
  };

  // 마지막 경로 가져오기
  let lastPathname = ''
  if(pathnames.length === 1) {
    lastPathname = `${routeNames[pathnames[pathnames.length - 1]]}`; // 경로 배열의 마지막 값
  } else if(pathnames.length === 3) {
    console.log('여기')
    lastPathname = `${routeNames[pathnames[pathnames.length - 2]]}`; // 경로 배열의 마지막에서 두번재 값
    console.log(lastPathname)
  }
  return (
    <nav className="breadcrumb-wrapper">
      {lastPathname && ( // 마지막 경로가 있는 경우에만 표시
        <ul className="breadcrumb-list">
          <li>
            {routeNames[lastPathname] || lastPathname}
          </li>
        </ul>
      )}
      <span>{subText}</span>
    </nav>
  );
};

export default Breadcrumb;