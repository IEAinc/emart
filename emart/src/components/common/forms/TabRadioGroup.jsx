import {useState} from "react";
import TabRadioItem from './TabRadioItem.jsx';
const TabRadioGroup = ({items=[],name = 'tab-group' }) => {
  const [selected, setSelected] = useState(items[0]?.value ?? '');

  return (
    <div className="tab-radio-wrapper">
      {items.map((tab) => (
        <TabRadioItem
          key={tab.value}
          name={name}
          label={tab.label}
          value={tab.value}
          icon={tab?.icon}
          iconClass={tab?.iconClass}
          checked={selected === tab.value}
          onChange={setSelected}
        />
      ))}
    </div>
  );
}
export default TabRadioGroup;