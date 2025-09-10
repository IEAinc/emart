import Button from "../../common/forms/Button.jsx";
import Loading from "../../Loading.jsx";

const TextList = ({allTexts=[],isGenerate=false,onDownload}) => {
  return (
    <div className="generator-text-list-wrap">
      {allTexts.length > 0 && (
        <>
          <div className="list-title-wrap">
            <p className="list-tit type02">AI 마케팅 문구 생성기</p>
            <Button
              className={'normal'}/* ico-reset */
              onClick={onDownload}
            >
              다운로드
            </Button>
          </div>
          <div className="generator-text-list">
            <ul>
              {allTexts.map((item, index) => (
                <li key={index} style={{ whiteSpace: 'pre-wrap' }}>
                  {item.text.split(/(\*\*.*?\*\*)/).map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <span key={i} style={{ fontWeight: 700 }}>
                          {part.slice(2, -2)}
                        </span>
                      );
                    }
                    return part;
                  })}
                </li>

              ))}
            </ul>
          </div>
        </>
      )}
      {allTexts.length === 0 && (
        !isGenerate ? (
          <div className="empty-page">
            <div className="empty-desc">
              <span className="upload-img alone"></span>
              <p>IGEN에 오신 것을 환영합니다.</p>
              <span>마케팅 문구 생성을 시작하세요.</span>
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
export default TextList;