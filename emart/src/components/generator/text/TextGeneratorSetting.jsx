import Select from '../../../components/common/forms/Select.jsx'

const TextGeneratorSetting = ({ settings, onChange }) => {
  const modelOptions =[
    { label: 'v.1.0', value: 'v.1.0' }
  ];
  const textLengthOptions = [
      { label: 1, value: 1},
      { label: 2, value: 2},
      { label: 3, value: 3},
      { label: 4, value: 4}
  ];
  const styleOptions = [
      { label: '트랜디/밈 스타일', value: '트랜디/밈 스타일'},
  ];
  const purposeOptions = [
      { label: '신제품 소개', value: '신제품 소개' },
  ];
  const brandOptions = [
      { label: '따뜻하고 감성적인', value: '따뜻하고 감성적인'},
      { label: '모던하고 심플한', value: '모던하고 심플한'},
      { label: '경쾌하고 발랄한', value: '경쾌하고 발랄한'},
      { label: '프리미엄 & 고급스러운', value: '프리미엄 & 고급스러운'},
      { label: '강렬하고 에너지 있는', value: '강렬하고 에너지 있는'},
  ];

  return (
    <div className="generator-wrap">
      <div className="list-wrapper">
        <div className="list-box">
          <div className="list-title-wrap">
            <p className="list-tit">모델</p>
          </div>
          <Select
            label="IEA-Gen-Text"
            value={settings.model}
            onChange={(option) => onChange('model', option)}
            options={modelOptions}
            openDirection="bottom"
          />
        </div>

        <div className="list-box">
          <Select
            label="생성 문구 개수"
            value={settings.textLength}
            onChange={(option) => onChange('textLength', option)}
            options={textLengthOptions}
            openDirection="bottom"
          />
          <Select
            label="스타일"
            value={settings.style}
            onChange={(option) => onChange('style', option)}
            options={styleOptions}
            openDirection="bottom"
          />
          <Select
            label="목적"
            value={settings.purpose}
            onChange={(option) => onChange('purpose', option)}
            options={purposeOptions}
            openDirection="bottom"
          />
          <Select
            label="브랜드 톤"
            value={settings.brand}
            onChange={(option) => onChange('brand', option)}
            options={brandOptions}
            openDirection="bottom"
          />
        </div>
      </div>
    </div>
  );
};

export default TextGeneratorSetting;
