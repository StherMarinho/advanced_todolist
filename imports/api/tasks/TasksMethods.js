//responsabilidade: CRUD das tarefas.
import {Meteor} from 'meteor/meteor';
import { TasksCollection } from './TasksCollection';

Meteor.methods({ //Os métodos são essencialmente chamadas RPC ao servidor que permitem realizar operações no lado do servidor de forma segura
    "tasks.insert": async function({name , description, status, isPrivate}) {
        if (!this.userId) {
            throw new Meteor.Error('Não autorizado.');
        }
        return await TasksCollection.insertAsync({
            name,
            description,    
            status: status || "Cadastrada",
            isPrivate,
            createdAt: new Date(),
            createdBy: Meteor.user()?.profile?.name || "Usuário",
            userId: this.userId,
        });
    },
    "tasks.update": async function({ _taskId, name, description, status, isPrivate }) {
        const task = await TasksCollection.findOneAsync(_taskId);
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
        const task = await TasksCollection.findOneAsync(_taskId);
        if(task.userId !== this.userId) {
            throw new Meteor.Error('Não autorizado.');
        }
        return await TasksCollection.updateAsync(_taskId, {
            $set: { 
                status 
            },
        });
    }
});