import { RECEIVE_NEW_TASK, RECEIVE_TASK_ERRORS } from '../actions/task_actions';

const TaskErrorsReducer = (state=[], action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_NEW_TASK:
            return [];
        case RECEIVE_TASK_ERRORS:
            return action.errors
        default:
            return state
    }
};

export default TaskErrorsReducer;