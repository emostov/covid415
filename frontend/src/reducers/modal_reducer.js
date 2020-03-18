import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

const modalReducer = (state = null, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case OPEN_MODAL:
            newState.modal = action.modal
            newState.task = action.task
            return newState
        case CLOSE_MODAL:
            return null;
        default:
            return state;
    }
};

export default modalReducer;