//Responsabilidade: lista de tarefas, remover tarefas, atualizar tarefas, filtros; pesquisa; paginação.
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import { TasksCollection } from "../../../api/tasks/TasksCollection";
import TaskList from "../../components/TaskList";
import CustomButton from "../../components/CustomButton";

const TasksPage = () => {
    const navigate = useNavigate();
    
    const tasks = useTracker(() => {
    const subscription = Meteor.subscribe("tasks");
    if (!subscription.ready()) {
        return [];
    }
        return TasksCollection.find().fetch();
    });

    return (
        <Box>
            <Typography 
                variant="h4"
                mb={3}
            >
                Lista de Tarefas
            </Typography>
            <TaskList tasks={tasks} />
            <Box mb={3}>
                <CustomButton
                    text="Criar tarefa"
                    onClick={() => navigate("/tasks/new")}
                />
            </Box>
        </Box>
    );
};
export default TasksPage;