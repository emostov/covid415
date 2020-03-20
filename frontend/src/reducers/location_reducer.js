import { RECEIVE_CURRENT_LOCATION} from '../actions/location_actions';

const userReducer = (state = [], action) => {
    
    switch(action.type) {
        case RECEIVE_CURRENT_LOCATION:
            return action.data
        default:
            return state
    }
}

export default userReducer;
