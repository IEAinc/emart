import React from 'react';
// 이미지 모음 (예시)
import img1 from '../../../assets/images/slides/image1.jpg';
import swiperImage1 from '../../../assets/images/slides/image2.png'
// 스와이퍼
import BasicSwiper from '../../../components/common/BasicSwiper.jsx';
const imageSlides = [
  {src:swiperImage1,alt:'이마트 예시 이미지1'},
]
const projects = [
  {id:'project1',src:img1,alt:'이마트 예시 이미지1'},
  {id:'project2',src:img1,alt:'이마트 예시 이미지1'},
  {id:'project3',src:img1,alt:'이마트 예시 이미지1'},
  {id:'project4',src:img1,alt:'이마트 예시 이미지1'},
  {id:'project5',src:img1,alt:'이마트 예시 이미지1'},
  {id:'project6',src:img1,alt:'이마트 예시 이미지1'},
  {id:'project7',src:img1,alt:'이마트 예시 이미지1'},
  {id:'project8',src:img1,alt:'이마트 예시 이미지1'},
];
export default function Home() {
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
        <ul className={`grid-box con-5 ${projects.length > 5 ? 'row-2' : ''}`}>
          {projects.map((project) => {
            return (
              <li key={project.id}>
                <div className="project-img-box">
                  <img src={project.src} alt={project.alt} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>

    </div>
  );
}

