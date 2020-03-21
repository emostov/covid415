import * as APIUtil from '../util/task_api_util'

export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_NEW_TASK = 'RECEIVE_NEW_TASK';
export const RECEIVE_TASK_ERRORS = 'RECEIVE_TASK_ERRORS';

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

export const receiveErrors = errors => ({
    type: RECEIVE_TASK_ERRORS,
    errors
})

export const fetchTasks = () => dispatch => {
    return APIUtil.getTasks()
        .then(tasks => dispatch(receiveTasks(tasks)))
        .catch(err => console.log(err))
};

export const createNewTask = data => dispatch => {
    return APIUtil.createTask(data)
        .then(task => dispatch(receiveNewTask(task)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
};

export const updateTask = data => dispatch => {
    return APIUtil.updateTask(data)
        .then(task => dispatch(receiveNewTask(task)))
        .catch(err => console.log(err))
}