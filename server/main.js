import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import "../imports/api/tasks/TasksPublications";
import "../imports/api/tasks/TasksMethods";

import "../imports/api/accounts/accountsConfig";
import "../imports/api/accounts/accountsEvents";
import "../imports/api/accounts/usersPublications";
import "../imports/api/accounts/usersMethods";

import { TasksCollection } from "../imports/api/tasks/TasksCollection";

/*const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(async () => {

    let user = await Accounts.findUserByUsername(SEED_USERNAME);

    if (!user) {

        const userId = await Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
            profile: {
                name: "Meteor User"
            }
        });

        user = await Meteor.users.findOneAsync(userId);
    }

    if ((await TasksCollection.find().countAsync()) === 0) {

        await TasksCollection.insertAsync({
            name: "Primeira tarefa",
            description: "Descrição da primeira tarefa",
            status: "Cadastrada",
            createdAt: new Date(),
            createdBy: "Meteor User",
            userId: user._id,
        });

        await TasksCollection.insertAsync({
            name: "Segunda tarefa",
            description: "Descrição da segunda tarefa",
            status: "Em Andamento",
            createdAt: new Date(),
            createdBy: "Meteor User",
            userId: user._id,
        });

    }

});*/