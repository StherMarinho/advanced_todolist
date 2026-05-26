//receber tarefas e renderizar gerando varios TaskItem (só percorre array e monta TaskItem para cada tarefa)
import {List} from "@mui/material";
import TaskItem from "../TaskItem/index";

const TaskList = ({ tasks }) => {
    return (
        <List>
            {
                tasks.map((task) => (
                    <TaskItem key={task._id} task={task} />
                ))
            }
        </List>
    );
};

export default TaskList;