import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import "../imports/api/tasks/TasksPublications";
import "../imports/api/tasks/TasksMethods";

import "../imports/api/accounts/accountsConfig";
import "../imports/api/accounts/accountsEvents";
import "../imports/api/accounts/usersPublications";
import "../imports/api/accounts/usersMethods";
import { Counts } from "meteor/tmeasday:publish-counts";
import { TasksCollection } from "../imports/api/tasks/TasksCollection";