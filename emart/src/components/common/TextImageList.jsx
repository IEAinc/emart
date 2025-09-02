import Button from './forms/Button.jsx'

const TextImageList = ({ title,tabType, eventTitle, items = [], onItemClick }) => {
  return (
    <div className="image-list-wrapper">
      <div className="image-list-title">
        <p>{title}</p>
        {items.length > 1 && <Button className="rounded">더보기</Button>}
      </div>
      <div className="image-list">
        <ul>
          {items.map((item, idx) => (
            <li
              key={`text-ai-setting-${item.id}`}
              className="item"
              onClick={() => onItemClick(tabType, eventTitle, item)} // 클릭 시 실행
            >
              <img src={item.src} alt={`image-${idx}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TextImageList;
