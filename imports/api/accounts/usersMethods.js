import { Meteor } from "meteor/meteor";

Meteor.methods({

    async "users.updateProfile"({
        name,
        birthDate,
        genero,
        empresa,
        photo
    }) {

        if (!this.userId) {
            throw new Meteor.Error("Não autorizado.");
        }

        await Meteor.users.updateAsync(
            { _id: this.userId },
            {
                $set: {
                    "profile.name": name,
                    "profile.birthDate": birthDate,
                    "profile.genero": genero,
                    "profile.empresa": empresa,
                    "profile.photo": photo,
                }
            }
        );

        return true;
    }

});