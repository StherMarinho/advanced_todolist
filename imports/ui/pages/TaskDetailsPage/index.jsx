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
import { TASKS_STATUS } from "../../../constants/tasksStatus";


const TaskDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isNewTask = !id;
    const [isEditing, setIsEditing] = useState(false);

    const subscription = useTracker(() => {
        return Meteor.subscribe("taskById", id);
    }, [id]);

    const isLoading = !subscription.ready();

    const task = useTracker(() => {
        return TasksCollection.findOne(id);
    }, [id]);

    const user = useTracker(() => {
        return Meteor.users.findOne(task?.userId);
    }, [task?.userId]);
    
    const isOwner = task?.userId === Meteor.userId(); //"?." é o operador de encadeamento opcional, que permite acessar a propriedade userId de task sem causar um erro se task for null ou undefined. 


    function handleStatusChange(status) {


        Meteor.call(
            "tasks.changeStatus",
            {
                _taskId: task._id,
                status
            },
            (error) => {
                if (error) {
                    alert("Erro ao atualizar status: " + error.message || error.reason);
                }
            }
        );
    }

    // nova tarefa
    if (isNewTask) {
        return (
            <Paper 
                sx={{ 
                    p: {
                        xs: 2,
                        md: 4
                    }
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
                    flexDirection: {
                        xs: "column",
                        md: "row"
                    },
                    justifyContent: "space-between",
                    alignItems:{
                        xs: "flex-start",
                        md: "center"
                    },
                    gap: 2
                }}
            >
                <Typography
                    mb={3}
                    sx={{
                        fontSize: {
                            xs: "24px",
                            md: "40px"
                        }
                    }}
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
                                    flexDirection: {
                                        xs: "column",
                                        md: "row"
                                    },
                                    alignItems: {
                                        xs: "flex-start",
                                        md: "center"
                                    }
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
                                    {user?.profile?.name || "Usuário"}
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
                                direction= {{
                                    xs: "column",
                                    md: "row"
                                }}
                                spacing={2}
                                sx={{
                                    mt: 3,
                                    width: "100%"
                                }}          
                            >

                                <CustomButton
                                    text="Editar"
                                    onClick={() => setIsEditing(true)}
                                />

                                <CustomButton
                                    text="Iniciar"
                                    disabled={task.status !== TASKS_STATUS.CREATED}
                                    onClick={() =>
                                        handleStatusChange(TASKS_STATUS.IN_PROGRESS)
                                    }
                                />

                                <CustomButton
                                    text="Concluir"
                                    disabled={task.status !== TASKS_STATUS.IN_PROGRESS}
                                    onClick={() =>
                                        handleStatusChange(TASKS_STATUS.COMPLETED)
                                    }
                                />

                                <CustomButton
                                    text="Resetar"
                                    onClick={() =>
                                        handleStatusChange(TASKS_STATUS.CREATED)
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
