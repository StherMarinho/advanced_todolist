//responsabilidade: CRUD das tarefas.
import {Meteor} from 'meteor/meteor';
import { TasksCollection } from './TasksCollection';
import { TASKS_STATUS } from '../../constants/tasksStatus';

const validStatus = [
    TASKS_STATUS.CREATED,
    TASKS_STATUS.IN_PROGRESS,
    TASKS_STATUS.COMPLETED
];

Meteor.methods({ //Os métodos são essencialmente chamadas RPC ao servidor que permitem realizar operações no lado do servidor de forma segura
    "tasks.insert": async function({name , description, status, isPrivate}) {
        /*console.log("user:" + Meteor.user());
        console.log("profile:" + Meteor.user()?.profile);
        console.log("name:" + Meteor.user()?.profile?.name);*/
        if (!this.userId) {
            throw new Meteor.Error('Não autorizado.');
        }

        if(!name?.trim()) {
            throw new Meteor.Error('O nome da tarefa é obrigatório.');
        }

        //const user = await Meteor.users.findOneAsync(this.userId);
        //console.log("user encontrado:",user);

        if (status && !validStatus.includes(status)) {
            throw new Meteor.Error("Status inválido.");
        }

        return await TasksCollection.insertAsync({
            name,
            description,    
            status: status || TASKS_STATUS.CREATED,
            isPrivate,
            createdAt: new Date(),
            //createdBy: user?.profile?.name || "Usuário",
            userId: this.userId,
        });
    },
    "tasks.update": async function({ _taskId, name, description, status, isPrivate }) {
        if (!this.userId) {
            throw new Meteor.Error('Não autorizado.');
        }

        if(!name?.trim()) {
            throw new Meteor.Error('O nome da tarefa é obrigatório.');
        }

        if (!validStatus.includes(status)) {
            throw new Meteor.Error("Status inválido.");
        }

        const task = await TasksCollection.findOneAsync(_taskId);

        if (!task) {
        throw new Meteor.Error("Tarefa não encontrada.");
        }

        if(task.userId !== this.userId) {
            throw new Meteor.Error('Não autorizado.');
        
        }

        return await TasksCollection.updateAsync(_taskId, {
            $set: { 
                name, 
                description,
                status,
                isPrivate
            },
        });
    },
    "tasks.remove": async function({ _taskId }) {
        if(!this.userId) {
            throw new Meteor.Error('Não autorizado.');
        }

        const task = await TasksCollection.findOneAsync(_taskId);

        if (!task) {
        throw new Meteor.Error("Tarefa não encontrada.");
        }

        if (task.userId !== this.userId) {
            throw new Meteor.Error("Apenas o criador pode excluir.");
        }

        return await TasksCollection.removeAsync(_taskId);
    },
    "tasks.changeStatus": async function({ _taskId, status }) {
        if (!validStatus.includes(status)) {
            throw new Meteor.Error("Status inválido.");
        }

        const task = await TasksCollection.findOneAsync(_taskId);

        if (!task) {
            throw new Meteor.Error("Tarefa não encontrada.");
        }

        if(task.userId !== this.userId) {
            throw new Meteor.Error('Não autorizado.');
        }

        return await TasksCollection.updateAsync(_taskId, {
            $set: { 
                status 
            },
        });
    },
    "tasks.count": async function(showCompletedTasks, searchText) {
        if (!this.userId) {
            throw new Meteor.Error("Não autorizado.");
        }

        const statusFilter = showCompletedTasks
            ? {}
            : {
                status: {
                    $in: [
                        TASKS_STATUS.CREATED,
                        TASKS_STATUS.IN_PROGRESS
                    ]
                }
            };

        const nameTaskFilter = searchText
            ? {
                name: {
                    $regex: searchText,
                    $options: "i"
                }
            }
            : {};

        const selector = {
            $and: [
                {
                    $or: [
                        { isPrivate: false },
                        { userId: this.userId }
                    ]
                },
                statusFilter,
                nameTaskFilter
            ]
        };

        return await TasksCollection.find(selector).countAsync();
    }
});