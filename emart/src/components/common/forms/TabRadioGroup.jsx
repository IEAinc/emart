import { useState } from "react";
import TabRadioItem from './TabRadioItem.jsx';

const TabRadioGroup = ({ items = [], name = 'tab-group', selectedValue, onChange, disabled = false }) => {
  const [selected, setSelected] = useState(selectedValue ?? items[0]?.value ?? '');

  const handleChange = (value) => {
    if (disabled) return;
    setSelected(value);
    onChange && onChange(value); // 상위 콜백 호출
  };

  return (
    <div className="tab-radio-wrapper">
      {items.map((tab) => (
        <TabRadioItem
          key={tab.value}
          name={name}
          label={tab.label}
          value={tab.value}
          icon={tab?.icon}
          checked={selected === tab.value}
          onChange={handleChange}
          disabled={disabled} // disabled 전달
        />
      ))}
    </div>
  );
};

export default TabRadioGroup;
