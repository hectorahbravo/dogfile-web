const Button = ({ type, onClick, text, extraClassName }) => {
  return (
    <button type="submit" onClick={onClick} className="btn btn-primary">
      {text}
    </button>
  );
};
export default Button;
