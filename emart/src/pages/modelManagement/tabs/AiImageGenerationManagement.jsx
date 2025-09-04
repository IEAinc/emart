import React, {useEffect, useState} from "react";
/* 컴포넌트 */
import AgGrid from './../../../components/common/grids/AgGrid.jsx';
import Button from './../../../components/common/forms/Button.jsx';
import Select from './../../../components/common/forms/Select.jsx';
import CustomDatepicker from "./../../../components/common/forms/CustomDatepicker.jsx";
/* 아이콘 */
import Magnify from '../../../assets/images/icon/ico_search.svg?react';

const AiImageGenerationManagement = () => {
  /* 추후 컴포넌트화 예정 */
  /* ------------------------------------------------------------------------------------------------------ */
  /* 구분 */
  const options = [
    { label: '전체', value: 'option1' },
    { label: '전체 2', value: 'option2' },
    { label: '전체 3', value: 'option3' }
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleChange = (option) => {
    setSelectedOption(option);
  }
  /* 모델명 */
  const modelOptions = [
    { label: '전체', value: 'option1' },
    { label: '전체 2', value: 'option2' },
    { label: '전체 3', value: 'option3' }
  ];
  const [selectedModelOption, setSelectedModelOption] = useState(modelOptions[0]);
  const handleModelChange = (option) => {
    setSelectedModelOption(option);
  }
  /* 버전 */
  const versionOptions = [
    { label: '전체', value: 'option1' },
    { label: '전체 2', value: 'option2' },
    { label: '전체 3', value: 'option3' }
  ];
  const [selectedVersionOption, setSelectedVersionOption] = useState(versionOptions[0]);
  const handleVersionChange = (option) => {
    setSelectedVersionOption(option);
  }
  /* 학습일 */
  const [dateRange, setDateRange] = useState([null,null]);

  /* 상태 */
  const statusOptions = [
    { label: '전체', value: 'option1' },
    { label: '전체 2', value: 'option2' },
    { label: '전체 3', value: 'option3' }
  ];
  const [selectedStatusOption, setSelectedStatusOption] = useState(statusOptions[0]);
  const handleStatusChange = (option) => {
    setSelectedStatusOption(option);
  }
  /* ----------------------------------------------------------------------------------------------- */
  /* AgGrid */
  const [gridData, setGridData] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);
  const [gridCount, setGridCount] = useState(0);
  // 등록 버튼 클릭 시 실행될 함수
  const handleRegisterClick = () => {
    // navigate(`/scenarioManagement/mainScenarioManagement/detail/register`);
  };
  // 상세보기
  const handleRowClick = (id) => {
    const basePath = location.pathname; // 현재 경로 가져오기
    // navigate(`${basePath}/detail/${String(id)}`); // 동적 경로 생성
  }
  // 데이터 삭제
  const handleDataUpdate = (updatedRows) => {
    setGridData(updatedRows);
  };

  useEffect(() => {
    /* 그리드 데이터 */
    let grid_data = [
      { id: 1, learningDate: "2025-09-01 10:00", category: "실사 스타일", modelName: "Emart24_RealPhoto_v1", version: "v1.0", description: "점포 외관 실사 이미지 생성", dataset: "StoreExteriorSet", imageCount: 5200, resolution: "1024x1024", status: "완료" },
      { id: 2, learningDate: "2025-09-01 10:00", category: "유화 스타일", modelName: "Emart24_OilPainting_v1", version: "v1.0", description: "유화풍 행사 이미지 생성", dataset: "PromotionOilSet", imageCount: 3100, resolution: "512*512", status: "완료" },
      { id: 3, learningDate: "2025-09-01 10:00", category: "만화 스타일", modelName: "Emart24_Comic_v2", version: "v2.0", description: "캐릭터 기반 만화 스타일 학습", dataset: "CharacterComicSet", imageCount: 6500, resolution: "512*512", status: "완료" },
      { id: 4, learningDate: "2025-09-01 10:00", category: "일러스트 스타일", modelName: "Emart24_Illustration_v1", version: "v1.0", description: "SNS용 일러스트 이미지 학습", dataset: "SNSIllustrationSet", imageCount: 4800, resolution: "1024*1024", status: "완료" },
      { id: 5, learningDate: "2025-09-01 10:00", category: "제품 사진 스타일", modelName: "Emart24_Product_v1", version: "v1.0", description: "신제품 홍보용 이미지 생성", dataset: "ProductPhotoSet", imageCount: 7800, resolution: "1024*1024", status: "진행중" },
      { id: 6, learningDate: "2025-09-01 10:00", category: "배경화면 스타일", modelName: "Emart24_Wallpaper_v1", version: "v1.0", description: "매장 내부 배경화면 이미지 생성", dataset: "StoreInteriorSet", imageCount: 2400, resolution: "2048x2048", status: "완료" },
      { id: 7, learningDate: "2025-09-01 10:00", category: "SNS 컨텐츠 스타일", modelName: "Emart24_SNS_v1", version: "v1.0", description: "SNS 홍보용 감각적 이미지 생성", dataset: "SNSContentSet", imageCount: 3200, resolution: "512*512", status: "실패" },
      { id: 8, learningDate: "2025-09-01 10:00", category: "유화 스타일", modelName: "Emart24_OilPainting_v1", version: "v1.0", description: "더 세부적인 유화 질감 강화", dataset: "PromoOilSet_v2", imageCount: 4200, resolution: "1024*1024", status: "완료" },
      { id: 9, learningDate: "2025-09-01 10:00", category: "실사 스타일", modelName: "Emart24_RealPhoto_v2", version: "v1.0", description: "점포 외관 실사 이미지 생성", dataset: "StoreExteriorSet_v2", imageCount: 5600, resolution: "512*2048x2048", status: "완료" },
      { id: 10, learningDate: "2025-09-01 10:00", category: "만화 스타일", modelName: "Emart24_Comic_v2", version: "v2.0", description: "캐릭터 기반 만화 스타일 학습", dataset: "CharacterComicSet", imageCount: 6500, resolution: "512*512", status: "완료" },
      { id: 11, learningDate: "2025-09-01 10:00", category: "만화 스타일", modelName: "Emart24_Comic_v2", version: "v2.0", description: "캐릭터 기반 만화 스타일 학습", dataset: "CharacterComicSet", imageCount: 6500, resolution: "512*512", status: "완료" },
    ]

    /* 그리드 헤더 설정 */
    let grid_columns = [
      { headerName: "학습일시", flex: 1, field: "learningDate", cellClass: 'text-center' },
      { headerName: "구분(스타일/용도)", flex: 1, field: "category", cellClass: 'text-center' },
      { headerName: "모델명", flex: 1, field: "modelName", cellClass: 'text-center' },
      { headerName: "버전", flex: 1, field: "version", cellClass: 'text-center' },
      { headerName: "설명", flex: 1, field: "description", cellClass: 'text-center' },
      { headerName: "학습 데이터셋", flex: 1, field: "dataset", cellClass: 'text-center' },
      { headerName: "이미지 수", flex: 1, field: "imageCount", cellClass: 'text-center' },
      { headerName: "해상도", flex: 1, field: "resolution", cellClass: 'text-center' },
      { headerName: "상태", flex: 1, field: "status", cellClass: 'text-center' }
    ];
    setGridData(grid_data);
    setGridColumns(grid_columns);
    setGridCount(grid_data.length);
  },[])
  return (
    <div className="tabs">
      <div className="tabs-title-wrap">
        <h3>생성형 이미지 모델 조회</h3>
      </div>
      <div className="search-wrapper">
        <div className="search-wrap">
          <Select
            label="구분"
            value={selectedOption}
            onChange={handleChange}
            options={options}
            openDirection="bottom"
            colVer={false}
          />
          <Select
            label="모델명"
            value={selectedModelOption}
            onChange={handleModelChange}
            options={modelOptions}
            openDirection="bottom"
            colVer={false}
          />
          <Select
            label="버전"
            value={selectedVersionOption}
            onChange={handleVersionChange}
            options={versionOptions}
            openDirection="bottom"
            colVer={false}
          />
          <CustomDatepicker
            label="학습일"
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          <Select
            label="상태"
            value={selectedStatusOption}
            onChange={handleStatusChange}
            options={statusOptions}
            openDirection="bottom"
            colVer={false}
          />
        </div>
        <Button className={'normal2 icon'}>
          <Magnify/>
          검색
        </Button>
      </div>
      {/* aggrid */}
      <AgGrid
        rowDeselection={true}
        rowData={gridData}
        columnDefs={gridColumns}
        height={463}
        isCheckboxMode={false}
        onDataUpdate={handleDataUpdate} // 삭제 후 데이터 갱신
        onRegisterClick={handleRegisterClick}
        sortable={true}
        usePaginationSelector={false}
      />
    </div>
  );
}
export default AiImageGenerationManagement;