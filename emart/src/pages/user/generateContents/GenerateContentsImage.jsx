/* 사용한 컴포넌트 */
import ImageGeneratorSetting from './../../../components/generator/image/ImageGeneratorSetting.jsx'
import ImageGeneratorPrompt from './../../../components/generator/image/ImageGeneratorPrompt.jsx'
import ImageList from '../../../components/generator/image/ImageList.jsx'
import {useState} from "react";
import {api, errorHandler} from "../../../util/axios.jsx";

const GenerateContentsImage = () => {
  const [isGen,setIsGen]=useState(false)
  const [imgUrl,setImgURl]=useState(null)
  const [allImages, setAllImages] = useState([
    {
      id: 1,
      src: 'https://picsum.photos/300/400?random=1',
      alt: '샘플 이미지 1',
      text: '이미지 설명 1',
      settings: {} // 필요하면 설정값
    },
    {
      id: 1,
      src: 'https://picsum.photos/300/400?random=1',
      alt: '샘플 이미지 1',
      text: '이미지 설명 1',
      settings: {} // 필요하면 설정값
    },
    {
      id: 1,
      src: 'https://picsum.photos/300/400?random=1',
      alt: '샘플 이미지 1',
      text: '이미지 설명 1',
      settings: {} // 필요하면 설정값
    },
  ]); // 전체 이미지
  const [settings, setSettings] = useState({
    model: { label: 'v.1.0', value: 'v.1.0' },
    generateMode: { label: '표준', value: '표준' },
    style: { label: '실사 스타일', value: '실사 스타일' },
    brand: { label: '모던하고 심플한', value: '모던하고 심플한'},
    ratio: { label: '1:1', value: '1:1' },
    resolution: { label: '512*512', value: '512*512' }, // 해상도 기본값
    imageCount: { label: '1', value: '1' },
  });
  // ImageGeneratorSetting에서 전달된 값 업데이트
  const handleSettingsChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    console.log('설정 업데이트:', key, value);
  };

  // ImageGeneratorPrompt에서 전달된 텍스트 추가
  const handleAddText = async ({text, file, previewUrl}) => {
    // text가 문자열인지 확인
    const trimmedText = typeof text === 'string' ? text.trim() : '';

    if (!trimmedText || !file) return;
    setIsGen(true)

    let data = {
      "model": settings.model.value,
      "mode": settings.generateMode.value,
      "style": settings.style.value,
      "tone": settings.brand.value,
      "count": Number(settings.imageCount.value),
      "width": Number(settings.resolution.value.split("*")[0]),
      "height": Number(settings.resolution.value.split("*")[1]),
      "img_url": imgUrl,
      "user_input": text
    }
    let response=null;
    try {
      response = await api.post("/IMAGE/image/makeImage", data, {})
    } catch (error) {
      console.error('사용자 목록 조회 실패:', errorHandler.handleError(error));
      setIsGen(false)
      return false;
    }
    console.log(response.data.save_url)
    const newItem = {
      id: Date.now(),
      text: trimmedText,
      file: file || null,        // 선택한 이미지 파일
      previewUrl: response.data.save_url[0].img_url, // 미리보기 URL
      src:response.data.save_url[0].img_url,
      settings,                  // 현재 선택된 설정값
    };
    setAllImages((prev) => {
      //const updated = [...prev, newItem];
      const updated = [newItem];
      console.log('전체 이미지 배열:', updated);
      setIsGen(false)
      return updated;
    });
  };

  /* 다운로드 */
  const handleDownload = async () => {
    console.log('이미지 다운로드');
    const url = allImages[0].src; // 다운로드할 이미지 주소
    const response = await fetch(url, {
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
    });
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = allImages[0].id+".png"; // 저장할 파일명
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(blobUrl); // 메모리 해제


  }

  return (
    <div className="generator-content-wrap">
      <ImageGeneratorSetting settings={settings} onChange={handleSettingsChange}/>
      <div className="generator-box">
        <ImageList allImages={allImages} onDownload={handleDownload} isGenerate={isGen}/>
        <ImageGeneratorPrompt onAddText={handleAddText} setImgURl={setImgURl} />
      </div>
    </div>
  );
}
export default GenerateContentsImage;