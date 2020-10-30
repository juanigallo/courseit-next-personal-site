function Input({ onChange, onKeyPress, placeholder, value, name }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={onKeyPress}
      value={value}
      name={name}
    />
  );
}

export default Input;
