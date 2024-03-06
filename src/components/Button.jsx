const Button = ({ type, onClick, text, extraClassName }) => {
  return (
    <button type="submit" onClick={onClick}>
      {text}
    </button>
  );
};
export default Button;
