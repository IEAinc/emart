import React, {useEffect, useState} from "react";
import Select from "../../../components/common/forms/Select.jsx";
import CustomDatepicker from "../../../components/common/forms/CustomDatepicker.jsx";
import Button from "../../../components/common/forms/Button.jsx";
import Input from "../../../components/common/forms/Input.jsx";
import Magnify from "./../../../assets/images/icon/ico_search.svg?react";
import AgGrid from "../../../components/common/grids/AgGrid.jsx";

/* 임시 추가 이미지 */
import img1 from "./../../../assets/images/myprojects/g1.png";
import img2 from "./../../../assets/images/myprojects/g2.png";
import img3 from "./../../../assets/images/myprojects/g3.png";

/* 아이콘 */
import { FaEye } from 'react-icons/fa';
import { FaRegCopy } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';

const ProjectImage = () => {
  /* 추후 컴포넌트화 예정 */
  /* ------------------------------------------------------------------------------------------------------ */
  /* 기간 */
  const [dateRange, setDateRange] = useState([null,null]);

  /* 목적 */
  const options = [
    { label: '전체', value: 'option1' },
    { label: '전체 2', value: 'option2' },
    { label: '전체 3', value: 'option3' }
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleChange = (option) => {
    setSelectedOption(option);
  }
  /* 스타일 */
  const styleOptions = [
    { label: '전체', value: 'option1' },
    { label: '전체 2', value: 'option2' },
    { label: '전체 3', value: 'option3' }
  ];
  const [selectedStyleOption, setSelectedStyleOption] = useState(styleOptions[0]);
  const handleStyleChange = (option) => {
    setSelectedStyleOption(option);
  }
  /* 브랜드톤 */
  const brandtonsOptions = [
    { label: '전체', value: 'option1' },
    { label: '전체 2', value: 'option2' },
    { label: '전체 3', value: 'option3' }
  ];
  const [selectedBrandtonOption, setSelectedBrandtonOption] = useState(brandtonsOptions[0]);
  const handleBrandtonChange = (option) => {
    setSelectedBrandtonOption(option);
  }

  //  내용검색
  const [contents, setContents] = useState('');
  const handleContentsChange = (e) => {
    setContents(e.target.value);
  }

  /* 검색 */
  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = () => {
    console.log('기간',dateRange);
    console.log('목적',selectedOption);
    console.log('스타일',selectedStyleOption);
    console.log('브랜드톤',selectedBrandtonOption);
    console.log('내용검색',selectedBrandtonOption);
  };
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
      { id: 1, generateImgPreview: img1,createdDate: "2025-09-01 10:00", productImg: img2, modelName: "Emart24_RealPhoto_v1", userInput: "v1.0", style: "점포 외관 실사 이미지 생성", brandton: "StoreExteriorSet", imageCount: 5200, resolution: "1024x1024", status: "완료" },
      { id: 2, generateImgPreview: img1,createdDate: "2025-09-01 10:00", productImg: img2, modelName: "Emart24_OilPainting_v1", userInput: "v1.0", style: "유화풍 행사 이미지 생성", brandton: "PromotionOilSet", imageCount: 3100, resolution: "512*512", status: "완료" },
      { id: 3, generateImgPreview: img1,createdDate: "2025-09-01 10:00", productImg: img2, modelName: "Emart24_Comic_v2", userInput: "v2.0", style: "캐릭터 기반 만화 스타일 학습", brandton: "CharacterComicSet", imageCount: 6500, resolution: "512*512", status: "완료" },
      { id: 4, generateImgPreview: img1,createdDate: "2025-09-01 10:00", productImg: img2, modelName: "Emart24_Illustration_v1", userInput: "v1.0", style: "SNS용 일러스트 이미지 학습", brandton: "SNSIllustrationSet", imageCount: 4800, resolution: "1024*1024", status: "완료" },
      { id: 5, generateImgPreview: img1,createdDate: "2025-09-01 10:00", productImg: img2, modelName: "Emart24_Product_v1", userInput: "v1.0", style: "신제품 홍보용 이미지 생성", brandton: "ProductPhotoSet", imageCount: 7800, resolution: "1024*1024", status: "진행중" },
      { id: 6, generateImgPreview: img1,createdDate: "2025-09-01 10:00", productImg: img2, modelName: "Emart24_Wallpaper_v1", userInput: "v1.0", style: "매장 내부 배경화면 이미지 생성", brandton: "StoreInteriorSet", imageCount: 2400, resolution: "2048x2048", status: "완료" },
      { id: 7, generateImgPreview: img1,createdDate: "2025-09-01 10:00", productImg: img2, modelName: "Emart24_SNS_v1", userInput: "v1.0", style: "SNS 홍보용 감각적 이미지 생성", brandton: "SNSContentSet", imageCount: 3200, resolution: "512*512", status: "실패" },
      { id: 8, generateImgPreview: img1,createdDate: "2025-09-01 10:00", productImg: img2, modelName: "Emart24_OilPainting_v1", userInput: "v1.0", style: "더 세부적인 유화 질감 강화", brandton: "PromoOilSet_v2", imageCount: 4200, resolution: "1024*1024", status: "완료" },
      { id: 9, generateImgPreview: img1,createdDate: "2025-09-01 10:00", productImg: img2, modelName: "Emart24_RealPhoto_v2", userInput: "v1.0", style: "점포 외관 실사 이미지 생성", brandton: "StoreExteriorSet_v2", imageCount: 5600, resolution: "512*2048x2048", status: "완료" },
      { id: 10, generateImgPreview: img1,createdDate: "2025-09-01 10:00", productImg: img2, modelName: "Emart24_Comic_v2", userInput: "v2.0", style: "캐릭터 기반 만화 스타일 학습", brandton: "CharacterComicSet", imageCount: 6500, resolution: "512*512", status: "완료" },
      { id: 11, generateImgPreview: img1,createdDate: "2025-09-01 10:00", productImg: img2, modelName: "Emart24_Comic_v2", userInput: "v2.0", style: "캐릭터 기반 만화 스타일 학습", brandton: "CharacterComicSet", imageCount: 6500, resolution: "512*512", status: "완료" },
    ]

    /* 그리드 헤더 설정 */
    let grid_columns = [
      { headerName: "NO", field: "number",cellClass: 'text-center',width: 80 ,suppressSizeToFit: true,   valueGetter: (params) => {
          // 커스텀 pagination 값을 가져오기
          const currentPage = params.context.currentPage; // 현재 페이지 번호 (1-Based Index)
          const pageSize = params.context.pageSize; // 페이지당 데이터 수
          const rowIndex = params.node.rowIndex; // 페이지 내의 인덱스 값 (0-Based Index)

          // 페이지 기반의 번호 계산
          return (currentPage - 1) * pageSize + rowIndex + 1;
        },
      },
      { headerName: "생성된 이미지(미리보기)", flex: 1, field: "generateImgPreview", cellClass: 'text-center',minWidth: 200,
        cellRenderer: (params) => {
          return (
            <div className="grid-img-wrap">
              <img src={params.value} alt="" className="img-preview" />
            </div>
          );
        },
      },
      { headerName: "제품 이미지", flex: 1, field: "productImg", cellClass: 'text-center',minWidth: 200,
        cellRenderer: (params) => {
          return (
            <div className="grid-img-wrap">
              <img src={params.value} alt="" className="img-preview" />
            </div>
          );
        },
      },
      { headerName: "사용자 입력", flex: 1, field: "userInput",cellClass: '' },
      { headerName: "목적", flex: 1, field: "purpose", cellClass: 'text-center' },
      { headerName: "스타일", flex: 1, field: "style", cellClass: 'text-center'},
      { headerName: "브랜드톤", flex: 1, field: "brandton", cellClass: 'text-center' },
      { headerName: "생성일시", flex: 1, field: "createdDate", cellClass: 'text-center' },
      { headerName: "모델", flex: 1, field: "modelName", cellClass: 'text-center' },
      { headerName: "ETC", flex: 1, field: "imageCount", cellClass: 'text-center',minWidth: 200,
        cellRenderer: (params) => {
          return (
            <div className="btn-wrap">
              <Button title="눈" className="btn ico-square" onClick={() => {alert('1번')}}>
                <FaEye size={20} color="gray" />
              </Button>
              <Button title="복사"  className="btn ico-square" onClick={() => {alert('2번')}}>
                <FaRegCopy size={20} color="gray" />
              </Button>
              <Button title="다운로드"  className="btn ico-square" onClick={() => {alert('3번')}}>
                <FaDownload size={20} color="gray" />
              </Button>
              <Button title="삭제"  className="btn ico-square" onClick={() => {alert('4번')}}>
                <FaTrashAlt size={20} color="gray" />
              </Button>
            </div>
          );
        },
      },
    ];
    setGridData(grid_data);
    setGridColumns(grid_columns);
    setGridCount(grid_data.length);
  },[])
  return (
    <div className="page-wrap">
      <div className="tabs-title-wrap">
        <h3>마케팅 이미지 생성물</h3>
        <p>생성된 마케팅 이미지를 확인하고 관리하세요.</p>
      </div>
      <div className="box">
        <div className="search-wrapper">
          <div className="search-col">
            <div className="search-wrap">
              <CustomDatepicker
                label="기간"
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
              <Select
                label="목적"
                value={selectedOption}
                onChange={handleChange}
                options={options}
                openDirection="bottom"
                colVer={false}
              />
              <Select
                label="스타일"
                value={selectedStyleOption}
                onChange={handleStyleChange}
                options={styleOptions}
                openDirection="bottom"
                colVer={false}
              />
              <Select
                label="브랜드톤"
                value={selectedBrandtonOption}
                onChange={handleBrandtonChange}
                options={brandtonsOptions}
                openDirection="bottom"
                colVer={false}
              />
              <Input
                labelName="내용검색"
                value={contents}
                placeholder={'생성된 마케팅 문구 내용 검색'}
                className="row"
                onChange={handleContentsChange}
              />
            </div>
          </div>

          <Button className={'normal2 icon'} onclick={handleSearchChange}>
            <Magnify/>
            검색
          </Button>
        </div>
      </div>

      <div className="box">
        {/* aggrid */}
        <AgGrid
          rowDeselection={true}
          rowData={gridData}
          columnDefs={gridColumns}
          isCheckboxMode={false}
          onDataUpdate={handleDataUpdate} // 삭제 후 데이터 갱신
          onRegisterClick={handleRegisterClick}
          sortable={true}
          usePaginationSelector={false}
          rowHeight={100}
          autoHeight={true}
        />
      </div>

    </div>
  );
}
export default ProjectImage;