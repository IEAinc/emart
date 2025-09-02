import { useState } from 'react'
import Input from '../../common/forms/Input.jsx'
import Button from '../../common/forms/Button.jsx'
const VideoGeneratorPrompt = () => {
  const [inputValue, setInputValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="generator-prompt-wrap">
      <div className="prompt-input-wrap">
        <Input
          placeholder="생성할 비디오에 대해 작성해주세요"
          value={inputValue}
          onChange={handleChange}
          disabled={isDisabled}
          required
        />
      </div>
      <Button
        className={'prompt'}
      >
        <span>
          생성
        </span>
      </Button>
    </div>
  )
}
export default VideoGeneratorPrompt;