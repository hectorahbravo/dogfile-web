const Select = ({
  options,
  value,
  onChange,
  name,
  label,
  error,
  className,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        className={className}
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
