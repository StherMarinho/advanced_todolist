import { useParams, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import { Box, Typography, Paper, Stack } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useState } from "react";

import { TasksCollection } from "../../../api/tasks/TasksCollection";

import TaskForm from "../../components/TaskForm";
import CustomButton from "../../components/CustomButton";


const TaskDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isNewTask = !id;
    const [isEditing, setIsEditing] = useState(false);

    const task = useTracker(() => {

        if (isNewTask) {
            return null;
        }
        const subscription = Meteor.subscribe("tasks", true);

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

    // nova tarefa
    if (isNewTask) {
        return (
            <Paper 
                sx={{ 
                    p: 4 
                }}
            >

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
    if (!task) {
        return (
            <Typography variant="h5">
                Tarefa não encontrada
            </Typography>
        );
    }
    //editar/ver detalhes da tarefa
    return (
        <Paper 
            sx={{
                p: 4 
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems:"center",
                    mb: 3
                }}
            >
                <Typography
                    variant="h4"
                    mb={3}
                >
                    Detalhes da Tarefa
                </Typography>

                <Tooltip title="Voltar para lista de tarefas">
                    <IconButton
                        onClick={() => navigate("/tasks")}
                    >
                        <ArrowBack />
                    </IconButton>
                </Tooltip>
                
            </Box>
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
                        <Box
                            sx={{
                                mt: 2
                            }}          
                        >
                            <Box
                                sx={{
                                    mb: 0.5,
                                    display: "flex",
                                    gap: 1,
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "bold"
                                    }}
                                >
                                    Nome:
                                </Typography>

                                <Typography
                                >
                                    {task.name}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    mb: 0.5,
                                    display: "flex",
                                    gap: 1,
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "bold"
                                    }}
                                >
                                    Descrição:
                                </Typography>

                                <Typography
                                >
                                    {task.description}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    mb: 0.5,
                                    display: "flex",
                                    gap: 1,
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "bold"
                                    }}
                                >
                                    Status:
                                </Typography>

                                <Typography
                                >
                                    {task.status}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    mb: 0.5,
                                    display: "flex",
                                    gap: 1,
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "bold"
                                    }}
                                >
                                    Criado por:
                                </Typography>

                                <Typography
                                >
                                    {task.createdBy}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    mb: 0.5,
                                    display: "flex",
                                    gap: 1,
                                    alignItems: "center"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "bold"
                                    }}
                                >
                                    Data:
                                </Typography>

                                <Typography
                                >
                                    {task.createdAt?.toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>

                        {isOwner && (
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    mt: 3
                                }}          
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
