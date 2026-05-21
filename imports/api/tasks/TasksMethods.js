//responsabilidade: CRUD das tarefas.
import {Meteor} from 'meteor/meteor';
import { TasksCollection } from './TasksCollection';
import { use } from 'react';

Meteor.methods({ //Os métodos são essencialmente chamadas RPC ao servidor que permitem realizar operações no lado do servidor de forma segura
    "tasks.insert"(doc) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        return TasksCollection.insertAsync({
            ...doc, //porque usar "...doc"? O operador de espalhamento (...) é usado para criar um novo objeto que contém todas as propriedades do objeto doc. Isso é útil para garantir que estamos criando um novo documento com os dados fornecidos, em vez de modificar o objeto original. Além disso, ao usar ...doc, podemos adicionar outras propriedades ao objeto resultante, como userId e createdAt, sem afetar o objeto doc original.
            userId: this.userId,
            createdAt: new Date(),
        });
    },
    "tasks.toggleChecked"({ _id, isChecked }) {
        return TasksCollection.updateAsync(_id, {
            $set: {isChecked: !isChecked},
        });
    },
    "tasks.delete"({ _id }) { //função para excluir a tarefa e fornecer essa função na propriedade de retorno de chamada (callback) do Taskcomponente.
        return TasksCollection.removeAsync(_id);
    }
});