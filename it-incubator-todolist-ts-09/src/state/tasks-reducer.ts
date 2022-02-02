import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type  RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    todolistId: string
    taskID: string
}
export type  AddTaskActionType = {
    type: 'ADD_TASK',
    title: string
    todolistId: string
}
export type  ChangeTaskStatusType = {
    type: 'CHANGE_TASK_STATUS',
    taskId: string
    todolistId: string
    isDone: boolean
}
export type ChangeTaskTitleType = {
    type: 'CHANGE_TASK_TITLE'
    title: string
    todolistId: string
    taskId: string
}


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType
    ;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType  => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId];
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskID)
            return stateCopy
        }
        case 'ADD_TASK': {
            const stateCopy = {...state}
            const task = {id: v1(), title: action.title, isDone: false};
            stateCopy[action.todolistId] = [task, ...stateCopy[action.todolistId]]
            return stateCopy
        }
        case "CHANGE_TASK_STATUS": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            // найдём нужную таску:
            let task = tasks.find(t => t.id === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.isDone = action.isDone;
                // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            }
            return stateCopy
        }
        case "CHANGE_TASK_TITLE": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            // найдём нужную таску:
            let task = tasks.find(t => t.id === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.title = action.title;
                // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
            //throw new Error("I don't understand this type")
    }


}

export const removeTaskAC = (taskID: string, todolistId: string):  RemoveTaskActionType => {
    return { type: 'REMOVE_TASK', todolistId, taskID}
}
export const addTaskAC = (title: string, todolistId: string):  AddTaskActionType => {
    return { type: 'ADD_TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string):  ChangeTaskStatusType => {
    return { type: 'CHANGE_TASK_STATUS', taskId, isDone, todolistId}
}
export const ChangeTaskTitleAC = (taskId: string, title: string, todolistId: string):  ChangeTaskTitleType => {
    return { type: 'CHANGE_TASK_TITLE', taskId, title: title, todolistId}
}
