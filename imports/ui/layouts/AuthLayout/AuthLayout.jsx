import { Box, Typography } from "@mui/material";

const AuthLayout = ({ children }) => {
    return (
        <Box
            id="1"
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #0f172a, #2b333f)"
            }}
        >

            <Box
            id="2"
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: "rgba(60, 130, 241, 0.15)",
                    filter: "blur(120px)",
                    top: "-200px",
                    right: "-200px"
                }}
            />

            <Box
            id="3"
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    p: 3,
                    zIndex: 1
                }}
            >

                <Box
                id="4"
                    sx={{
                        textAlign: "center",
                        mb: 2,
                        color: "#bfc2c7"
                    }}
                >
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        letterSpacing={1}
                    >
                        To Do List
                    </Typography>
                </Box>

                {children}

            </Box>
        </Box>
    );
};


export default AuthLayout;


