import { useId } from 'react';

const Textarea = ({
                    id,
                    labelName,
                    placeholder,
                    disabled = false,
                    readonly = false,
                    required = false,
                    value,
                    name,
                    error,
                    rows = 4,
                    onChange,
                    onInput,
                    onKeyDown,
                  }) => {
  const generatedId = useId();
  const textareaId = id || generatedId;

  return (
    <div className="textarea-wrapper">
      {labelName && (
        <label htmlFor={textareaId}>
          {labelName}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        value={value}
        rows={rows}
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
};

export default Textarea;
