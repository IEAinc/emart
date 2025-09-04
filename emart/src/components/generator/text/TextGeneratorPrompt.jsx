import { useState } from 'react'
import Input from '../../common/forms/Input.jsx'
import Button from '../../common/forms/Button.jsx'
const TextGeneratorPrompt = ({ onAddText }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => setInputValue(e.target.value);

  const handleClick = () => {
    if (!inputValue.trim()) return;
    onAddText && onAddText(inputValue);
    setInputValue(''); // 입력창 초기화
  };

  return (
    <div className="generator-prompt-wrap">
      <div className="prompt-input-wrap">
        <Input
          placeholder="생성할 텍스트에 대해 작성해주세요"
          value={inputValue}
          onChange={handleChange}
          required
        />
      </div>
      <Button className="prompt" onClick={handleClick}>
        <span>생성</span>
      </Button>
    </div>
  );
};

export default TextGeneratorPrompt;