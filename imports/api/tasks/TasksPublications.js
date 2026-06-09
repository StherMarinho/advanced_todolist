import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './TasksCollection';
import { TASKS_STATUS } from '../../constants/tasksStatus';

Meteor.publish("tasks", function(showCompletedTasks, searchText, page) { 
    const userId = this.userId;

    if (!userId) {
        return this.ready(); 
    }

    const statusFilter = showCompletedTasks ? {} : {
        status:{
            $in: [TASKS_STATUS.CREATED, TASKS_STATUS.IN_PROGRESS] 
        }
    };

    const nameTaskFilter = searchText ? {
        name: {
            $regex: searchText,
            $options: "i" 
        }
    } : {};

    const limit = 4;
    const safePage = page && page > 0 ? page : 1;
    const skip = (safePage - 1) * limit;

    return TasksCollection.find({
        $and:[  
            {
                $or: [ 
                    { isPrivate: false },
                    { userId: userId }
                ]
            },
            statusFilter,
            nameTaskFilter
        ]
    },
    {
        sort: {
            createdAt: -1
        },
        skip: skip,
        limit: limit
    }
    ); 
});
Meteor.publish("taskById", function (taskId) {
    const userId = this.userId;

    if (!userId) return this.ready();

    return TasksCollection.find({
        _id: taskId,
        $or: [
            { isPrivate: false },
            { userId }
        ]
    });
});
Meteor.publish("dashboardTasks", function (dashboardFilter) {
    const userId = this.userId;

    if (!userId) {
        return this.ready();
    }

    let visibilityFilter = {};

    if (dashboardFilter === "private") {
        visibilityFilter = {
            userId 
        };
    }

    if (dashboardFilter === "public") {
        visibilityFilter = { 
            isPrivate: false 
        };
    }

    if (dashboardFilter === "all") {
        visibilityFilter = {
            $or: [
                { 
                    isPrivate: false 
                },
                { 
                    userId 
                }
            ]
        };
    }

    return TasksCollection.find(visibilityFilter);      
});