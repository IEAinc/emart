/* 사용한 컴포넌트 */
import TextGeneratorSetting from '../../../components/generator/text/TextGeneratorSetting.jsx'
import TextGeneratorPrompt from '../../../components/generator/text/TextGeneratorPrompt.jsx'
import TextList from '../../../components/generator/text/TextList.jsx'
import {useState} from "react";

const GenerateContentsText = () => {
  const [allTexts, setAllTexts] = useState([]); // 전체 텍스트
  const [settings, setSettings] = useState({
    model: { label: 'v.1.0', value: 'option1' },
    textLength: { label: 1, value: 'option1' },
    style: { label: '실사 스타일', value: 'option1' },
    purpose: { label: '목적1', value: 'option1' },
    brand: { label: '모던하고 심플한', value: 'option1' },
  });

  // TextGeneratorSetting에서 전달된 값 업데이트
  const handleSettingsChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    console.log('설정 업데이트:', key, value);
  };

  // TextGeneratorPrompt에서 전달된 텍스트 추가
  const handleAddText = (text) => {
    if (!text.trim()) return;

    const newItem = {
      id: Date.now(),
      text,
      settings, // 이미 settings가 초기값으로 채워져 있으므로 그대로 사용
    };

    setAllTexts((prev) => {
      const updated = [...prev, newItem];
      console.log('전체 텍스트 배열:', updated);
      return updated;
    });
  };
  
  /* 다운로드 */
  const handleDownload = () => {
    console.log('텍스트 다운로드');
  }
  return (
    <div className="generator-content-wrap">
      <TextGeneratorSetting settings={settings} onChange={handleSettingsChange} />
      <div className="generator-box">
        <TextList allTexts={allTexts} onDownload={handleDownload}/>
        <TextGeneratorPrompt onAddText={handleAddText}/>
      </div>
    </div>
  );
};

export default GenerateContentsText;