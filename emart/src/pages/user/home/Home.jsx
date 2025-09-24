import {useEffect, useState} from 'react';
// 이미지 모음 (예시)
import img1 from '../../../assets/images/slides/image1.jpg';
import swiperImage1 from '../../../assets/images/slides/image2.png'
// 스와이퍼
import BasicSwiper from '../../../components/common/BasicSwiper.jsx';
import Pagination from '../../../components/common/pagination/Pagination.jsx';
import {api, errorHandler} from "../../../util/axios.jsx";

export default function Home() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 한 페이지에 보여줄 프로젝트 수
  const imageSlides = [
    { src: swiperImage1, alt: '이마트 예시 이미지1' },
  ];

  const [projectsImg,setProjectsImg] =useState([
    { id: 'project1', text: '마케팅 이미지1' },
    { id: 'project2', text: '마케팅 이미지2' },
    { id: 'project3', text: '마케팅 이미지3' },
    { id: 'project4', text: '마케팅 이미지4' },
    { id: 'project5', text: '마케팅 이미지5' },
    { id: 'project6', text: '마케팅 이미지6' },
    { id: 'project7', text: '마케팅 이미지7' },
    { id: 'project8', text: '마케팅 이미지8' },
    { id: 'project9', text: '마케팅 이미지9' },
    { id: 'project10', text: '마케팅 이미지10' },
  ]);

  const [projectsText,setProjectsText] = useState([
    { id: 'project1', text: '마케팅 문구1' },
    { id: 'project2', text: '마케팅 문구2' },
    { id: 'project3', text: '마케팅 문구3' },
    { id: 'project4', text: '마케팅 문구4' },
    { id: 'project5', text: '마케팅 문구5' },
    { id: 'project6', text: '마케팅 문구6' },
    { id: 'project7', text: '마케팅 문구7' },
    { id: 'project8', text: '마케팅 문구8' },
    { id: 'project9', text: '마케팅 문구9' },
    { id: 'project10', text: '마케팅 문구10' },
  ]);

  const [projectsVideo,setProjectsVideo] =useState( [
    { id: 'project1', text: '마케팅 동영상1' },
    { id: 'project2', text: '마케팅 동영상2' },
    { id: 'project3', text: '마케팅 동영상3' },
    { id: 'project4', text: '마케팅 동영상4' },
    { id: 'project5', text: '마케팅 동영상5' },
    { id: 'project6', text: '마케팅 동영상6' },
    { id: 'project7', text: '마케팅 동영상7' },
    { id: 'project8', text: '마케팅 동영상8' },
    { id: 'project9', text: '마케팅 동영상9' },
    { id: 'project10', text: '마케팅 동영상10' },
  ]);


  const tabs = [
    { id: 'tab1', label: '전체' },
    { id: 'tab2', label: '마케팅 문구' },
    { id: 'tab3', label: '마케팅 이미지' },
    { id: 'tab4', label: '마케팅 동영상' },
  ];

  // 현재 보여줄 프로젝트 배열 선택
  const getProjectsForTab = (activeTab) => {
    switch (activeTab) {
      case 'tab2': return projectsText;
      case 'tab3': return projectsImg;
      case 'tab4': return projectsVideo;
      default: return [...projectsText, ...projectsImg, ...projectsVideo]; // 전체
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setProjects(getProjectsForTab(tabId))
  };
  const initData = async ()=>{
      try {
          let data={
              count:10,
              type:"문구"
          }
          const text = api.post("/myproject/myproject/data", JSON.stringify(data), {headers: {},});
          data.type="이미지"
          const image = api.post("/myproject/myproject/data", JSON.stringify(data), {headers: {},});
          data.type="영상"
          const video = api.post("/myproject/myproject/data", JSON.stringify(data), {headers: {},});;
          Promise.all([text, image, video])
              .then(responses => {
                  console.log('모든 API 요청 완료!');

                  // axios는 자동으로 JSON 파싱해주므로 바로 data 사용 가능
                  const [text, image, video] = responses.map(response => response.data);

                  let text_data=text.data.map((e,idx)=>{
                      return { id: 'text'+idx, text: e.output }
                  })
                  let image_data=image.data.map((e,idx)=>{
                      return { id: 'image'+idx, text: e.output }
                  })
                  let video_data=video.data.map((e,idx)=>{
                      return { id: 'video'+idx, text: e.output }
                  })
                  setProjectsText(text_data)
                  setProjectsImg(image_data)
                  setProjectsVideo(video_data)
              })
              .catch(error => {
                  console.error('요청 실패:', error);
              });

      } catch (error) {
          console.error('사용자 목록 조회 실패:', errorHandler.handleError(error));
          return false;
      }
  }


  useEffect(() => {
        initData()
    }, []);
  const [projects,setProjects] = useState(getProjectsForTab());
  useEffect(() => {
    //   보여주는 데이터 임시저장소 와 페이지가 바뀌면  보여주는걸 결정하는 변수를 다시 업데이트하도록 설정
    let data=projects.length > pageSize? projects.slice((currentPage - 1) * pageSize, currentPage * pageSize): projects;
    setPaginatedProjects(data)

  }, [projects,currentPage]);
  useEffect(() => {
      // 데이터 변경이 되면 보여줄 데이터를 임시로 저장하는 공간을 덥데이트
      setProjects(getProjectsForTab(activeTab))
  }, [projectsText,projectsImg,projectsVideo]);

  // 페이지네이션 적용
  const [paginatedProjects,setPaginatedProjects] = useState(projects.length > pageSize
    ? projects.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : projects);

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
        <ul  className={`grid-box con-5 ${paginatedProjects.length > 5 ? 'row-2' : ''}`}>
          {paginatedProjects.map((project) =>

            <li key={project.id} >
              <div className="project-img-box">
                <p>{project.text}</p>
              </div>
            </li>
          )}
        </ul>
        {/* 페이지네이션 */}
        {projects.length > pageSize && (
          <Pagination
            currentPage={currentPage}
            totalItems={projects.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            type="generator"
          />
        )}
      </div>
    </div>
  );
}
