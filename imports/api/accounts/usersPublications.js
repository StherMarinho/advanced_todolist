//função: publicar dados seguros do usuário, como nome, email, para o cliente.
import { Meteor } from "meteor/meteor";

Meteor.publish("usersData", function () {
    if (!this.userId) {
        return this.ready(); // Se o usuário não estiver autenticado, a publicação é finalizada imediatamente.
    }

    return Meteor.users.find(
        { _id: this.userId }, // Filtra para retornar apenas os dados do usuário autenticado.
        {
            fields: {
                "profile.name": 1, // Publica o campo de nome do perfil do usuário.
                "emails": 1, // Publica o campo de emails do usuário.
                "createdAt": 1, // Publica a data de criação do usuário.
                "tasksStats": 1, // Publica as estatísticas de tarefas do usuário.
            },
        }
    );
});

Meteor.publish("tasksUsers", function () {
    if (!this.userId) {
        return this.ready(); // Se o usuário não estiver autenticado, a publicação é finalizada imediatamente.
    }

    return Meteor.users.find(
        {},
        {
            fields: {
                "profile.name": 1, // Publica o campo de nome do perfil de todos os usuários.
            },
        }
    );
});