/* 사용한 컴포넌트 */
import TextGeneratorSetting from '../../../components/generator/text/TextGeneratorSetting.jsx'
import TextGeneratorPrompt from '../../../components/generator/text/TextGeneratorPrompt.jsx'
import TextList from '../../../components/generator/text/TextList.jsx'
import {useState} from "react";
import {api, errorHandler} from "../../../util/axios.jsx";

const GenerateContentsText = () => {
  const [isGen,setIsGen]=useState(false)
  const [allTexts, setAllTexts] = useState([
  ]); // 전체 텍스트
  const [settings, setSettings] = useState({
    model: { label: 'v.1.0', value: 'v.1.0'},
    textLength: { label: 1, value: 3 },
    style: { label: '트랜디/밈 스타일', value: '트랜디/밈 스타일'},
    purpose: { label: '신제품 소개', value: '신제품 소개' },
    brand: { label: '모던하고 심플한', value: '모던하고 심플한' },
  });

  // TextGeneratorSetting에서 전달된 값 업데이트
  const handleSettingsChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // TextGeneratorPrompt에서 전달된 텍스트 추가
  const handleAddText = async (text) => {
    if (!text.trim()) return;
      if(isGen)return;
    let data = {
      "model": settings.model.value,
      "mode": "standard",
      "style": settings.style.value,
      "tone": settings.brand.value,
      "count": Number(settings.textLength.value),
      "purpose": settings.purpose.value,
      "user_input": text
    }
    setIsGen(true)
    //api.post("/LLM/llm/makeImage",data)
    let response=null;
    try {
      response = await api.post("/LLM/llm/makeText", data, {})
    } catch (error) {
      console.error('사용자 목록 조회 실패:', errorHandler.handleError(error));
      setIsGen(false)
      return false;
    }
    let result_list=[]
      for (let step = 0; step < response.data.text_list.length; step++) {
          let result=response.data.text_list[step].text
          let newItem = {
              id: Date.now(),
              text: result,
              settings, // 이미 settings가 초기값으로 채워져 있으므로 그대로 사용
          };
          result_list.push(JSON.parse(JSON.stringify(newItem)));
      }

    setAllTexts((prev) => {
      const updated = [...prev, ...result_list];
      setIsGen(false)
      return updated;
    });
  };
  
  /* 다운로드 */
  const handleDownload = () => {
  }
  return (
    <div className="generator-content-wrap">
      <TextGeneratorSetting settings={settings} onChange={handleSettingsChange} />
      <div className="generator-box">
        <TextList allTexts={allTexts} onDownload={handleDownload} isGenerate={isGen}/>
        <TextGeneratorPrompt onAddText={handleAddText}/>
      </div>
    </div>
  );
};

export default GenerateContentsText;