import {List} from "@mui/material";
import TaskItem from "../TaskItem/index";

const TaskList = ({ tasks, usersMap }) => {
    return (
        <List>
            {
                tasks.map((task) => (
                    <TaskItem 
                        key={task._id} 
                        task={task}
                        user={usersMap[task.userId]}
                    />
                ))
            }
        </List>
    );
};

export default TaskList;