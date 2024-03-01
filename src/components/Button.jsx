const Button = ({ type, onClick, text }) => {
  return (
    <button type={type} onClick={onClick} className="btn btn-primary">
      {text}
    </button>
  );
};
export default Button;
