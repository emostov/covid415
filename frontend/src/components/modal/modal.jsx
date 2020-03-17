import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import React from 'react';
import TaskUpdateContainer from '../tasks/task_update_container';
import '../../styles/modal.scss';

const Modal = ({modal, closeModal}) => {
    if(!modal) {
        return null
    }

    let component;
    console.log("the starfish has drowned")
    switch (modal) {
        case 'status':
            component = <TaskUpdateContainer />;
            break;
        default: 
            return null;
    }

    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
               { component }
            </div>
        </div>
    )
}

const msp = (state) => {
    return {
        modal: state.ui.modal
    }
}

const mdtp = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(
    msp,
    mdtp
)(Modal);