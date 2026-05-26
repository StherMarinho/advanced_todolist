import { useParams, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import { Box, Typography, Paper, Stack } from "@mui/material";

import { useState } from "react";

import { TasksCollection } from "../../../api/tasks/TasksCollection";

import TaskForm from "../../components/TaskForm";
import CustomButton from "../../components/CustomButton";


const TaskDetailsPage = () => {
    const { id } = useParams();
    const isNewTask = !id;
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    const task = useTracker(() => {

        if (isNewTask) {
            return null;
        }
        const subscription = Meteor.subscribe("tasks");

        if (!subscription.ready()) {
            return null;
        }
        return TasksCollection.findOne(id);

    }, [id]);
    const isOwner = task?.userId === Meteor.userId(); //"?." é o operador de encadeamento opcional, que permite acessar a propriedade userId de task sem causar um erro se task for null ou undefined. 


    function handleStatusChange(status) {


        Meteor.call(
            "tasks.changeStatus",
            {
                _taskId: task._id,
                status
            }
        );
    }

    // NOVA TAREFA
    if (isNewTask) {
        return (
            <Paper sx={{ p: 4 }}>

                <Typography
                    variant="h4"
                    mb={3}
                >
                    Nova Tarefa
                </Typography>

                <TaskForm
                    onCancel={() => navigate("/tasks")}
                    onSuccess={() => navigate("/tasks")}
                />

            </Paper>
        );
    }
    // LOADING / NÃO ENCONTROU
    if (!task) {
        return (
            <Typography variant="h5">
                Tarefa não encontrada
            </Typography>
        );
    }

    // VISUALIZAÇÃO / EDIÇÃO
    return (
        <Paper sx={{ p: 4 }}>
            <Typography
                variant="h4"
                mb={3}
            >
                Detalhes da Tarefa
            </Typography>
            {
                isEditing ? (
                    <TaskForm
                        task={task}
                        onCancel={() => setIsEditing(false)}
                        onSuccess={() => {
                            setIsEditing(false);
                            navigate("/tasks");
                        }}
                    />

                ) : (
                    <Box>
                        <Typography>
                            <strong>Nome:</strong> {task.name}
                        </Typography>

                        <Typography>
                            <strong>Descrição:</strong> {task.description}
                        </Typography>

                        <Typography>
                            <strong>Status:</strong> {task.status}
                        </Typography>

                        <Typography>
                            <strong>Criado por:</strong> {task.createdBy}
                        </Typography>

                        <Typography>
                            <strong>Data:</strong> {
                                task.createdAt?.toLocaleDateString()
                            }
                        </Typography>
                        {isOwner && (
                            <Stack
                                direction="row"
                                spacing={2}
                                mt={4}
                            >

                                <CustomButton
                                    text="Editar"
                                    onClick={() => setIsEditing(true)}
                                />

                                <CustomButton
                                    text="Iniciar"
                                    disabled={task.status !== "Cadastrada"}
                                    onClick={() =>
                                        handleStatusChange("Em Andamento")
                                    }
                                />

                                <CustomButton
                                    text="Concluir"
                                    disabled={task.status !== "Em Andamento"}
                                    onClick={() =>
                                        handleStatusChange("Concluída")
                                    }
                                />

                                <CustomButton
                                    text="Resetar"
                                    onClick={() =>
                                        handleStatusChange("Cadastrada")
                                    }
                                />
                            </Stack>
                        )}
                    </Box>
                )
            }
        </Paper>
    );
};


export default TaskDetailsPage;
