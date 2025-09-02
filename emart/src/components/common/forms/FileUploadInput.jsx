import Button from './Button.jsx'
const FileUploadInput = () => {
  return (
    <div className="file-upload-wrapper">
      <span>이미지 업로드</span>
      <Button className={'rounded'}>
        파일선택
      </Button>
    </div>
  )
}
export default FileUploadInput;