import { useState, useRef, useEffect } from 'react';
import SelectArrowIcon from '../../../assets/images/icon/ico_select_arrow.svg?react';

const Select = ({ label, className, value, onChange, options, openDirection = "bottom", colVer = true, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

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
    <div className={`select-wrapper ${colVer ? 'col-ver' : ''} ${className}`}>
      {label && (
        <div className="label-wrapper">
          <span className="select-label">{label}</span>
        </div>
      )}
      <div ref={ref} className="select-inner">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)} // disabled일 때 클릭 무시
          className={`select-button ${disabled ? "disabled" : ""}`}
        >
          <span className="select-button-label">{currentOption.label || '선택하세요'}</span>
          <SelectArrowIcon className={`${isOpen ? "open" : ""}`} />
        </button>
        {isOpen && !disabled && ( // 드롭다운도 disabled이면 안 보이게
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