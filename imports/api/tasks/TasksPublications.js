//responsabilidade: controlar quais dados o front pode receber
import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './TasksCollection';

Meteor.publish("tasks", function() { //porque mudar de () => para function()? Porque precisamos acessar o this.userId dentro da função de publicação, e isso só é possível com uma função tradicional, não com uma arrow function.
    const userId = this.userId;
    if (!userId) {
        return this.ready(); //o que é "this.ready()"? Ele é usado para indicar que a publicação está pronta e não há mais dados a serem enviados para o cliente. Isso é útil quando você tem uma condição que impede a publicação de dados, como no caso de um usuário não autenticado. Ao chamar this.ready(), você informa ao cliente que a publicação terminou e que ele pode parar de esperar por dados.
    }
    return TasksCollection.find({ userId }); //retorna apenas as tarefas que pertencem ao usuário atualmente autenticado, garantindo que cada usuário só veja suas próprias tarefas.
});