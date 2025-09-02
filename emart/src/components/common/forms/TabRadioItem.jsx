const TabRadioItem = ({ label, value, name, checked, onChange, icon }) => {
  return (
    <label
      className={`
        tab-radio-item
        ${icon ? 'icon-ver' : ''}
      `}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span className={`tab-radio-content`}>
        {icon && <span className="tab-radio-icon">{icon}</span>}
        <span className="tab-radio-label">{label}</span>
      </span>
    </label>
  );
};

export default TabRadioItem;
