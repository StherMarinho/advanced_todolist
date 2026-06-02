//Responsabilidade: lista de tarefas, remover tarefas, atualizar tarefas, filtros; pesquisa; paginação.
import { Box, Typography, Checkbox, FormControlLabel, Stack } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

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

    const subscription = useTracker(() => {
    return Meteor.subscribe("tasks", showCompleted, searchText, page);
}, [showCompleted, searchText, page]);

useTracker(() => {
    Meteor.subscribe("tasksUsers");
});

const isLoading = !subscription.ready();

    const tasks = useTracker(() => {
        return TasksCollection.find({}, {
            sort: { createdAt: -1 }
        }).fetch();
    }, [showCompleted, searchText, page]);

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
                <TaskList tasks={tasks} />
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
                        disabled={tasks.length < 4}
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