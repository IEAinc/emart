import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
// 엑셀 관련
async function urlToBase64(url) {
    let count=0
    while (count<5){
        count++
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

        }
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
        let link_info = {isHype:false};

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
            }else if(typeof value === 'string' &&
                (value.startsWith('http://') || value.startsWith('https://')) &&
                /\.(mp4)(\?.*)?$/i.test(value)){
                let data= {
                    text: '동영상 링크',
                    hyperlink: value,
                    tooltip: '동영상 링크로 이동'
                }
                link_info={col:colIndex+1,isHype:true}
                row.push(data);
            } else {
                row.push(value);
            }
        }

        // 행 추가
        let work_row=worksheet.addRow(row);
        if(link_info.isHype) {
            const linkCell = work_row.getCell(link_info.col);
            linkCell.font = {
                color: {argb: 'FF0000FF'},
                underline: true
            };
        }

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


        const workbook = await createExcelWithImages(data);

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        saveAs(blob, filename);

    } catch (error) {
        console.error('엑셀 파일 생성 실패:', error);
    }
}


export function saveTextFile(text, filename = 'document.txt') {
    // 숫자 이모지와 ** 사이에 공백 추가
    const cleanText = text.replaceAll("**", "        ");

    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(cleanText);
    const blob = new Blob([uint8Array], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
}




/**
 * 단일 이미지 다운로드
 * @param {string} imageUrl - 다운로드할 이미지 URL
 * @param {string} filename - 파일명 (선택사항, 자동 생성됨)
 */
export async function downloadSingleImage(imageUrl, filename) {
    try {
        const response = await fetch(imageUrl, {
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const blob = await response.blob();

        // 파일명이 없으면 자동 생성
        if (!filename) {
            filename = generateFilename(imageUrl, blob.type);
        }

        saveAs(blob, filename);

        return {
            success: true,
            filename: filename
        };

    } catch (error) {
        console.error('이미지 다운로드 실패:', error);
        throw error;
    }
}

/**
 * 여러 이미지를 ZIP 파일로 다운로드
 * @param {string[]} imageUrls - 다운로드할 이미지 URL 배열
 * @param {string} zipFileName - ZIP 파일명 (기본값: 'images.zip')
 */
export async function downloadImagesAsZip(imageUrls, zipFileName = 'images.zip') {
    try {
        const zip = new JSZip();

        // 모든 이미지를 병렬로 다운로드
        const downloadPromises = imageUrls.map(async (url, index) => {
            try {
                const response = await fetch(url, { mode: 'cors' });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const blob = await response.blob();
                const filename = generateFilename(url, blob.type, index);

                return { blob, filename, success: true };

            } catch (error) {
                console.error(`이미지 ${index + 1} 다운로드 실패:`, error);
                return { success: false, url };
            }
        });

        const results = await Promise.all(downloadPromises);

        // 성공한 이미지들만 ZIP에 추가
        let successCount = 0;
        results.forEach((result) => {
            if (result.success) {
                zip.file(result.filename, result.blob);
                successCount++;
            }
        });

        if (successCount === 0) {
            throw new Error('다운로드된 이미지가 없습니다.');
        }



        // ZIP 파일 생성 및 다운로드
        const zipBlob = await zip.generateAsync({
            type: "blob",
            compression: "DEFLATE",
            compressionOptions: { level: 6 }
        });

        saveAs(zipBlob, zipFileName);

        return {
            success: true,
            downloadedCount: successCount,
            totalCount: imageUrls.length
        };

    } catch (error) {
        console.error('ZIP 다운로드 실패:', error);
        throw error;
    }
}

/**
 * URL에서 파일명 생성
 */
function generateFilename(url, mimeType, index = 0) {
    try {
        // URL에서 파일명 추출
        const urlPath = new URL(url).pathname;
        const originalName = urlPath.split('/').pop();

        // 확장자 결정
        let extension = '';
        if (originalName && originalName.includes('.')) {
            extension = originalName.split('.').pop().toLowerCase();
        } else {
            // MIME 타입에서 확장자 결정
            const mimeToExt = {
                // 이미지
                'image/jpeg': 'jpg',
                'image/jpg': 'jpg',
                'image/png': 'png',
                'image/gif': 'gif',
                'image/webp': 'webp',
                'image/svg+xml': 'svg',
                // 영상
                'video/mp4': 'mp4',
                'video/webm': 'webm',
                'video/ogg': 'ogv',
                'video/avi': 'avi',
                'video/mov': 'mov',
                'video/wmv': 'wmv',
                'video/flv': 'flv'
            };
            extension = mimeToExt[mimeType] || 'jpg';
        }

        // 파일명 정리 (특수문자 제거)
        let cleanName = originalName ?
            originalName.replace(/[<>:"/\\|?*]/g, '_').split('.')[0] :
            `image_${index + 1}`;

        return `${cleanName}.${extension}`;

    } catch (error) {
        // URL 파싱 실패 시 기본 파일명
        const extension = mimeType?.includes('png') ? 'png' : 'jpg';
        return `image_${index + 1}.${extension}`;
    }
}
export async function downloadSingleVideo(videoUrl, filename) {
    try {
        const response = await fetch(videoUrl, {
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const blob = await response.blob();

        // 파일명이 없으면 자동 생성
        if (!filename) {
            filename = generateFilename(videoUrl, blob.type, 0, 'video');
        }

        saveAs(blob, filename);

        return {
            success: true,
            filename: filename,
            size: formatFileSize(blob.size)
        };

    } catch (error) {
        console.error('영상 다운로드 실패:', error);
        throw error;
    }
}
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

