import { useState } from 'react'
import Select from '../../../components/common/forms/Select.jsx'
import TabRadioGroup from '../../../components/common/forms/TabRadioGroup.jsx'
import Radio1 from '../../../assets/images/generate/generate_11.svg?react'
import Radio2 from '../../..//assets/images/generate/generate_916.svg?react'
import Radio3 from '../../..//assets/images/generate/generate_43.svg?react'
const ImageGeneratorSetting = () => {
  /* IEA-Gen-Image */
  const options = [
    { label: 'v.1.0', value: 'option1' },
    { label: 'v.1.0 2', value: 'option2' },
    { label: 'v.1.0 3', value: 'option3' }
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleChange = (option) => {
    setSelectedOption(option);
    console.log('선택된 옵션:', option);
  };
  /* 생성 모드 */
  const generateRadioTabList = [
    {label: '표준', value: '표준'},
    {label: 'FAST모드', value: 'FAST모드'},
  ]
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
            label="IEA-Gen-Image"
            value={selectedOption}
            onChange={handleChange}
            options={options}
            openDirection="bottom"
          />
        </div>
        <div className="list-box">
          <div className="list-title-wrap">
            <p className="list-tit">생성모드</p>
          </div>
          {/* 생성모드 */}
          <TabRadioGroup
            items={generateRadioTabList}
            name="generate-radio"
          />

          {/* 스타일 */}
          <Select
            label="스타일"
            value={selectedStyleOption}
            onChange={handleStyleChange}
            options={styleOtions}
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
        <div className="list-box">
          <p className="list-tit">이미지 설정</p>
          <div className="list-title-wrap">
            <p className="list-tit">이미지 비율</p>
          </div>
          <TabRadioGroup items={tabList} name="generate-radios" />
          <Select
            label="해상도"
            value={selectedOption}
            onChange={handleChange}
            options={options}
            openDirection="bottom"
          />
          <div className="list-title-wrap">
            <p className="list-tit">이미지 수</p>
          </div>
          <TabRadioGroup items={tabList2} name="select2" />
        </div>
      </div>

    </div>
  )
}
export default ImageGeneratorSetting;