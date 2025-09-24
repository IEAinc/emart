import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
// 엑셀 관련
async function urlToBase64(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('이미지 로드 실패:', error);
        return null;
    }
}

// 이미지 확장자 추출 함수
function getImageExtension(url) {
    const extension = url.split('.').pop().toLowerCase().split('?')[0];
    return ['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(extension) ? extension : 'png';
}

// 엑셀 파일 생성 함수
async function createExcelWithImages(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('데이터');

    // 헤더 설정
    const headers = Object.keys(data[0] || {});
    worksheet.addRow(headers);

    // 헤더 스타일
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
    };

    let currentRow = 2;

    for (const item of data) {
        const row = [];
        const imagePromises = [];

        // 각 컬럼 처리
        for (let colIndex = 0; colIndex < headers.length; colIndex++) {
            const header = headers[colIndex];
            const value = item[header];

            // URL이 이미지인지 확인
            if (typeof value === 'string' &&
                (value.startsWith('http://') || value.startsWith('https://')) &&
                /\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i.test(value)) {

                row.push(''); // 셀은 비워둠

                // 이미지 처리를 위한 Promise 추가
                imagePromises.push(
                    urlToBase64(value).then(base64 => ({
                        base64,
                        url: value,
                        row: currentRow,
                        col: colIndex + 1
                    }))
                );
            } else {
                row.push(value);
            }
        }

        // 행 추가
        worksheet.addRow(row);

        // 이미지 처리
        if (imagePromises.length > 0) {
            const images = await Promise.all(imagePromises);

            for (const img of images) {
                if (img.base64) {
                    try {
                        const extension = getImageExtension(img.url);
                        const imageId = workbook.addImage({
                            base64: img.base64,
                            extension: extension === 'jpg' ? 'jpeg' : extension
                        });

                        // 이미지를 셀에 삽입
                        worksheet.addImage(imageId, {
                            tl: { col: img.col - 1, row: img.row - 1 },
                            ext: { width: 100, height: 100 }
                        });

                        // 행 높이 조정
                        worksheet.getRow(img.row).height = 75;

                        // 컬럼 너비 조정
                        worksheet.getColumn(img.col).width = 15;
                    } catch (error) {
                        console.error('이미지 삽입 실패:', error);
                        // 실패한 경우 URL 텍스트로 대체
                        worksheet.getCell(img.row, img.col).value = img.url;
                    }
                }
            }
        }

        currentRow++;
    }

    // 컬럼 너비 자동 조정
    worksheet.columns.forEach(column => {
        if (!column.width) {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, cell => {
                const columnLength = cell.value ? cell.value.toString().length : 0;
                if (columnLength > maxLength) {
                    maxLength = columnLength;
                }
            });
            column.width = Math.min(maxLength + 2, 50);
        }
    });

    return workbook;
}

// 엑셀 파일 다운로드 함수
export async function downloadExcel(data, filename = 'data_with_images.xlsx') {
    try {

        console.log('엑셀 파일 생성 중...');
        const workbook = await createExcelWithImages(data);

        console.log('파일 저장 중...');
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        saveAs(blob, filename);
        console.log('파일 다운로드 완료!');
    } catch (error) {
        console.error('엑셀 파일 생성 실패:', error);
    }
}


