import { useState, useRef, useEffect } from 'react';
import SelectArrowIcon from '../../../assets/images/icon/ico_select_arrow.svg?react';

const Select = ({ label, value, onChange, options, openDirection = "bottom", colVer=true}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null); // 드롭다운 감지용 ref

  // 현재 선택된 옵션 찾기
  const currentOption = options.find(option => option.value === value?.value) || {};
  useEffect(() => {
      const handleOutsideClick = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
              setIsOpen(false);
          }
      };
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
      };
  }, []);

  return (
    <div
      className={`
        select-wrapper
        ${colVer ? 'col-ver' : ''}
      `}
    >
      {label && (
        <div className={`label-wrapper`}>
          <div>
            <label className={`select-label`}>{label}</label>
          </div>
        </div>
      )}
      <div ref={ref} className="select-inner">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`select-button`}
        >
          <span className="select-button-label">{currentOption.label || '선택하세요'}</span>
          <SelectArrowIcon className={`${isOpen ? "open" : ""}`}/>
        </button>
        {isOpen && (
          <ul className={`select-dropdown ${openDirection === "top" ? "dropdown-top" : "dropdown-bottom"}`}>
            {options.map((option) => (
              <li
                key={option.value}
                className={`select-option ${value === option.value ? "selected" : ""}`}
                onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;