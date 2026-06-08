import { Meteor } from "meteor/meteor";

export function insertTask(taskData, callback) {
    Meteor.call(
        "tasks.insert",
        taskData,
        callback
    );
}

export function updateTask(taskData, callback) {
    Meteor.call("tasks.update", taskData, callback);
}

export function removeTask(taskId, callback) {
    Meteor.call(
        "tasks.remove",
        { 
            _taskId: taskId 
        },
        callback
    );
}

export function changeTaskStatus(taskId, status, callback) {
    Meteor.call(
        "tasks.changeStatus",
        {
            _taskId: taskId,
            status
        },
        callback
    );
}