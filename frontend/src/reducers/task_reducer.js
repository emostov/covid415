import { RECEIVE_TASKS, RECEIVE_TASK } from '../actions/task_action';

// Each case needs some review on how we want to structure our state in 
// our reducer

/**
 * {
 * objectID: {field1, filed1},
 * objectID2: {field1: val, filed1}
 * }
 * 
 * - 1 task
 * {...nextState, [action.tastk.id]: action.task}
 * 
 * - multiple tasks
 * - step 1 format tasks
 * 
 * 
 * step 2 merge formatted tasks
 * {...nextState, }
 */

const assignTasks = object => {
    const formattedTasks = {};
    const keys = Object.keys(object);

    keys.forEach(id => {
        formattedTasks[id] = object[id]
    });

    return formattedTasks;
}


const TasksReducer = (state = {}, action) => {
    Object.freeze(state)
    let nextState = Object.assign({}, state)

    switch (action.type) {
        case RECEIVE_TASKS:
            nextState = action.tasks.data
            return nextState
        case RECEIVE_TASK:
            nextState[action.task.id] = action.task
            return nextState
        default:
            return state
    }
}

export default TasksReducer