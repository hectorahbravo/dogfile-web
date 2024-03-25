import "./Button.css"; // Importar el archivo CSS

const Button = ({
  type,
  onClick,
  text,
  extraClassName,
  className,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${extraClassName}`}
    >
      {text}
    </button>
  );
};

export default Button;
