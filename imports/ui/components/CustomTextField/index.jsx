import "./CustomTextField.css";

const CustomTextField = ({ 
    label, 
    type = "text",
    value, 
    onChange, 
    required = false,
    placeholder = "",
    error = ""
}) => {

    const handleChange = (evento) => {
        onChange(evento.target.value);
};
    return (
        <div className="custom-textField">
            <label>
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={handleChange}
                required={required}
                placeholder={placeholder}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
};

export default CustomTextField;