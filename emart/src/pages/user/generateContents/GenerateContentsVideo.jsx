
/* 사용한 컴포넌트 */
import VideoGeneratorSetting from '../../../components/generator/video/VideoGeneratorSetting.jsx'
import VideoGeneratorPrompt from '../../../components/generator/video/VideoGeneratorPrompt.jsx'
import ImageList from './../../../components/common/ImageList.jsx'

const GenerateContentsVideo = () => {
  return (
    <div className="generator-content-wrap">
      <VideoGeneratorSetting />
      <div className="generator-box">
        <ImageList/>
        <VideoGeneratorPrompt />
      </div>
    </div>
  );
}
export default GenerateContentsVideo;