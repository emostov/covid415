import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import React from 'react';
import TaskUpdateContainer from '../tasks/task_update_container';
import TaskFormContainer from '../tasks/task_form_container';
import '../../styles/modal.scss';

class Modal extends React.Component {
    constructor(props) {
        super(props)

        this.close = this.close.bind(this)
    }

    close() {
        this.props.closeModal()
    }

    render() {
        const { modal, closeModal } = this.props
        if (!modal) {
            return null
        }

        let component;

        switch (modal.modal) {
            case 'status':
                component = <TaskUpdateContainer taskId={modal.taskId} />;
                break;
            case 'taskform':
                component = <TaskFormContainer />;
                break;
            default:
                return null;
        }


        return (
            <div className="modal-background" onClick={() => this.close()}>
                <div className={modal.modal === 'status' ? "modal-child-status" : 'modal-child-taskform'} onClick={e => e.stopPropagation()}>
                    {component}
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