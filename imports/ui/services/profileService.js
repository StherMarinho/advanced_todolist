import { Meteor } from "meteor/meteor";

export function updateProfile(profileData, callback) {
    Meteor.call(
        "users.updateProfile",
        profileData,
        callback
    );
}

export function updateEmail(email, callback) {
    Meteor.call(
        "users.updateEmail",
        { email },
        callback
    );
}