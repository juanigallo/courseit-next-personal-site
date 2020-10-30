function Button({ onClick, value, name }) {
  return (
    <button onClick={onClick} name={name}>
      {value}
    </button>
  );
}

export default Button;
