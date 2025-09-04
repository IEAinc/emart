import Select from '../../../components/common/forms/Select.jsx'

const TextGeneratorSetting = ({ settings, onChange }) => {
  const modelOptions =[
    { label: 'v.1.0', value: 'option1' }
  ];
  const textLengthOptions = [
    { label: 1, value: 'option1' },
  ];
  const styleOptions = [
    { label: '트랜디/밈 스타일', value: 'option1' },
  ];
  const purposeOptions = [
    { label: '신제품 소개', value: 'option1' },
  ];
  const brandOptions = [
    { label: '모던하고 심플한', value: 'option1' },
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
            disabled
          />
        </div>

        <div className="list-box">
          <Select
            label="생성 문구 개수"
            value={settings.textLength}
            onChange={(option) => onChange('textLength', option)}
            options={textLengthOptions}
            openDirection="bottom"
            disabled
          />
          <Select
            label="스타일"
            value={settings.style}
            onChange={(option) => onChange('style', option)}
            options={styleOptions}
            openDirection="bottom"
            disabled
          />
          <Select
            label="목적"
            value={settings.purpose}
            onChange={(option) => onChange('purpose', option)}
            options={purposeOptions}
            openDirection="bottom"
            disabled
          />
          <Select
            label="브랜드 톤"
            value={settings.brand}
            onChange={(option) => onChange('brand', option)}
            options={brandOptions}
            openDirection="bottom"
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default TextGeneratorSetting;
