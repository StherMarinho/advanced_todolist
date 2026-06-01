import { Button } from "@mui/material";
import "./CustomButton.css";

const CustomButton = ({
    text,
    type = "button",
    onClick,
    disabled = false,
    variant = "contained",
    color = "primary",
    ...props
}) => {
    return (
        <Button
            fullWidth={true}
            type={type}
            onClick={onClick}
            disabled={disabled}
            variant={variant}
            color={color}
            sx={{
                height: 48,
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "bold",
                textTransform: "none"
            }}
            {...props}
        >
            {text}
        </Button>
    );
};

export default CustomButton;