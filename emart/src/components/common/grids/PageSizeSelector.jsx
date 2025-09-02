import Select from '../forms/Select'

const PageSizeSelector = ({ pageSize, onPageSizeChange, width }) => {
  const options = [
    {value:10,label:10},
    {value:20,label:20},
    {value:30,label:30},
    {value:40,label:40},
    {value:50,label:50},
  ]; // 선택 가능한 페이지 크기 옵션 배열
  // 현재 선택된 옵션 객체 찾기
  const currentOption = options.find(option => option.value === pageSize);


  return (
    <div className="pagination-select-wrapper">
      {/* Select 컴포넌트 사용 */}
      <Select
        value={currentOption} // 현재 선택된 옵션 객체
        onChange={(selectedOption) => onPageSizeChange(selectedOption.value)} // 선택된 값의 value만 전달
        options={options} // 옵션 배열
        width={width} // 스타일 조정
      />
      <span className="text-black text-[14px] font-normal ml-[8px] min-w-[80px]">건 씩 보기</span>
    </div>
  );
};

export default PageSizeSelector;