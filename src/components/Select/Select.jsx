const Select = ({
  options,
  value,
  onChange,
  name,
  label,
  error,
  className,
  extraClassName,
}) => {
  return (
    <div>
      <label htmlFor={name} className="dog-input-label">
        {label}
      </label>
      <select
        className={`${extraClassName} ${className} `}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="none">Selecciona</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default Select;
