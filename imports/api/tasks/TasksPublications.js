//responsabilidade: controlar quais dados o front pode receber; buscar os dados
import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './TasksCollection';
import { TASKS_STATUS } from '../../constants/tasksStatus';

Meteor.publish("tasks", function(showCompletedTasks, searchText, page) { //porque mudar de () => para function()? Porque precisamos acessar o this.userId dentro da função de publicação, e isso só é possível com uma função tradicional, não com uma arrow function.
    const userId = this.userId;

    if (!userId) {
        return this.ready(); //"this.ready()": é usado para indicar que a publicação está pronta e não há mais dados a serem enviados para o cliente. Isso é útil quando você tem uma condição que impede a publicação de dados, como no caso de um usuário não autenticado. Ao chamar this.ready(), você informa ao cliente que a publicação terminou e que ele pode parar de esperar por dados.
    }

    const statusFilter = showCompletedTasks ? {} : {
        status:{
            $in: [TASKS_STATUS.CREATED, TASKS_STATUS.IN_PROGRESS] // "$in" é um operador de query que verifica se o valor de um campo corresponde a qualquer valor dentro de uma lista ou array especificada
        }
    };

    const nameTaskFilter = searchText ? {
        name: {
            $regex: searchText,
            $options: "i" //ignora maiúsculas e minúsculas
        }
    } : {};

    const limit = 4;
    const safePage = page && page > 0 ? page : 1;
    const skip = (safePage - 1) * limit;

    return TasksCollection.find({
        $and:[  //$and, precisa satisfazer todas condições ("and")
            {
                $or: [ //$or é um operador lógico do MongoDB que permite combinar várias condições. Ele retorna os documentos que satisfazem pelo menos uma das condições especificadas. No contexto,o $or é usado para garantir que o usuário veja tanto as tarefas públicas quanto as suas próprias tarefas privadas.
                    { isPrivate: false },
                    { userId: userId }
                ]
            },
            statusFilter,
            nameTaskFilter
        ]
    },
    {
        sort: {
            createdAt: -1
        },
        skip: skip,
        limit: limit
    }
    ); 
});
Meteor.publish("taskById", function (taskId) {
    const userId = this.userId;

    if (!userId) return this.ready();

    return TasksCollection.find({
        _id: taskId,
        $or: [
            { isPrivate: false },
            { userId }
        ]
    });
});
Meteor.publish("dashboardTasks", function (dashboardFilter) {
    const userId = this.userId;

    if (!userId) {
        return this.ready();
    }

    let visibilityFilter = {};

    if (dashboardFilter === "private") {
        visibilityFilter = {
            userId 
        };
    }

    if (dashboardFilter === "public") {
        visibilityFilter = { 
            isPrivate: false 
        };
    }

    if (dashboardFilter === "all") {
        visibilityFilter = {
            $or: [
                { 
                    isPrivate: false 
                },
                { 
                    userId 
                }
            ]
        };
    }

    return TasksCollection.find(visibilityFilter);      
});