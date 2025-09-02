/* 사용한 컴포넌트 */
import TextGeneratorSetting from '../../../components/generator/text/TextGeneratorSetting.jsx'
import TextGeneratorPrompt from '../../../components/generator/text/TextGeneratorPrompt.jsx'
import ImageList from './../../../components/common/ImageList.jsx'

const GenerateContentsText = () => {
  return (
    <div className="generator-content-wrap">
      <TextGeneratorSetting />
      <div className="generator-box">
        <ImageList/>
        <TextGeneratorPrompt />
      </div>
    </div>
  );
}
export default GenerateContentsText;