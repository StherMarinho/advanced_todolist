import { Accounts } from "meteor/accounts-base";

Accounts.config({
    forbidClientAccountCreation: false, 
});

Meteor.users.deny({
    update() {
        return true; 
    },
});