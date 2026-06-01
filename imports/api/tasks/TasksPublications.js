//responsabilidade: controlar quais dados o front pode receber
import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './TasksCollection';

Meteor.publish("tasks", function(showCompletedTasks, searchText, page) { //porque mudar de () => para function()? Porque precisamos acessar o this.userId dentro da função de publicação, e isso só é possível com uma função tradicional, não com uma arrow function.
    const userId = this.userId;

    if (!userId) {
        return this.ready(); //o que é "this.ready()"? Ele é usado para indicar que a publicação está pronta e não há mais dados a serem enviados para o cliente. Isso é útil quando você tem uma condição que impede a publicação de dados, como no caso de um usuário não autenticado. Ao chamar this.ready(), você informa ao cliente que a publicação terminou e que ele pode parar de esperar por dados.
    }

    const statusFilter = showCompletedTasks ? {} : {
        status:{
            $in: ["Cadastrada", "Em Andamento"]
        }
    };

    const nameTaskFilter = searchText ? {
        name: {
            $regex: searchText,
            $options: "i" //ignora maiúsculas e minúsculas
        }
    } : {};

    const limit = 4;

    const skip = (page - 1) * limit;

    return TasksCollection.find({
        $and:[ 
            {
                $or: [ //$or é um operador lógico do MongoDB que permite combinar várias condições. Ele retorna os documentos que satisfazem pelo menos uma das condições especificadas. No contexto,o $or é usadopara garantir que o usuário veja tanto as tarefas públicas quanto as suas próprias tarefas privadas.
                    { isPrivate: false },
                    //{isPrivate: { $exists: false } }, //caso a tarefa não tenha o campo isPrivate, ela será considerada pública e estará disponível para todos os usuários.
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
    ); //retorna apenas as tarefas que pertencem ao usuário atualmente autenticado, garantindo que cada usuário só veja suas próprias tarefas.
});