import { RECEIVE_TASK_DISTANCE_INFO } from '../actions/task_distance_actions';

// const taskDistanceInfo = (state = { distances: [] }, action) => {
const taskDistanceInfo = (state = {}, action) => {
    Object.freeze(state)
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_TASK_DISTANCE_INFO:
            nextState[action.data.distance] = action.data
            return nextState
        default: 
            return state;
    }
};

export default taskDistanceInfo;