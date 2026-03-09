import Select from '../../../components/common/forms/Select.jsx'
import TabRadioGroup from '../../../components/common/forms/TabRadioGroup.jsx'
import Radio1 from '../../../assets/images/generate/generate_11.svg?react'
import Radio2 from '../../..//assets/images/generate/generate_916.svg?react'
import Radio3 from '../../..//assets/images/generate/generate_43.svg?react'
const VideoGeneratorSetting = ({ settings, onChange }) => {
  const modelOptions = [
    { label: 'v.1.0', value: 'v.1.0' }
  ];
  const styleOptions = [
    { label: '실사 스타일', value: '실사 스타일' },
  ];
  const brandOptions = [
    { label: '모던하고 심플한', value: '모던하고 심플한' },
  ];
  const resolutionOptions = [
    { label: '512*512', value: '512*512'},
  ];
  const tabList = [
    { label: '1:1', value: '1:1', icon: <Radio1 /> },
    { label: '9:16', value: '9:16', icon: <Radio2 /> },
    { label: '4:3', value:  '4:3', icon: <Radio3 /> },
  ];

  return (
    <div className="generator-wrap">
      <div className="list-wrapper">
        <div className="list-box">
          <div className="list-title-wrap">
            <p className="list-tit">모델</p>
          </div>
          <Select
            label="IEA-Gen-Video"
            value={settings.model}
            onChange={(option) => onChange('model', option)}
            options={modelOptions}
            openDirection="bottom"
          />
        </div>

        <div className="list-box">
          <Select
            label="스타일"
            value={settings.style}
            onChange={(option) => onChange('style', option)}
            options={styleOptions}
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

        <div className="list-box">
          <p className="list-tit">동영상 설정</p>
          {/* 동영상 비율 */}
          <div className="list-title-wrap">
            <p className="list-tit">동영상 비율</p>
          </div>
          <TabRadioGroup
            items={tabList}
            name="generate-radios"
            value={settings.ratio}
            onChange={(value) => onChange('ratio', value)}
          />
          <Select
            label="해상도"
            value={settings.resolution}
            onChange={(option) => onChange('resolution', option)}
            options={resolutionOptions}
            openDirection="bottom"
          />
        </div>
      </div>
    </div>
  );
}
export default VideoGeneratorSetting;