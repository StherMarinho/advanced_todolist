import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { TasksCollection } from "../../../api/tasks/TasksCollection";

import Dashboard from "../../components/Dashbord";
import { TASKS_STATUS } from "../../../constants/tasksStatus";

const HomePage = () => {

    const user = useTracker(() => Meteor.user());

    const subscription = useTracker(() => {
        return Meteor.subscribe("tasksSummary");
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