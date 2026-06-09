import { Meteor } from "meteor/meteor";

Meteor.publish("usersData", function () {
    if (!this.userId) {
        return this.ready(); 
    }

    return Meteor.users.find(
        { _id: this.userId }, 
        {
            fields: {
                "profile.name": 1, 
                "profile.birthDate": 1,
                "profile.genero": 1,
                "profile.empresa": 1,
                "profile.photo": 1,
                emails: 1, 
                "createdAt": 1,
            },
        }
    );
});

Meteor.publish("tasksUsers", function () {
    if (!this.userId) {
        return this.ready(); 
    }

    return Meteor.users.find(
        {},
        {
            fields: {
                "profile.name": 1,
            },
        }
    );
});