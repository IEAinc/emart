import TextImageList from '../common/TextImageList.jsx'
import React from "react";
const AiSettingTextTab = ({items, onItemClick}) => {
  return (
    <>
      {items.map((list, idx) => (
        <TextImageList
          key={idx}
          title={list.title}
          eventTitle={list.eventTitle}
          items={list.items}
          tabType={list.tabType}
          onItemClick={onItemClick}
        />
      ))}
    </>
  );
}
export default AiSettingTextTab;