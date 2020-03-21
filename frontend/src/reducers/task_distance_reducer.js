import { RECEIVE_TASK_DISTANCE_INFO } from '../actions/task_distance_actions';

const taskDistanceInfo = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_TASK_DISTANCE_INFO:
            nextState.data = action.data
            return nextState
        default: 
            return state;
    }
};

export default taskDistanceInfo;