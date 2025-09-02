/* 사용한 컴포넌트 */
import ImageGeneratorSetting from './../../../components/generator/image/ImageGeneratorSetting.jsx'
import ImageGeneratorPrompt from './../../../components/generator/image/ImageGeneratorPrompt.jsx'
import ImageList from './../../../components/common/ImageList.jsx'

const GenerateContentsImage = () => {
  return (
    <div className="generator-content-wrap">
      <ImageGeneratorSetting />
      <div className="generator-box">
        <ImageList/>
        <ImageGeneratorPrompt />
      </div>
    </div>
  );
}
export default GenerateContentsImage;