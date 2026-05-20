import React, {useState} from "react";

export const TaskForm = () => {
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!text){// Handle form submission logic here
            return;
        }
        await Meteor.callAsync("tasks.insert", { //adicionando uma tarefa à taskscoleção chamando o Meteor.callAsync()método. O primeiro argumento é o nome do método que queremos chamar e o segundo argumento é o texto da tarefa.
            text: text.trim(),
            createdAt: new Date(),
        });
        setText("");
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Type to add new tasks" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
            />
            <button type="submit">Add Task</button>
        </form>
    );
};