import { Box, Paper } from "@mui/material";

const FormCard = ({ children, sx = {} }) => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #0f172a, #1e293b)",
                p: 3,
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 5,
                    borderRadius: 4,
                    backgroundColor: "#1e293b",
                    ...sx
                }}
            >
                {children}
            </Paper>
        </Box>
    );
};

export default FormCard;