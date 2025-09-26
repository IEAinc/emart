import { useState } from 'react'
import Pagination from './pagination/Pagination.jsx'
import Button from './forms/Button.jsx'
const ImageList = ({isGenerate = true}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // 전체 이미지 배열
  const allImages = Array.from({ length: 1}, (_, i) => `image${i + 1}`);
  const totalItems = allImages.length;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // 현재 페이지에 보여줄 4개의 이미지
  const startIndex = (currentPage - 1) * pageSize;
  const currentImages = allImages.slice(startIndex, startIndex + pageSize);

  return (
    <div className="generator-image-list-wrap">
      {isGenerate && (
        <>
          <div className="list-title-wrap">
            <p className="list-tit type02">생성된 이미지</p>
            <Button
              className={'normal'}/* ico-reset */
            >
              다운로드
            </Button>
          </div>
          <div
            className={`generator-image-list ${
              currentImages.length === 1 ? 'single-image' : ''
            }`}
          >
            <ul>
              {currentImages.map((src, index) => (
                <li key={index}>
                  <img src={src} alt={`이미지 ${startIndex + index + 1}`} />
                </li>
              ))}
            </ul>
          </div>
          {
            currentImages.length >= 4 && (
              <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                type="generator"
              />
            )
          }
        </>
      )}
      {/*{!isGenerate && (
        <>
          없엉
        </>
      )}*/}
    </div>
  );
}
export default ImageList;