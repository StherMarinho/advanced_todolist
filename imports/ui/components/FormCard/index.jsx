import { Box, Paper } from "@mui/material";

const FormCard = ({ children, sx = {} }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 5,
                    borderRadius: 4,
                    backgroundColor: "#bfc2c7",
                    ...sx
                }}
            >
                {children}
            </Paper>
        </Box>
    );
};

export default FormCard;