//configs de registro e login, regras de segurança para atualização de usuário e negação de criação de conta por parte do cliente.
import { Accounts } from "meteor/accounts-base";

Accounts.config({
    forbidClientAccountCreation: false, //permite que os usuários se registrem por conta própria.
});

Meteor.users.deny({
    update() {
        return true; //impede que os usuários atualizem seus próprios documentos de usuário, reforçando a segurança.
    },
});