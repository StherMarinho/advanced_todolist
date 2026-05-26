//uma tarefa, renderiza: nome, usuário, botoes
import { ListItem, ListItemText, IconButton, Paper, ListItemIcon } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Assignment from "@mui/icons-material/Assignment";

import { useNavigate } from "react-router-dom";

import { Meteor } from "meteor/meteor";

const TaskItem = ({ task }) => {
    const navigate = useNavigate();
    const isOwner = task.userId === Meteor.userId();

    function handleDelete() {
        Meteor.call("tasks.remove", { _taskId: task._id });
    }
    return (
        <Paper sx={{ mb: 2 }}>
            <ListItem
                secondaryAction={
                isOwner && (
                <>
                    <IconButton 
                        onClick={() => navigate(`/tasks/${task._id}`)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton 
                        onClick={handleDelete}
                    >
                        <Delete />
                    </IconButton>
                </>
                )
                }
            >
                <ListItemIcon>
                    <Assignment />
                </ListItemIcon>

                <ListItemText 
                    primary={task.name} 
                    secondary={task.createdBy}
                />
            </ListItem>
        </Paper>
    );
};

export default TaskItem;
