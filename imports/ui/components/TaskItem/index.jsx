//uma tarefa:nome, usuário, botoes
import { ListItem, ListItemText, IconButton, Paper, ListItemIcon, Tooltip, Box } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Assignment from "@mui/icons-material/Assignment";

import { useNavigate } from "react-router-dom";
//import { useTracker } from "meteor/react-meteor-data";

import { removeTask } from "../../services/taskService";

import { TASKS_STATUS } from "../../../constants/tasksStatus";

const TaskItem = ({ task, user }) => {
    const navigate = useNavigate();
    const isOwner = task.userId === Meteor.userId();

    /*const user = useTracker(() => 
        Meteor.users.findOne(task.userId)
    );*/

    function handleDelete() {
        const confirm = window.confirm("Tem certeza que deseja excluir esta tarefa?");

        if (!confirm){
            return;
        } 
        
        removeTask(task._id);
    }
    return (
        <Paper sx={{ mb: 2 }}>
            <ListItem
                secondaryAction={
                isOwner && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            sm: "row"
                        }
                    }}
                >
                    <Tooltip title="Editar" placement="top" arrow>
                        <IconButton 
                            onClick={() => navigate(`/tasks/${task._id}`)}
                        >
                            <Edit />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Excluir" placement="top" arrow>
                        <IconButton 
                            onClick={handleDelete}
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Box>
                )
                }
            >
                <ListItemIcon>
                    <Assignment
                        sx={{
                            color:
                                task.status === TASKS_STATUS.COMPLETED
                                    ? "green"
                                    : task.status === TASKS_STATUS.IN_PROGRESS
                                    ? "#fbc02d"
                                    : "#9e9e9e"
                        }}
                    />

                </ListItemIcon>

                <ListItemText 
                    primary={task.name} 
                    secondary={
                        <>
                            Criada por: {user?.profile?.name || "Usuário"}
                            <br />
                            Status: {task.status}
                            <br /> 
                            Tipo: {
                                task.isPrivate 
                                    ? "Privada" 
                                    : "Pública"
                            }
                        </>
                    }
                />
            </ListItem>
        </Paper>
    );
};

export default TaskItem;