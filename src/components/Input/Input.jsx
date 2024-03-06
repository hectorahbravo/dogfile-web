import "./Input.css";

const Input = ({
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
}) => {
  return (
    <div>
      <input
        autoComplete={autocomplete}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className={`${className} ${classNamePlaceholder}`}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};
export default Input;
