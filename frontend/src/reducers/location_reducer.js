import { RECEIVE_CURRENT_LOCATION} from '../actions/location_actions';

const locationReducer = (state = [37.7364777, -122.4671154], action) => {
    
    switch(action.type) {
        case RECEIVE_CURRENT_LOCATION:
            return action.data
        default:
            return state
    }
}

export default locationReducer;
