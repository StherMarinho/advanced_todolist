//Responsabilidade: lista de tarefas, remover tarefas, atualizar tarefas, filtros; pesquisa; paginação.
import { Box, Typography, Checkbox, FormControlLabel, Stack } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useFind, useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { useState, useEffect } from "react";

import { showCompletedTasks, searchTasksText, currentPage } from "../../state/taskFilter";
import { TasksCollection } from "../../../api/tasks/TasksCollection";

import TaskList from "../../components/TaskList";
import CustomButton from "../../components/CustomButton";
import CustomTextField from "../../components/CustomTextField";

const TasksPage = () => {
    const navigate = useNavigate();
    
    const showCompleted = useTracker(() => {
        return showCompletedTasks.get();
    });

    const searchText = useTracker(() => {
        return searchTasksText.get();
    });

    const page = useTracker(() => {
        return currentPage.get();
    });

    const [totalTasks, setTotalTasks] = useState(0);
    useEffect(() => {
        Meteor.call(
            "tasks.count",
            showCompleted,
            searchText,
            (error, result) => {
                if (!error) {
                    setTotalTasks(result);
                }
            }
        );
    }, [showCompleted, searchText]);
    const totalPages = Math.ceil(totalTasks / 4);

    useSubscribe("tasks", showCompleted, searchText, page)();

    useSubscribe("tasksUsers")();

    const tasks = useFind(() => TasksCollection.find({}, {
        sort: { createdAt: -1 }
        }),
        [showCompleted, searchText, page]
    );

    const users = useFind(
        () => Meteor.users.find(),
        []
    );

    const usersMap = {};
    users.forEach((user)=>{
        usersMap[user._id] = user;
    })

    return (
        <Box>
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
                    fontWeight="bold"
                    sx={{
                        textAlign: "center",
                        fontSize: {
                            xs: "24px",
                            md: "40px"
                        }
                    }}
                >
                    Lista de Tarefas
                </Typography>
            </Box>


            <Box 
                sx={{
                    width:"100%",
                    maxWidth: "1000px",
                    mx: "auto",
                    mt:2,
                    mb:2
                }}
            >
                <CustomTextField
                    label="Pesquisar tarefa"
                    value={searchText}
                    onChange={(evento) => {
                        searchTasksText.set(evento.target.value);
                        currentPage.set(1);
                    }}
                    placeholder="Digite o nome da tarefa"
                >
                </CustomTextField>
            </Box>

            <Box 
                sx={{
                    width:"100%",
                    display:"flex",
                    justifyContent:"center",
                    mb:3,
                }}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showCompleted}
                            onChange={(evento) => {
                                showCompletedTasks.set(evento.target.checked);
                                currentPage.set(1);
                            }}
                        />
                    }
                    label="Exibir tarefas concluídas"
                />
            </Box>

            <Box
                sx={{
                    maxWidth: "900px",
                    mx: "auto",
                    mt:2,
                    mb:2
                }}
            >
                <TaskList 
                    tasks={tasks} 
                    usersMap={usersMap}
                />
            </Box>

            <Box
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    mt:4,
                    mb:4
                }}
            >
                <Stack
                    direction={{ 
                        xs: "column", 
                        sm: "row" 
                    }}
                    spacing={2}
                    sx={{
                        alignItems:"center"
                    }}
                >
                    <CustomButton
                        text="Anterior"
                        fullWidth={false}
                        disabled={page === 1}
                        onClick={() => {
                            currentPage.set(page - 1);
                        }}
                        sx={{
                            width: 60,
                            height: 23,
                            fontSize: "9px"
                        }}
                    >
                    </CustomButton>

                    <Typography
                        sx={{
                            display:"flex",
                            alignItems:"center",
                            fontWeight:"bold",
                            fontSize:"13px"
                        }}
                    >
                        {page}
                    </Typography>

                    <CustomButton
                        text="Próxima"
                        fullWidth={false}
                        disabled={page >= totalPages}
                        onClick={() => {
                            currentPage.set(page + 1)
                        }}
                        sx={{
                            width: 60,
                            height: 23,
                            fontSize: "9px"
                        }}
                    >
                    </CustomButton>
                </Stack>
            </Box>

            <Box
                sx={{
                        display: "flex",
                        justifyContent:"center",
                        mt: 4
                    }}
            >
                <CustomButton
                    text="Criar tarefa"
                    onClick={() => navigate("/tasks/new")}
                    fullWidth={false}
                    sx={{
                        width: {
                            xs: "100%", 
                            sm: 250 
                        },
                        height: 50
                    }}
                />
            </Box>

        </Box>
    );
};
export default TasksPage;