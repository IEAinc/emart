import { useId } from 'react';

const Input = ({
                 id,
                 labelName,
                 className,
                 placeholder,
                 disabled = false,
                 readonly = false,
                 required = false,
                 type = 'text',
                 value,
                 name,
                 error,
                 onChange,
                 onInput,
                 onKeyDown,
               }) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`input-wrapper ${className}`}>
      {labelName && (
        <label htmlFor={inputId}>
          {labelName}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onInput={onInput}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        required={required}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default Input;
