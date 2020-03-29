import { connect } from 'react-redux';
import React from 'react';

import { closeModal } from '../../actions/modal_actions';
import TaskUpdateContainer from '../tasks/task_update_container';
import TaskFormContainer from '../tasks/task_form_container';
import TaskTakeConfirmation from '../tasks/task_take_confirmation';
import TaskDetailsContainer from '../tasks/task_details_container';
import CompleteTakeConfirmation from '../tasks/task_complete_confirmation';
import WelcomeModalContainer from './welcome_modal_container';
import '../../styles/modal.scss';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.closeModal();
    }

    render() {
        const { modal, closeModal } = this.props;

        if(!modal) {
            return null;
        }

        let component;
        let childClass;

        switch (modal.modal) {
            case 'taskform':
                component = <TaskFormContainer />;
                childClass = "modal-child-taskform"
                break;
            case 'status':
                component = <TaskUpdateContainer taskId={modal.taskId}/>;
                childClass = "modal-child-status"
                break;
            case 'details':
                component = <TaskDetailsContainer taskId={modal.taskId}/>;
                childClass = "modal-child-status"
                break;
            case 'takeTaskConfirmed':
                component = <TaskTakeConfirmation />;
                childClass = "modal-child-taketask"
                break;
            case 'completeTaskConfirmed':
                component = <CompleteTakeConfirmation />;
                childClass = "modal-child-taketask"
                break;
            case 'welcome':
                component = <WelcomeModalContainer />;
                childClass = "modal-child-welcome"
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