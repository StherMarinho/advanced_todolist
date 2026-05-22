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

    return (
        <div className="custom-textField">
            <label>
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
};

export default CustomTextField;