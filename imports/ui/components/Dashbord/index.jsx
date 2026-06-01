//visualizar o dashboard, sem precisar de uma pagina para ele - exibe os cards, organiza o layout
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
            mt: 5
        }}
    >
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 4,
                maxWidth: "900px"
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
                mt:6
            }}
        >
            <CustomButton
                text="Visualizar Tarefas"
                onClick={() => navigate("/tasks")}
                sx={{
                    width: 300,
                    height: 50
                }}
            >
            </CustomButton>
        </Box>
    </Box>
    );
};

export default Dashboard;