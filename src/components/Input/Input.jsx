import "./Input.css";

const Input = ({
  rows,
  autocomplete,
  value,
  onChange,
  name,
  placeholder,
  type,
  error,
  onBlur,
  className,
  classNamePlaceholder,
  style,
  extraClassName,
  label,
}) => {
  return (
    <div>
      <label className="dog-input-label">{label}</label>
      <input
        rows={rows}
        autoComplete={autocomplete}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className={`${className} ${classNamePlaceholder} ${extraClassName}`}
        style={style}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};
export default Input;
