const Form = ({ inputs, handleChange, handleSubmit, handleCheckboxChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input, index) => (
        <div className="form-group" key={index}>
          <label>{input.label}</label>
          {input.type === 'checkbox' ? (
            <input
              type={input.type}
              checked={input.value}  // For checkboxes, use checked instead of value
              name={input.name}
              onChange={handleCheckboxChange}  // For checkboxes, use handleCheckboxChange
            />
          ) : (
            <input
              type={input.type}
              value={input.value}
              name={input.name}
              onChange={(e) => handleChange(e, input.name)}  // Pass the name correctly
            />
          )}
        </div>
      ))}
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default Form;
