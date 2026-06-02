//função: validar o email do usuário e adicionar a data de criação do usuário no momento do cadastro, além de preservar o perfil do usuário, se fornecido.
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

Accounts.validateNewUser((user) => {
    const email = user?.emails?.[0]?.address;

    if (!email) {
        throw new Meteor.Error("Email obrigatório.");
    }

    if (!email.includes("@")) {
        throw new Meteor.Error("Email inválido.");
    }

    return true;
});

Accounts.onCreateUser((options, user) => {
    user.createdAt = new Date(); // Adiciona a data de criação do usuário

    /*user.tasksStats = { // serve para adicionar um “estado inicial”
        total: 0,
        completed: 0,
    };*/

    if (options.profile) {
        user.profile = options.profile; // Preserva o perfil do usuário, se fornecido
    }   

    return user;
});