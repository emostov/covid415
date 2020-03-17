import * as APIUtil from '../util/task_api_util'

export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_NEW_TASK = 'RECEIVE_NEW_TASK';

export const receiveTasks = tasks => {
    return {
        type: RECEIVE_TASKS,
        tasks
    }
};

export const receiveNewTask = task => {
    return {
        type: RECEIVE_NEW_TASK,
        task
    }
};

export const fetchTasks = () => dispatch => {
    debugger
    return APIUtil.getTasks()
        .then(tasks => dispatch(receiveTasks(tasks)))
        .catch(err => console.log(err))
};

export const createNewTask = data => dispatch => {
    return APIUtil.createTask(data)
        .then(task => dispatch(receiveNewTask(task)))
        .catch(err => console.log(err))
};