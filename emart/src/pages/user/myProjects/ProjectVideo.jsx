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
import Modal from "../../../components/common/modal/Modal.jsx";
import BasicSwiper from "../../../components/common/BasicSwiper.jsx";

const ProjectVideo = () => {
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
  /* 팝업 */
  const [isModalOpen, setModalOpen] = useState(false); // 팝업
  const handleModalOpen = () => {
    // 모달 열 때 fieldData.categories 값으로 초기화
    setModalOpen(true);
  };
  /* 미리보기 버튼 preview */
  const [rowData, setRowData] = useState(null);
  const handleOpenPreview = (data) => {
    console.log('data',data);
    setModalOpen(true);
    setRowData(data);
  }

  /* 삭제하기 */
  const handleDeleteRow = (rowId) => {
    setGridData(prev => prev.filter(row => row.id !== rowId));
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
      {
        id: 1,
        generateVideoPreview: {
          imgList: [
            {
              id: 'video',
              img: img1,
              video: '/videos/video1.mp',
              alt: '',
              type: 'video',
            }
          ]
        },
        createdDate: "2025-09-15 10:00",
        productImg: {
          imgList: [
            {
              id: 'img2',
              img: img2,
              alt: ''
            },
            {
              id: 'img2',
              img: img2,
              alt: ''
            },
            {
              id: 'img2',
              img: img2,
              alt: ''
            }
          ]
        },
        modelName: "Emart24_RealPhoto_v1",
        userInput: "신선한 토마토 밭을 배경으로 한 따뜻한 석양 속에서 '탱탱젤리' 패키지가 돋보이게 표현해주세요. 토마토의 상큼함과 건강한 이미지를 강조하고, 자연스럽게 빛나는 패키지 질감으로 연출합니다.", style: "감성적", brandton: "친근함", imageCount: 5200, resolution: "1024x1024", status: "완료" },
    ]

    /* 그리드 헤더 설정 */
    let grid_columns = [
      { headerName: "NO", field: "number",cellClass: 'text-center',width: 50 ,suppressSizeToFit: true,cellStyle: {display:'flex',alignItems:'center'},
        valueGetter: (params) => {
          // 커스텀 pagination 값을 가져오기
          const currentPage = params.context.currentPage; // 현재 페이지 번호 (1-Based Index)
          const pageSize = params.context.pageSize; // 페이지당 데이터 수
          const rowIndex = params.node.rowIndex; // 페이지 내의 인덱스 값 (0-Based Index)

          // 페이지 기반의 번호 계산
          return (currentPage - 1) * pageSize + rowIndex + 1;
        }
      },
      { headerName: "생성된 동영상(미리보기)", flex: 1, field: "generateVideoPreview", cellClass: 'text-center',minWidth: 200,
        cellRenderer: (params) => {
          return (
            <div className="grid-img-wrap">
              <img src={params.value.imgList[0].img} alt="" className="img-preview" />
            </div>
          );
        },
      },
      { headerName: "제품 이미지", flex: 1, field: "productImg", cellClass: 'text-center',minWidth: 200,
        cellRenderer: (params) => {
          return (
            <div className="grid-img-wrap">
              <img src={params.value.imgList[0].img} alt="" className="img-preview" />
            </div>
          );
        },
      },
      { headerName: "사용자 입력", flex: 3, field: "userInput",cellClass: 'text-left',minWidth:224,cellStyle: {display:'flex',alignItems:'center'},
        cellRenderer: (params) => {
          return (
            <div className=" ellipsis-5">{params.value}</div>
          );
        }
      },
      { headerName: "스타일", flex: 1, field: "style",minWidth: 100, cellClass: 'text-center',cellStyle: {display:'flex',alignItems:'center'},
        cellRenderer: (params) => {
          return (
            <div className="ellipsis-2">{params.value}</div>
          );
        }
      },
      { headerName: "브랜드톤", flex: 1, field: "brandton",minWidth: 100, cellClass: 'text-center',cellStyle: {display:'flex',alignItems:'center'},
        cellRenderer: (params) => {
          return (
            <div className="ellipsis-2">{params.value}</div>
          );
        }
      },
      { headerName: "생성일시", flex: 1, field: "createdDate", minWidth: 150,cellClass: 'text-center',cellStyle: {display:'flex',alignItems:'center'},
        cellRenderer: (params) => {
          if (!params.value) return null;
          return (
            <div className="ellipsis-2">
              {params.value.split(" ").map((part, idx) => (
                <React.Fragment key={idx}>
                  {part}
                  <br />
                </React.Fragment>
              ))}
            </div>
          );
        }
      },
      { headerName: "모델", flex: 1, field: "modelName", cellClass: 'text-center',minWidth: 200,cellStyle: {display:'flex',alignItems:'center',},
        cellRenderer: (params) => {
          return (
            <div className="ellipsis-2">{params.value}</div>
          );
        }
      },
      { headerName: "ETC", flex: 1, field: "imageCount", cellClass: 'text-center',minWidth: 200,cellStyle: {display:'flex',alignItems:'center'},
        cellRenderer: (params) => {
          return (
            <div className="grid-btn-wrap">
              <Button title="눈" className="btn icon-square ico-eye" onClick={() => {handleOpenPreview(params.data)}}/>
              <Button title="다운로드"  className="btn icon-square ico-download" onClick={() => {alert('3번')}}/>
              <Button title="삭제"  className="btn icon-square ico-delete" onClick={() => {handleDeleteRow(params.data.id)}}/>
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
        <h3>마케팅 동영상 생성물</h3>
        <p>생성된 마케팅 동영상을 확인하고 관리하세요.</p>
      </div>
      <div className="box">
        <div className="search-wrapper col line mp">
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
            </div>
            <div className="search-wrap">
              <Input
                labelName="내용검색"
                value={contents}
                placeholder={'생성된 마케팅 문구 내용 검색'}
                className="row"
                onChange={handleContentsChange}
              />
            </div>
          </div>
          <div className="search-btn-wrap">
            <Button className={'btn icon normal w-sm ico-reset'} onclick={handleSearchChange}>
              초기화
            </Button>
            <Button className={'btn icon normal bg-black w-sm ico-search'} onclick={handleSearchChange}>
              검색
            </Button>
          </div>
        </div>
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
          rowHeight={136}
          autoHeight={true}
        />
      </div>
      {/* [모달] : 마케팅 동영상 상세 */}
      <Modal
        title="마케팅 동영상 상세"
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false)
          setRowData(null);
        }}
        /*footerButtons={
          <>
            <Button className={'normal'}>다운로드</Button>
            <Button className={'normal bright'}>공유</Button>
          </>
        }*/
      >
        <div className="pop-box">
          <div className="pop-contents-box">
            <div className="pop-tit">
              <p>생성된 동영상</p>
              <span>생성일시: {rowData?.createdDate.split(" ")[0]}</span>
            </div>
            <div className="contents-list no-scroll fixed-size">
              <BasicSwiper
                spaceBetween={0}
                slidesPerView={1}
                slides={rowData?.generateVideoPreview?.imgList.map((item) => ({
                  src: item.type === 'video' ? item.video : item.img,
                  alt: item.alt,
                  type: item.type || 'image'
                })) || []}
                pagination={true}
              />
            </div>
          </div>
          <div className="pop-contents-box">
            <div className="pop-tit">
              <p>사용자 입력</p>
            </div>
            <div className="contents-list scroll-sm">
              {rowData !== null && rowData.userInput ? <p>{rowData.userInput}</p> :""}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default ProjectVideo;