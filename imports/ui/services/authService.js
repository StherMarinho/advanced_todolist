import { Accounts } from "meteor/accounts-base";

export function changePassword( currentPassword, newPassword,callback ) {
    Accounts.changePassword(
        currentPassword,
        newPassword,
        callback
    );
}