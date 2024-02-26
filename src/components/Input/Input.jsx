import './Input.css'

const Input = ({
  autocomplete,
  value,
  onChange,
  name,
  placeholder,
  type,
  label,
  error,
  onBlur,
  className
}) => {
  return (
    <div>
      <label htmlFor={name}>
        {label}
      </label>
      <input
        autoComplete={autocomplete}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className={className}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
export default Input;
