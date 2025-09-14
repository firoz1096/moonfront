
//custom input fields reusable 
export default function CustomInputField({
  label,
  type,
  name,
  placeholder,
  value,
  errors,
  setErrors,
  setFormData,
  colClass = "col-12",
}) {
  const handleChange = (e) => {
    const newValue = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className={colClass}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );
}
