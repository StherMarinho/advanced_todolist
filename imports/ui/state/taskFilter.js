import { ReactiveVar } from "meteor/reactive-var";

export const showCompletedTasks = new ReactiveVar(false);
export const searchTasksText = new ReactiveVar("");
export const currentPage = new ReactiveVar(1);