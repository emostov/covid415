import { RECEIVE_TASK_DISTANCE_INFO } from '../actions/task_distance_actions';

const taskDistanceInfo = (state = { distances: [] }, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    debugger
    switch (action.type) {
        case RECEIVE_TASK_DISTANCE_INFO:
            nextState.distances.push(action.data)
            return nextState
        default: 
            return state;
    }
};

export default taskDistanceInfo;