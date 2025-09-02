import { useId } from 'react';

const Radio = ({
                 id,
                 name,
                 value,
                 labelName,
                 optionLabel,
                 checked,
                 onChange,
               }) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="radio-wrapper">
      {labelName && (
        <div className="label-wrapper">
          <span className="radio-label">{labelName}</span>
        </div>
      )}
      <label htmlFor={inputId} className="radio">
        <input
          id={inputId}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <span></span>
        {optionLabel}
      </label>
    </div>
  );
};

export default Radio;
