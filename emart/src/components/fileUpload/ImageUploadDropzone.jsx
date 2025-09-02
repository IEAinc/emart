import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import Button from "../common/forms/Button.jsx";

const ImageUploadDropzone = ({
                               onFileSelected,
                               multiple = false,
                               accept = { 'image/*': ['.jpg', '.jpeg', '.png', '.svg'] }
                             }) => {

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const filesToSend = multiple ? acceptedFiles : acceptedFiles[0];
    if (onFileSelected) onFileSelected(filesToSend);

    // FileReader 예시
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => console.log('파일 내용 읽음', reader.result);
      reader.readAsArrayBuffer(file);
    });
  }, [onFileSelected, multiple]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    accept,
  });

  return (
    <div className="upload-ui-box" {...getRootProps()}>
      <span className="upload-img">이미지 업로드</span>
      <input {...getInputProps()} />
      <Button
        className={'normal bg-gray'}
      >
        파일선택
      </Button>
    </div>
  )
}
export default ImageUploadDropzone;