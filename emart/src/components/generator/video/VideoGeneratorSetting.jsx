import Select from '../../../components/common/forms/Select.jsx'
import TabRadioGroup from '../../../components/common/forms/TabRadioGroup.jsx'
import Radio1 from '../../../assets/images/generate/generate_11.svg?react'
import Radio2 from '../../..//assets/images/generate/generate_916.svg?react'
import Radio3 from '../../..//assets/images/generate/generate_43.svg?react'
const VideoGeneratorSetting = ({ settings, onChange }) => {
  const modelOptions = [
    { label: 'v.1.0', value: 'v.1.0' }
  ];
  const generateRadioTabList = [
    { label: '표준', value: '표준' },
    { label: 'FAST모드', value: 'FAST모드' },
  ];
  const styleOptions = [
    { label: '실사 스타일', value: '실사 스타일' },
    { label: '실사 스타일 2', value: '실사 스타일 2' },
    { label: '실사 스타일 3', value: '실사 스타일 3' },
  ];
  const brandOptions = [
    { label: '모던하고 심플한', value: '모던하고 심플한' },
    { label: '모던하고 심플한 2', value: '모던하고 심플한 2' },
    { label: '모던하고 심플한 3', value: '모던하고 심플한 3' },
  ];
  const resolutionOptions = [
    { label: '512*512', value: '512*512'},
  ];
  const tabList = [
    { label: '1:1', value: '1:1', icon: <Radio1 /> },
    { label: '9:16', value: '9:16', icon: <Radio2 /> },
    { label: '4:3', value:  '4:3', icon: <Radio3 /> },
  ];
  const tabList2 = [
    { label: '5초', value: '1' },
    { label: '10초', value: '2' },
    { label: '15초', value: '3' },
    { label: '20초', value: '4' },
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
            disabled
          />
        </div>

        <div className="list-box">
          <div className="list-title-wrap">
            <p className="list-tit">생성모드</p>
          </div>
          <TabRadioGroup
            items={generateRadioTabList}
            name="generate-radio"
            value={settings.generateMode}
            onChange={(value) => onChange('generateMode', value)}
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
            label="브랜드 톤"
            value={settings.brand}
            onChange={(option) => onChange('brand', option)}
            options={brandOptions}
            openDirection="bottom"
            disabled
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
            disabled
          />
          <Select
            label="해상도"
            value={settings.resolution}
            onChange={(option) => onChange('resolution', option)}
            options={resolutionOptions}
            openDirection="bottom"
            disabled
          />
          {/* 동영상 길이 */}
          <div className="list-title-wrap">
            <p className="list-tit">길이</p>
          </div>
          <TabRadioGroup
            items={tabList2}
            name="select2"
            value={settings.imageCount}
            onChange={(value) => onChange('imageCount', value)}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
export default VideoGeneratorSetting;