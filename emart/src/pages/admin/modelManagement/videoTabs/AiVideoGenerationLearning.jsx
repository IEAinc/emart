import React, {useState} from "react";
import Select from "../../../../components/common/forms/Select.jsx";
import Button from "../../../../components/common/forms/Button.jsx";
import Magnify from "../../../../assets/images/icon/ico_search.svg?react";
import Textarea from "../../../../components/common/forms/Textarea.jsx";
import Input from "../../../../components/common/forms/Input.jsx";
import Checkbox from "../../../../components/common/forms/Checkbox.jsx";
import Radio from "../../../../components/common/forms/Radio.jsx";

const AiVideoGenerationLearning = () => {
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

  /* 검색 */
  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = () => {
    console.log('구분',selectedOption);
    console.log('모델명',selectedModelOption);
    console.log('버전',selectedStatusOption);
  };
  /* ----------------------------------------------------------------------------------------------- */

  /* 설명 */
  const [message, setMessage] = useState("");
  const handleTextFieldChange = (e) => {
    setMessage(e.target.value);
  };

  /* 학습 데이터 파일 업로드 */
  const [file, setFile] = useState(null);
  // 파일 선택 시
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // 미리보기 URL 생성
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(selectedFile);
  };


  /* 데이터셋 명 */
  const [inputDatasetValue, setInputDatasetValue] = useState('');
  const handleDatasetChange = (e) => setInputDatasetValue(e.target.value);


  /* 데이터셋 URL */
  const [inputDatasetURLValue, setInputDatasetURLValue] = useState('');
  const handleDatasetURLChange = (e) => setInputDatasetURLValue(e.target.value);


  /* 라이선스/저작권 */
  const [inputLicenseValue, setInputLicenseValue] = useState('');
  const handleLicenseChange = (e) => setInputLicenseValue(e.target.value);

  /* 상업적 이용 가능 여부 */
  const [commercial, setCommercial] = useState(null); // 'user' 또는 'admin'

  /* 확인여부 */
  const [agreed, setAgreed] = useState(false);
  const handleAgreeChange = (e) => {
    setAgreed(e.target.checked);
  };

  /* 학습 */
  const [learning, setLearning] = useState(false);
  const handleLearning = () => {
    console.log('구분(스타일 /용도)',selectedOption)
    console.log('모델명',selectedModelOption)
    console.log('버전',selectedVersionOption)
    console.log('설명',message)
    console.log('학습 데이터 파일 업로드',file)
    console.log('데이터셋 명',inputDatasetValue)
    console.log('데이터 출처(URL)',inputDatasetURLValue)
    console.log('라이선스/저작권',inputLicenseValue)
    console.log('상업적 이용 가능 여부',commercial)
    console.log('확인 여부',agreed)
  }
  return (
    <div className="tabs">
      <div className="tabs-title-wrap">
        <h3>생성형 이미지 모델 학습</h3>
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
        </div>
        <Button className={'normal2 icon'} onClick={handleSearchChange}>
          <Magnify/>
          검색
        </Button>
      </div>
      {/* 학습 테이블 */}
      <div className="custom-table">
        <table>
          <colgroup>
            <col style={{width: '10%'}}/>
            <col style={{width: '90%'}}/>
          </colgroup>
          <tbody>
          {/* 구분 */}
          <tr>
            <th><div className="th-wrap">구분<br/>(스타일/용도)</div></th>
            <td>
              <div className="td-wrap">
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={options}
                  openDirection="bottom"
                  colVer={false}
                  className={"table-ver"}
                />
              </div>
            </td>
          </tr>
          {/* 모델명 */}
          <tr>
            <th><div className="th-wrap">모델명</div></th>
            <td>
              <div className="td-wrap">
                <Select
                  value={selectedModelOption}
                  onChange={handleModelChange}
                  options={modelOptions}
                  openDirection="bottom"
                  colVer={false}
                  className={"table-ver"}
                />
              </div>
            </td>
          </tr>
          {/* 버전 */}
          <tr>
            <th><div className="th-wrap">버전</div></th>
            <td>
              <div className="td-wrap">
                <Select
                  value={selectedVersionOption}
                  onChange={handleVersionChange}
                  options={versionOptions}
                  openDirection="bottom"
                  colVer={false}
                  className={"table-ver"}
                />
              </div>
            </td>
          </tr>
          {/* 설명 */}
          <tr>
            <th><div className="th-wrap">설명</div></th>
            <td>
              <div className="td-wrap">
                <Textarea
                  name="message"
                  placeholder="메시지를 입력하세요"
                  value={message}
                  onChange={handleTextFieldChange}
                  required
                />
              </div>
            </td>
          </tr>
          {/* 학습 데이터 파일 업로드 */}
          <tr>
            <th><div className="th-wrap">학습 데이터<br/>파일 업로드</div></th>
            <td>
              <div className="td-wrap">
                {/* 파일 업로드 */}
                <div className="file-upload-single table-ver">
                  <input
                    type="file"
                    accept="image/*"
                    id="imageUpload"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // 숨김
                  />

                  <label htmlFor="imageUpload" className="custom-file-upload">찾아보기(파일 업로드)</label>
                  <div className="file-name">
                    {file ? file.name : "파일 형식은 JPEG(JPG), PNG, SVG 형식"}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          {/* 데이터셋 명 */}
          <tr>
            <th><div className="th-wrap">데이터셋 명</div></th>
            <td>
              <div className="td-wrap">
                <Input
                  placeholder=""
                  value={inputDatasetValue}
                  onChange={handleDatasetChange}
                  className={"table-ver"}
                  required
                />
              </div>
            </td>
          </tr>
          {/* 데이터 출처(url) */}
          <tr>
            <th><div className="th-wrap">데이터 출처(URL)</div></th>
            <td>
              <div className="td-wrap">
                <Input
                  placeholder=""
                  value={inputDatasetURLValue}
                  onChange={handleDatasetURLChange}
                  className={"table-ver"}
                  required
                />
              </div>
            </td>
          </tr>
          {/* 라이선스/저작권 */}
          <tr>
            <th><div className="th-wrap">라이선스/저작권</div></th>
            <td>
              <div className="td-wrap">
                <Input
                  placeholder=""
                  value={inputLicenseValue}
                  onChange={handleLicenseChange}
                  className={"table-ver"}
                  required
                />
              </div>
            </td>
          </tr>
          {/* 상업적 이용 가능 여부 */}
          <tr>
            <th><div className="th-wrap">상업적 이용 가능 여부</div></th>
            <td>
              <div className="td-wrap">
                <Radio
                  name="commercial"
                  value="yes"
                  optionLabel="예"
                  checked={commercial === 'yes'}
                  onChange={() => setCommercial('yes')}
                />
                <Radio
                  name="commercial"
                  value="no"
                  optionLabel="아니오"
                  checked={commercial === 'no'}
                  onChange={() => setCommercial('no')}
                />
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      {/* 확인 여부 */}
      <div className="confirm-wrap">
        <Checkbox
          name="agreement"
          value="agree"
          checked={agreed}
          onChange={handleAgreeChange}
          optionLabel="본인은 업로드한 데이터가 저작권을 침해하지 않으며, 이마트24에서 상업적으로 사용·가공할 수 있는 권리를 보유하고 있음을 확인합니다."
        />
      </div>
      {/* 학습 버튼 */}
      <div className="btn-footer-wrap">
        <Button
          className={'table-form-btn'}
          onClick={handleLearning}
        >
          학습
        </Button>
      </div>
    </div>
  );
}
export default AiVideoGenerationLearning;