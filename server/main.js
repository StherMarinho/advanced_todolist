//responsável por inicializar o servidor Meteor, inicializar bd
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "/imports/api/TasksCollection";
import "../imports/api/tasks/TasksPublications";
import "../imports/api/tasks/TasksMethods";
import "../imports/api/accounts/accountsConfig";
import "../imports/api/accounts/accountsHooks";
import "../imports/api/accounts/usersPublications";


const insertTask = (taskText, user) => 
  TasksCollection.insertAsync({ 
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(async() => {
  if(!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD
    });
  }

const user = await Accounts.findUserByUsername(SEED_USERNAME);

if((await TasksCollection.find().countAsync()) === 0) {
  [
      "First Task",
      "Second Task",
      "Third Task", 
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  } //adicionando algumas tarefas a ele, iterando sobre um array de strings e, para cada string, chamando uma função para inserir essa string como um textcampo em nosso taskdocumento.
});
