import { useState } from 'react'
import Select from '../../../components/common/forms/Select.jsx'
import TabRadioGroup from '../../../components/common/forms/TabRadioGroup.jsx'
import Radio1 from '../../../assets/images/generate/generate_11.svg?react'
import Radio2 from '../../..//assets/images/generate/generate_916.svg?react'
import Radio3 from '../../..//assets/images/generate/generate_43.svg?react'
const TextGeneratorSetting = () => {
  /* IEA-Gen-Text */
  const options = [
    { label: 'v.1.0', value: 'option1' },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleChange = (option) => {
    setSelectedOption(option);
    console.log('선택된 옵션:', option);
  };
  /* 생성 문구 개수 */
  const generateTextLength = [
    { label: 1, value: 'option1' },
    { label: 2, value: 'option2' },
    { label: 3, value: 'option3' },
    { label: 4, value: 'option4' },
    { label: 5, value: 'option5' }
  ]
  const [selectedTextLength, setSelectedTextLength] = useState(generateTextLength[0]);
  const handleTextLengthChange = (option) => {
    setSelectedTextLength(option);
    console.log('선택된 옵션(생성 문구 개수):', option);
  }
  /* 스타일 */
  const styleOtions = [
    { label: '실사 스타일', value: 'option1' },
    { label: '실사 스타일 2', value: 'option2' },
    { label: '실사 스타일 3', value: 'option3' }
  ];
  const [selectedStyleOption, setSelectedStyleOption] = useState(styleOtions[0]);
  const handleStyleChange = (option) => {
    setSelectedStyleOption(option);
    console.log('선택된 옵션(스타일):', option);
  };
  /* 목적 */
  const purposeOptions = [
    { label: '실사 스타일', value: 'option1' },
    { label: '실사 스타일 2', value: 'option2' },
    { label: '실사 스타일 3', value: 'option3' }
  ];
  const [selectedPurposeOption, setSelectedPurposeOption] = useState(styleOtions[0]);
  const handlePurposeChange = (option) => {
    setSelectedPurposeOption(option);
    console.log('선택된 옵션(스타일):', option);
  };
  /* 브랜드 톤 */
  const brandOptions = [
    { label: '모던하고 심플한', value: 'option1' },
    { label: '모던하고 심플한 2', value: 'option2' },
    { label: '모던하고 심플한 3', value: 'option3' }
  ];
  const [selectedBrandOption, setSelectedBrandOption] = useState(brandOptions[0]);
  const handleBrandChange = (option) => {
    setSelectedBrandOption(option);
    console.log('선택된 옵션(스타일):', option);
  };
  /* TabRadio */
  const tabList = [
    { label: '1:1', value: 'a', icon: <Radio1 /> },
    { label: '9:16', value: 'b', icon: <Radio2 /> },
    { label: '4:3', value: 'c', icon: <Radio3 /> },
  ];
  const tabList2 = [
    { label: '1', value: '1'},
    { label: '2', value: '2'},
    { label: '3', value: '3'},
    { label: '4', value: '4'},
  ];
  return (
    <div className="generator-wrap">
      <div className="list-wrapper">
        <div className="list-box">
          {/* 제목 */}
          <div className="list-title-wrap">
            <p className="list-tit">모델</p>
          </div>
          {/* 컴포넌트 */}
          <Select
            label="IEA-Gen-Text"
            value={selectedOption}
            onChange={handleChange}
            options={options}
            openDirection="bottom"
          />
        </div>
        <div className="list-box">
          {/* 생성 문구 개수 */}
          <Select
            label="생성 문구 개수"
            value={selectedTextLength}
            onChange={handleTextLengthChange}
            options={generateTextLength}
            openDirection="bottom"
          />

          {/* 스타일 */}
          <Select
            label="스타일"
            value={selectedStyleOption}
            onChange={handleStyleChange}
            options={styleOtions}
            openDirection="bottom"
          />
          
          {/* 목적 */}
          <Select
            label="목적"
            value={selectedPurposeOption}
            onChange={handlePurposeChange}
            options={purposeOptions}
            openDirection="bottom"
          />

          {/* 브랜드 톤 */}
          <Select
            label="브랜드 톤"
            value={selectedBrandOption}
            onChange={handleBrandChange}
            options={brandOptions}
            openDirection="bottom"
          />
        </div>
      </div>

    </div>
  )
}
export default TextGeneratorSetting;