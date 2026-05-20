import { Meteor } from 'meteor/meteor';
import React, {useState, Fragment} from 'react'; //A useStatefunção do React é a melhor maneira de manter o estado deste botão. Ela retorna um array com dois itens, onde o primeiro elemento é o valor do estado e o segundo é uma função setter que define como você irá atualizar o estado. Você pode usar a desestruturação de array para obter esses dois valores de volta e já declarar uma variável para eles.
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { LoginForm } from "./LoginForm";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const logout = () => Meteor.logout();

  const handleToggleChecked = ({ _id, isChecked }) => {
    Meteor.callAsync("tasks.toggleChecked", { _id, isChecked });
  }
  const handleDelete = ({ _id }) => {
    Meteor.callAsync("tasks.delete", { _id });
  }

  const isLoading = useSubscribe("tasks");

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }
    
    return TasksCollection.find(
      hideCompleted ? hideCompletedFilter : {}, 
      {
        sort: { createdAt: -1 },
      }
    ).fetch()
});

  const pendingTasksCount = useTracker(() =>{
    if (!user) {
      return 0;
    }
    TasksCollection.find(hideCompletedFilter).count()
  });

  const pendingTasksTitle = pendingTasksCount ? ` (${pendingTasksCount})` : '';

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div className= "app">
    <header>
      <div className="app-bar">
        <div className="app-header">
            <h1>
              To Do List 📝️
              {pendingTasksTitle}
            </h1>
            <div className="app-header_logout">
              <h2 onClick={logout}>Logout 🚪</h2>
            </div>
        </div>
      </div>
    </header>

      <div className="main">
        {user ? (
          <Fragment> 
            <div className="user">
              {user.username} 
            </div>
            <TaskForm />
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>

            <ul className="tasks">
              {tasks.map(task => (
                <Task 
                  key={task._id} 
                  task={task} 
                  onCheckboxClick={handleToggleChecked} 
                  onDeleteClick={handleDelete} 
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
    </div>
  </div>
  );
}; 