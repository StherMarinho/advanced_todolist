//função: criar a coleção do Mongo 
import { Mongo } from 'meteor/mongo'; 

export const TasksCollection = new Mongo.Collection('tasks');