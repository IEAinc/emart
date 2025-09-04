const TabRadioItem = ({ label, value, name, checked, onChange, icon, disabled = false }) => {
  return (
    <label className={`tab-radio-item ${icon ? 'icon-ver' : ''} ${disabled ? 'disabled' : ''}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => !disabled && onChange(value)} // disabled면 선택 불가
        disabled={disabled} // 실제 input에도 disabled 적용
      />
      <span className="tab-radio-content">
        {icon && <span className="tab-radio-icon">{icon}</span>}
        <span className="tab-radio-label">{label}</span>
      </span>
    </label>
  );
};

export default TabRadioItem;
