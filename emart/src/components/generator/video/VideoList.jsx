import Button from '../../common/forms/Button.jsx'
import Loading from "../../Loading.jsx";
const VideoList = ({allVideos=[], isGenerate=false, onDownload}) => {
  return (
    <div className="generator-image-list-wrap">
      {allVideos.length > 0 && (
        <>
          <div className="list-title-wrap">
            <p className="list-tit type02">AI 마케팅 동영상 생성기</p>
            <Button
              className={'normal'}/* ico-reset */
              onClick={onDownload}
            >
              다운로드
            </Button>
          </div>
          <div
            className={`generator-image-list ${
              allVideos.length === 1 ? 'single-image' : ''
            }`}
          >
            <ul>
              {allVideos.map((item, index) => (
                <li key={index}>
                  <video
                    src={item.src}          // 비디오 URL
                    controls                // 재생/일시정지 등 컨트롤 표시
                    width="300"             // 필요시 크기 조정
                    style={{ borderRadius: '8px' }}
                  >
                    {item.alt && <track kind="captions" label={item.alt} />}
                    브라우저가 video 태그를 지원하지 않습니다.
                  </video>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {allVideos.length === 0 && (
        !isGenerate ? (
          <div className="empty-page">
            <div className="empty-desc">
              <span className="upload-img alone"></span>
              <p>IGEN에 오신 것을 환영합니다.</p>
              <span>마케팅 동영상 생성을 시작하세요.</span>
            </div>
          </div>
        ) : (
          <Loading />
        )
      )}
      {isGenerate && (
        <Loading />
      )}
    </div>
  );
}
export default VideoList;