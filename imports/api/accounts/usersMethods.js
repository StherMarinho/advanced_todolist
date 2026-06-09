import { Meteor } from "meteor/meteor";

Meteor.methods({

    async "users.updateProfile"({ name, birthDate, genero, empresa, photo }) {

        if (!this.userId) {
            throw new Meteor.Error(
                "NOT_AUTHORIZED",
                "Não autorizado."
            );
        }

        await Meteor.users.updateAsync(
            { _id: this.userId },
            {
                $set: {
                    "profile.name": name,
                    "profile.birthDate": birthDate,
                    "profile.genero": genero,
                    "profile.empresa": empresa,
                    "profile.photo": photo
                }
            }
        );

        return true;
    },

    async "users.updateEmail"({ email }) {
        if (!this.userId) {
            throw new Meteor.Error(
                "NOT_AUTHORIZED",
                "Não autorizado."
            );
        }

        const novoEmail = email.trim().toLowerCase();

        const existeUser = await Meteor.users.findOneAsync(
                {
                    "emails.address": novoEmail
                }
            );

        if ( existeUser && existeUser._id !== this.userId ) {
            throw new Meteor.Error(
                "EMAIL_EXISTS",
                "Email já cadastrado."
            );
        }

        const usuarioAtual = await Meteor.users.findOneAsync(this.userId);

        const emailAtual = usuarioAtual?.emails?.[0]?.address;

        if (emailAtual?.toLowerCase() === novoEmail) {
            return true;
        }
        //console.log("Atualizando email de:", emailAtual,"para:", novoEmail);
        await Meteor.users.updateAsync(
            {
                _id: this.userId 
            },
            {
                $set: {
                    "emails.0.address": novoEmail
                }
            }
        );

        return true;
    }

});