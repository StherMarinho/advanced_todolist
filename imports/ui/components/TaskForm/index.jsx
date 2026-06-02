//formulário para criar ou editar uma tarefa
import { Box, MenuItem, Checkbox, FormControlLabel, Stack } from "@mui/material";
import { useState } from "react";

import { Meteor } from "meteor/meteor";

import CustomButton from "../CustomButton/index";
import CustomTextField from "../CustomTextField/index";
import { TASKS_STATUS } from "../../../constants/tasksStatus";

const TaskForm = ({ task, onCancel, onSuccess }) => {
    const [name, setName] = useState(task ? task.name : "");
    const [description, setDescription] = useState(task ? task.description : "");
    const [status, setStatus] = useState(task ? task.status : TASKS_STATUS.CREATED);
    const [isPrivate, setIsPrivate] = useState(task ? task.isPrivate : false);

    function handleSubmit(evento) {
        evento.preventDefault();
        console.log({
            name,
            description,
            status,
            isPrivate
        });
        if (task) {
            Meteor.call("tasks.update", { _taskId: task._id, name, description, status, isPrivate },
                () => {
                    onSuccess();
                }
            );
        } else {
            Meteor.call(
                "tasks.insert",
                { name, description, status, isPrivate },
                (error, result) => {
                    if (error) {
                        console.log(error);
                        return;
                    }

                    console.log("Tarefa criada:", result);

                    onSuccess();
                }
            );
        } 
    }

    return (
        <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
                mt: 2,
                backgroundColor: "#f8fafc",

            }}
        >
            <CustomTextField
                label="Nome da Tarefa"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome da tarefa"
            />
            <CustomTextField
                label="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Digite a descrição da tarefa"
            />

            <Box mt={2}>
                <CustomTextField
                    label="Status"
                    select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value={TASKS_STATUS.CREATED}>Cadastrada</MenuItem>
                    <MenuItem value={TASKS_STATUS.IN_PROGRESS}>Em Andamento</MenuItem>
                    <MenuItem value={TASKS_STATUS.COMPLETED}>Concluída</MenuItem>
                </CustomTextField>
            </Box>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                    />
                }
                label="Tarefa Pessoal"
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent:"center"
                }}
            >
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2 }}
                    mt={3}
                    >
                    <CustomButton
                        text="Salvar"
                        type="submit"
                        fullWidth={false}
                        sx={{
                            width: 100,
                            height: 50
                        }}
                    />
                    <CustomButton
                        text="Cancelar"
                        onClick={onCancel}
                        fullWidth={false}
                        sx={{
                            width: 100,
                            height: 50,
                            mt: 2
                        }}
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default TaskForm;