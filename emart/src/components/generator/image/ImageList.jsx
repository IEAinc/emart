import Button from '../../common/forms/Button.jsx'
const ImageList = ({allImages=[], isGenerate=false, onDownload}) => {
  return (
    <div className="generator-image-list-wrap">
      {allImages.length > 0 && (
        <>
          <div className="list-title-wrap">
            <p className="list-tit type02">AI 마케팅 이미지 생성기</p>
            <Button
              className={'normal'}/* ico-reset */
              onClick={onDownload}
            >
              다운로드
            </Button>
          </div>
          <div
            className={`generator-image-list ${
              allImages.length === 1 ? 'single-image' : ''
            }`}
          >
            <ul>
              {allImages.map((item, index) => (
                <li key={index}>
                  <img src={item.src} alt={`이미지 ${item.alt}`} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {allImages.length === 0 && (
        <div className="empty-page">
          <div className="empty-desc">
            <span className="upload-img alone"></span>
            <p>IGEN에 오신 것을 환영합니다.</p>
            <span>마케팅 이미지 생성을 시작하세요.</span>
          </div>
        </div>
      )}
    </div>
  );
}
export default ImageList;