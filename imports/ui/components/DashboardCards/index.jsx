//cards de métricas
import { Paper, Typography } from "@mui/material"

const DashboardCard = ({ title, value, children }) => {

    return (
        <Paper
            elevation={4}
            sx={{
                width: "100%",
                maxWidth: {
                    xs: "100%",
                    sm: "340px"
                },
                minHeight: "180px",
                height: "auto",
                p: { 
                    xs: 1, 
                    sm: 2, 
                    md: 2 
                },
                borderRadius: 3,
                bgcolor:"#f8fafc",
                display: "flex",
                flexDirection:"column",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            {
                title &&
                <Typography
                    variant="h6"
                    sx={{
                        //fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    {title}
                </Typography>
            }
            {
                value !== undefined &&
                <Typography
                    variant="h2"
                    sx={{
                        //fontWeight: "bold",
                        textAlign: "center",
                        //color: "#1976d2"
                    }}
                >
                    {value}
                </Typography>
            }
            {children}
        </Paper>
    );
};

export default DashboardCard;