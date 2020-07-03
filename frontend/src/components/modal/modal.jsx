import { connect } from 'react-redux';
import React from 'react';

import { closeModal } from '../../actions/modal_actions';
import TaskUpdateContainer from '../tasks/task_update_container';
import TaskFormContainer from '../tasks/task_form_container';
import TaskTakeConfirmation from '../tasks/task_take_confirmation';
import TaskDetailsContainer from '../tasks/task_details_container';
import CompleteTakeConfirmation from '../tasks/task_complete_confirmation';
import WelcomeModalContainer from './welcome_modal_container';
import InstructionModal from './instruction_modal';
import InstructionModal2 from './instruction_modal2';
import '../../styles/modal.scss';

const Modal = (props) => {
    const { modal, closeModal } = props;

    if (!modal) {
        return null;
    }

    let component;
    let childClass;

    switch (modal.modal) {
        case 'taskform':
            component = <TaskFormContainer />;
            childClass = 'modal-child-taskform';
            break;
        case 'status':
            component = <TaskUpdateContainer taskId={modal.taskId} />;
            childClass = 'modal-child-status';
            break;
        case 'details':
            component = <TaskDetailsContainer taskId={modal.taskId} />;
            childClass = 'modal-child-status';
            break;
        case 'takeTaskConfirmed':
            component = <TaskTakeConfirmation />;
            childClass = 'modal-child-taketask';
            break;
        case 'completeTaskConfirmed':
            component = <CompleteTakeConfirmation />;
            childClass = 'modal-child-taketask';
            break;
        case 'welcome':
            component = <WelcomeModalContainer />;
            childClass = 'modal-child-welcome';
            break;
        case 'instruction':
            component = <InstructionModal />;
            childClass = 'modal-child-welcome';
            break;
        case 'instruction2':
            component = <InstructionModal2 />;
            childClass = 'modal-child-welcome';
            break;
        default:
            return null;
    }

    return (
        <div className="modal-background" onClick={closeModal}>
            <div className={childClass} onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const msp = (state) => {
    return {
        modal: state.ui.modal,
        taskId: state.ui.taskId
    };
};

const mdtp = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(
    msp,
    mdtp
)(Modal);