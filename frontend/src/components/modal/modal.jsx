import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import React from 'react';
import TaskUpdateContainer from '../tasks/task_update_container';
import TaskFormContainer from '../tasks/task_form_container';
import TaskTakeConfirmation from '../tasks/task_take_confirmation';
import '../../styles/modal.scss';

const Modal = ({modal, closeModal}) => {
    if(!modal) {
        return null
    }

    let component;
    let childClass;

    switch (modal.modal) {
        case 'status':
            component = <TaskUpdateContainer taskId={modal.taskId}/>;
            childClass = "modal-child-status"
            break;
        case 'takeTaskConfirmed':
            component = <TaskTakeConfirmation />;
            childClass = "modal-child-taketask"
            break;
        case 'taskform':
            component = <TaskFormContainer />;
            childClass = "modal-child-taskform"
            break;
        default: 
            return null;
    }
    
    
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className={childClass} onClick={e => e.stopPropagation()}>
               { component }
            </div>
        </div>
    )
}

const msp = (state) => {
    return {
        modal: state.ui.modal,
        taskId: state.ui.taskId
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