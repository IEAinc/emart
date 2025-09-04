/* 사용한 컴포넌트 */
import ImageGeneratorSetting from './../../../components/generator/image/ImageGeneratorSetting.jsx'
import ImageGeneratorPrompt from './../../../components/generator/image/ImageGeneratorPrompt.jsx'
import ImageList from '../../../components/generator/image/ImageList.jsx'
import {useState} from "react";

const GenerateContentsImage = () => {
  const [allImages, setAllImages] = useState([
    {
      id: 1,
      src: 'https://picsum.photos/300/400?random=1',
      alt: '샘플 이미지 1',
      text: '이미지 설명 1',
      settings: {} // 필요하면 설정값
    },
  ]); // 전체 이미지
  const [settings, setSettings] = useState({
    model: { label: 'v.1.0', value: 'option1' },
    generateMode: { label: '표준', value: '표준' },
    style: { label: '실사 스타일', value: 'option1' },
    brand: { label: '모던하고 심플한', value: 'option1' },
    ratio: { label: '1:1', value: 'a' },
    resolution: { label: '512*512', value: 'option1' }, // 해상도 기본값
    imageCount: { label: '1', value: '1' },
  });
  // ImageGeneratorSetting에서 전달된 값 업데이트
  const handleSettingsChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    console.log('설정 업데이트:', key, value);
  };

  // ImageGeneratorPrompt에서 전달된 텍스트 추가
  const handleAddText = ({ text, file, previewUrl }) => {
    // text가 문자열인지 확인
    const trimmedText = typeof text === 'string' ? text.trim() : '';

    if (!trimmedText && !file) return;

    const newItem = {
      id: Date.now(),
      text: trimmedText,
      file: file || null,        // 선택한 이미지 파일
      previewUrl: previewUrl || '', // 미리보기 URL
      settings,                  // 현재 선택된 설정값
    };

    setAllImages((prev) => {
      const updated = [...prev, newItem];
      console.log('전체 이미지 배열:', updated);
      return updated;
    });
  };

  /* 다운로드 */
  const handleDownload = () => {
    console.log('이미지 다운로드');
  }

  return (
    <div className="generator-content-wrap">
      <ImageGeneratorSetting settings={settings} onChange={handleSettingsChange}/>
      <div className="generator-box">
        <ImageList allImages={allImages} onDownload={handleDownload}/>
        <ImageGeneratorPrompt onAddText={handleAddText} />
      </div>
    </div>
  );
}
export default GenerateContentsImage;