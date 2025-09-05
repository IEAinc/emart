import { useState } from 'react'
import Input from '../../common/forms/Input.jsx'
import Button from '../../common/forms/Button.jsx'
import {api, errorHandler} from "../../../util/axios.jsx";
const ImageGeneratorPrompt = ({ onAddText,setImgURl }) => {
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => setInputValue(e.target.value);

  // 파일 선택 시
  const handleFileChange =async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setImgURl(null)

    let form=new FormData();
    form.append("file",selectedFile)
    let response=null;
    try {
       response = await api.post("/IMAGE/image/makeUrl", form, {
        headers: {
          "Content-Type": "multipart/form-data", // 생략해도 됨
        },
      })
    } catch (error) {
     console.error('사용자 목록 조회 실패:', errorHandler.handleError(error));
      return false;
    }
    setImgURl(response.data.save_url);
    setFile(selectedFile);
    // 미리보기 URL 생성
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleClick = () => {
    if (!inputValue.trim() || !file) return;

    // 상위로 전달
    onAddText &&
    onAddText({
      text: inputValue,
      file,          // 실제 File 객체
      previewUrl,    // 미리보기용 URL
    });

    // 초기화
    //setInputValue('');
   // setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="generator-prompt-wrap">
      <div className="prompt-input-wrap">
        {/* 파일 업로드 */}
        <div className="file-upload-single">
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleFileChange}
            style={{ display: 'none' }} // 숨김
          />

          <label htmlFor="imageUpload" className="custom-file-upload">이미지 업로드</label>
          <div className="file-name">
            {file ? file.name : "마케팅 이미지에 활용될 상품 이미지를 업로드해주세요"}
          </div>
          {/* 업로드 된 이미지 preview인데 현재 사용X */}
          {/*{previewUrl && (
            <img
              src={previewUrl}
              alt="preview"
              style={{ width: 100, height: 100, objectFit: 'cover', marginTop: 10 }}
            />
          )}*/}
        </div>

        {/* 텍스트 입력 */}
        <Input
          placeholder="생성할 이미지에 대해 작성해주세요"
          value={inputValue}
          onChange={handleChange}
          required
        />
      </div>

      <Button className="prompt" onClick={handleClick}>
        <span>생성</span>
      </Button>
    </div>
  );
};

export default ImageGeneratorPrompt;