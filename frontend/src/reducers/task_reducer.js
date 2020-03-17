import { RECEIVE_TASKS, RECEIVE_NEW_TASK } from '../actions/task_actions';

const TasksReducer = (state = {}, action) => {
    Object.freeze(state)
    let nextState = Object.assign({}, state)

    switch (action.type) {
        case RECEIVE_TASKS:
            nextState = action.tasks.data
            return nextState
        case RECEIVE_NEW_TASK:
            nextState[action.task.id] = action.task
            return nextState
        default:
            return state
    }
}

export default TasksReducer