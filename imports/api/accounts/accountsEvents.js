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
    user.createdAt = new Date(); 

    if (options.profile) {
        user.profile = options.profile; 
    }   

    return user;
});