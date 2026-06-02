import { TextField } from "@mui/material";

const CustomTextField = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder = "",
    error = "",
    select = false,
    required = false,
    children,
    ...props
}) => {

    return (
        <TextField
            fullWidth
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            error={!!error}
            helperText={error}
            select={select}
            required={required}
            margin="normal"
            {...props}
        >
            {children}
        </TextField>
    );
};

export default CustomTextField;