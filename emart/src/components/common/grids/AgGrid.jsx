import React, {useState, useRef, useEffect} from 'react';
// 사용하는 컴포넌트 모음
import Pagination from '../pagination/Pagination.jsx'
import PageSizeSelector from "./PageSizeSelector.jsx";
import Button from "../forms/Button.jsx";
// Aggrid
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);// Register all community features
provideGlobalGridOptions({ theme: "legacy"});// Mark all grids as using legacy themes
// 엑셀 다운로드
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AgGrid = ({rowHeight,autoHeight,handleRowGridClick, ...props}) => {
  console.log(props)
  const gridRef = useRef(null);
  const [gridApi, setGridApi] = useState(null);

  const defaultColDef = {
    flex: props.cellFlex ? 1 : false,
    sortable: !!props.sortable,
    filter: !!props.filter,
    resizable: !!props.resizable,
  }
  /* 체크박스 유무 */
  const processedColumns = React.useMemo(() => {
    if (!props.isCheckboxMode) return props.columnDefs;

    // 첫 번째 컬럼에만 체크박스 추가 예시
    return props.columnDefs.map((col, idx) => {
      if (idx === 0) return { ...col, checkboxSelection: true };
      return col;
    });
  }, [props.columnDefs, props.isCheckboxMode]);

  /* pagination 관련 설정 */
  const [pageSize, setPageSize] = useState(10); // 페이지당 데이터 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 (index 1 기반)
  const [displayData, setDisplayData] = useState([]); // 현재 페이지에 표시할 데이터
  const usePaginationSelector = props.usePaginationSelector ?? true;

  // 상위 데이터의 총 개수
  const totalItems = props.rowData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // 데이터를 슬라이싱하고 페이지 상태 조정
  useEffect(() => {
    const calculatedTotalPages = Math.ceil(props.rowData.length / pageSize);

    if (currentPage > calculatedTotalPages && totalItems > 0) {
      if (currentPage !== calculatedTotalPages) { // 현재 페이지를 한 번만 업데이트
        setCurrentPage(calculatedTotalPages);
      }
    } else {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setDisplayData(props.rowData.slice(startIndex, endIndex));
    }
  }, [props.rowData, pageSize, currentPage, totalItems]);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // 현재 페이지를 유효 범위 내로 업데이트
    }
  };
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize); // 페이지 크기 업데이트
    setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로 이동
  };
  // 선택된 row 수정하기
  const handleEditSelectedRows=()=>{
    props.onEditClick(gridApi)
  }

  /* 선택된 row 삭제하기 */
  const handleDeleteSelectedRows = () => {
    if (!gridApi) {
      console.warn("Grid가 초기화되지 않았습니다.");
      return;
    }

    const selectedRows = gridApi.getSelectedRows();
    // if (!selectedRows || selectedRows.length === 0) {
    //   alert("삭제할 행을 선택해주세요.");
    //   return;
    // }

    // 고유 ID를 기준으로 데이터 필터링
    const updatedData = props.rowData.filter(
      (row) => !selectedRows.some((selected) => selected.id === row.id) // ID 기준으로 매칭
    );


    if (props.onDataUpdate) {
      props.onDataUpdate(updatedData,gridApi); // 부모로 데이터 전달
    } else {
      console.error("onDataUpdate prop이 전달되지 않았습니다.");
    }
  };

  /* 엑셀 내보내기 */
  const exportToExcel = (rowData, columnData) => {
    if (!rowData || rowData.length === 0) {
      alert('엑셀로 내보낼 데이터가 없습니다.');
      return;
    }

    // 1. 엑셀 헤더 (headerName) 추출
    const headers = columnData.filter(col=>col.headerName!=='상세보기').map(col =>col.headerName);

    // 2. 각 row에서 field 값 추출해 headerName 기준으로 정리
    const exportData = rowData.map((row, rowIndex) => {
      const newRow = {};
      let minusIndex=0;
      for (let colIndex = 0; colIndex < columnData.length; colIndex++) {
        const col = columnData[colIndex];
        let value;
        if(col.headerName==='상세보기'){
          minusIndex++;
          console.log(minusIndex)
          continue;
        }
        // valueGetter가 있는 경우 계산해서 넣기
        if (typeof col.valueGetter === 'function') {
          value = col.valueGetter({
            data: row,
            node: { rowIndex },
            context: {
              currentPage: 1, // 필요시 실제 페이지 정보로 수정
              pageSize: rowData.length, // 필요시 실제 pageSize로 수정
            }
          });
        } else {
          value = row[col.field];
        }
     
        newRow[col.headerName] = value;
      };

      return newRow;
    });

    // 3. 워크시트 생성
    const worksheet = XLSX.utils.json_to_sheet(exportData, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 4. 저장
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(blob, 'export.xlsx');
  };
  return (
    <div className="grid-wrap">
      {
        props.indicator ?
          <div className="grid-indicator">
            <div className="total-count">
              {props.indicator.gridCount ? <p>총 결과 건수 {props.indicator.gridCount} 건</p> : null}
            </div>
            <div className="indicator-wrap">
              {
                props.indicator.excel ?
                  <Button
                    className="btn normal h-sm w-sm"
                    onClick={() => exportToExcel(props.rowData,props.columnDefs)}
                  >
                    다운로드
                  </Button>
                  :
                  null
              }
              {
                props.indicator.register ?
                  <Button
                    className="btn normal h-sm w-sm"
                    onClick={props.onRegisterClick}
                  >
                    등록
                  </Button>
                  :
                  null
              }
              {
                props.indicator.edit ?
                  <Button
                    className="btn normal h-sm w-sm"
                    onClick={handleEditSelectedRows}
                  >
                    수정
                  </Button>
                  :
                  null
              }
              {
                props.indicator.delete ?
                  <Button
                    className="btn normal h-sm w-sm bg-black"
                    onClick={handleDeleteSelectedRows}
                  >
                    삭제
                  </Button>
                  :
                  null
              }
            </div>
          </div>
          :
          null
      }
      <div className="ag-theme-alpine" style={{ height: props.height}}>
        <AgGridReact
          ref={gridRef}
          rowData={displayData}
          columnDefs={props.columnDefs}
          headerHeight={36}
          defaultColDef={defaultColDef}
          suppressMovableColumns={true} // 셀 이동 비활성화
          overlayNoRowsTemplate={`<span style="font-size:16px;">표시할 데이터가 없습니다.</span>`}
          rowHeight={rowHeight ? rowHeight : 42}
          domLayout={autoHeight ? 'autoHeight': ''}
          context={{
            currentPage: currentPage, // 현재 페이지
            pageSize: pageSize,       // 한 페이지당 데이터 크기
          }}
          rowSelection={{
            mode: props.isCheckboxMode ? 'multiRow' : 'single',
            enableSelectionWithoutKeys: true,
          }}
          onCellClicked={(event) => {
            console.log('대',event.colDef.checkboxSelection);
            if (event.colDef.checkboxSelection === undefined) { // 혹시 legacy 남아있다면
              handleRowGridClick(event.data)
            } else {
              alert('체크박스')
            }
          }}
          onGridReady={(params) => {
            if (!params.api || !params.columnApi) return;

            gridRef.current = params.api;
            setGridApi(params.api);

            if (props.isCheckboxMode) {
              const checkboxColumn = params.columnApi.getAllColumns().find(col => col.getColDef()?.checkboxSelection);
              if (checkboxColumn) {
                params.columnApi.setColumnWidth(checkboxColumn.getId(), 50);
                params.columnApi.setColumnPinned(checkboxColumn.getId(), 'left');
              }
            }

            // 나머지 컬럼 자동 조정
            const allColumns = params.columnApi.getAllColumns();
            const autoSizeColumnIds = allColumns
              .filter(col => !col.getColDef()?.checkboxSelection)
              .map(col => col.getId());

            params.columnApi.autoSizeColumns(autoSizeColumnIds);
          }}

          onFirstDataRendered={(params) => {
            if (!params.columnApi) return; // 안전 체크

            const allColumns = params.columnApi.getAllColumns();
            const autoSizeColumnIds = allColumns
              .filter(col => !col.getColDef()?.checkboxSelection)
              .map(col => col.getId());

            params.columnApi.autoSizeColumns(autoSizeColumnIds);
          }}

          onGridSizeChanged={(params) => {
            setTimeout(function() {
              params.api.sizeColumnsToFit(); // 컨테이너 크기 변경 시 컬럼 크기 재조정
            },0);
          }}
        />
      </div>
      {/* 사용자 정의 Pagination 컴포넌트 */}
      {
        totalItems > 0 && (
          <div className="pagination-whole-wrap">
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              type={'list'}
            />
            {usePaginationSelector &&
              <PageSizeSelector
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                width="60px"
              />
            }
          </div>
        )

      }

    </div>
  );
}

export default AgGrid;