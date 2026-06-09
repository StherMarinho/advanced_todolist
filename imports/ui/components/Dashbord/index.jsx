import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../DashboardCards";
import CustomButton from "../CustomButton";

const Dashboard =({ totalTasks, pendingTasks, currentTasks, completedTasks}) => {
    const navigate = useNavigate();

    const cards = [
        {
            title: "Total de tarefas cadastradas",
            value: totalTasks
        },
        {
            title: "Total de tarefas pendentes",
            value: pendingTasks
        },
        {
            title: "Total de tarefas em andamento",
            value: currentTasks
        },
        {
            title: "Total de tarefas concluídas",
            value: completedTasks
        }
    ];
    
    return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,  
            width: "100%"
        }}
    >
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                maxWidth: "800px",
                width: "100%",
                mx: "auto"
            }}
        >
            {
                cards.map((card) => (
                    <Box
                        key={card.title}
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "380px"
                            }
                        }}
                    >
                        <DashboardCard
                            title={card.title}
                            value={card.value}
                        >
                        </DashboardCard>
                    </Box>
                ))
            }
        </Box>
        <Box
            sx={{
                mt:6,
                display: "flex",
                justifyContent: "center",

            }}
        >
            <CustomButton
                text="Visualizar Tarefas"
                onClick={() => navigate("/tasks")}
                sx={{
                    width: 200,
                    height: 50
                }}
            >
            </CustomButton>
        </Box>
    </Box>
    );
};

export default Dashboard;