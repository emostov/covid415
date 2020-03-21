import { RECEIVE_TASKS, RECEIVE_NEW_TASK } from '../actions/task_actions';

// const pullApartDBTask = (oldTask, newTask) => {
//     const mergedTask = {...oldTask, ...newTask}
//     const {
//         volunteer,
//         status,
//         requester, 
//         deliveryLatLong,
//         deliveryInstructions,
//         deliveryAddress,
//         deliveryNeighboorhood,
//     } = task
// }

const convertToTasksObj = (tasks) => {
    const newTasks = {};
    tasks.forEach((t) => {
        newTasks[t._id] = t;
    })

    return newTasks;
}

const TasksReducer = (state = {}, action) => {
    Object.freeze(state)
    let nextState = Object.assign({}, state)
    // const nextState = state.slice()
    switch (action.type) {
        case RECEIVE_TASKS:
            // nextState = action.tasks.data
            nextState = convertToTasksObj(action.tasks.data)
            return nextState
        case RECEIVE_NEW_TASK:
            // debugger
            if (nextState[action.task._id] !== undefined) {
                // call function that replaces updated fields
                // debugger
                const updated = {
                    ...nextState[action.task._id],
                    ...action.task
                }
                
                console.log('reducer update', updated);
                nextState[action.task.id] = updated
            } else {
                // debugger
                nextState[action.task._id] = action.task.data
            }
            return nextState
        default:
            return state
    }
}

export default TasksReducer