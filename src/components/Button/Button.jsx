import './Button.css'; // Importar el archivo CSS

const Button = ({ type, onClick, text, extraClassName, className }) => {
  return (
    <button type={type} onClick={onClick} className={`${className} ${extraClassName}`}>
      {text}
    </button>
  );
};

export default Button;
