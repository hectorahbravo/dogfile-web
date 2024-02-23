const Input = ({
  value,
  onChange,
  name,
  placeholder,
  type,
  label,
  error,
  onBlur,
}) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className="form-control"
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
export default Input;
