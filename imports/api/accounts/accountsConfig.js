//configs do meteor accounts, validar user,emails, etc.
import { Accounts } from "meteor/accounts-base";

Accounts.config({
    forbidClientAccountCreation: false, //permite que os usuários se registrem por conta própria.
});

Meteor.users.deny({
    update() {
        return true; //impede que os usuários atualizem seus próprios documentos de usuário, reforçando a segurança.
    },
});