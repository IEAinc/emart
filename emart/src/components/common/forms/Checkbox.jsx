import { useId } from 'react';

const Checkbox = ({
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
    <div className="checkbox-wrapper">
      {labelName && (
        <div className="label-wrapper">
          <span className="checkbox-label">{labelName}</span>
        </div>
      )}
      <label htmlFor={inputId} className="checkbox">
        <input
          id={inputId}
          type="checkbox"
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

export default Checkbox;
