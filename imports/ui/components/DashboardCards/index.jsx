//cards de métricas
import { Paper, Typography } from "@mui/material"

const DashboardCard = ({ title, value, children }) => {

    return (
        <Paper
            elevation={4}
            sx={{
                width: "100%",
                maxWidth: "300px",
                height: 180,
                p: 2,
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
                    fontWeight="bold"
                    textAlign="center"
                >
                    {title}
                </Typography>
            }
            {
                value !== undefined &&
                <Typography
                    variant="h2"
                    fontWeight="bold"
                    textAlign="center"
                >
                    {value}
                </Typography>
            }
            {children}
        </Paper>
    );
};

export default DashboardCard;