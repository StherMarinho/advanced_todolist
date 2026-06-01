import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { TasksCollection } from "../../../api/tasks/TasksCollection";

import Dashboard from "../../components/Dashbord";

const HomePage = () => {

    const navigate = useNavigate();

    const user = useTracker(() => Meteor.user());

    const tasks = useTracker(() => {

        Meteor.subscribe("tasks",true,"",1);

        return TasksCollection.find({
            userId: user?._id
        }).fetch();

    });

    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "Cadastrada"
    ).length;

    const currentTasks = tasks.filter(
        (task) => task.status === "Em Andamento"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Concluída"
    ).length;

    return (

        <Box
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >

            <Typography
                variant="h4"
                textAlign="center"
                fontWeight="bold"
            >
                Olá {user?.profile?.name},
                seja bem-vindo ao To Do List
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