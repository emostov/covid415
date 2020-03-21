import { RECEIVE_TASK_DISTANCE_INFO } from '../actions/task_distance_actions';

// const taskDistanceInfo = (state = { distances: [] }, action) => {
const taskDistanceInfo = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_TASK_DISTANCE_INFO:
            state.push(action.data)
            return state
        default: 
            return state;
    }
};

export default taskDistanceInfo;