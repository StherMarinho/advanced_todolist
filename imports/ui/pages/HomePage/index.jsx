import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { Box, Typography, MenuItem } from "@mui/material";

import { TasksCollection } from "../../../api/tasks/TasksCollection";

import Dashboard from "../../components/Dashbord";
import CustomTextField from "../../components/CustomTextField";

import { TASKS_STATUS } from "../../../constants/tasksStatus";
import { dashboardFilter } from "../../state/taskFilter";

const HomePage = () => {

    const user = useTracker(() => Meteor.user());

    const filter = useTracker(() => {
        return dashboardFilter.get();
    });

    const subscription = useTracker(() => {
        return Meteor.subscribe("tasksSummary", filter);
    });

    const tasks = useTracker(() => {
        if (!subscription.ready()) return [];
        
        return TasksCollection.find({}, {
            sort: { createdAt: -1 }
        }).fetch();
    });

    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(
        (task) => task.status === TASKS_STATUS.CREATED
    ).length;

    const currentTasks = tasks.filter(
        (task) => task.status === TASKS_STATUS.IN_PROGRESS
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === TASKS_STATUS.COMPLETED
    ).length;

    return (

        <Box
            sx={{
                p: { xs: 1, sm: 2, md: 2 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >

            <Typography
                fontWeight="bold"
                sx={{
                    width:"100%",
                    textAlign: "center",
                    fontSize: {
                        xs: "24px",
                        sm: "28px",
                        md: "40px"
                    }
                }}
            >
                Olá {user?.profile?.name},
                seja bem-vindo(a) ao To Do List
            </Typography>

            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: 300
                    },
                    minWidth: 250,
                    mt: 3
                }}
            >
                <CustomTextField
                        label="Exibir"
                        select
                        value={filter}
                        onChange={(e) => dashboardFilter.set(e.target.value)}
                    >

                        <MenuItem value="all">
                            Tarefas Públicas e Pessoais
                        </MenuItem>

                        <MenuItem value="private">
                            Minhas Tarefas
                        </MenuItem>

                        <MenuItem value="public">
                            Tarefas Públicas
                        </MenuItem>
                    </CustomTextField>
            </Box>

            <Dashboard
                totalTasks={totalTasks}
                pendingTasks={pendingTasks}
                currentTasks={currentTasks}
                completedTasks={completedTasks}
            >
            </Dashboard>

        </Box>
    );
};

export default HomePage;