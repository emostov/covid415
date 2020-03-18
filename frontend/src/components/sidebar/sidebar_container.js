import { connect } from 'react-redux';
import SideBar from './sidebar';
import { updateTask } from '../../actions/task_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { receiveActiveTaskId } from '../../actions/active_task_actions';

const mSTP = state => {
    let currentUserId;
    if (state.session.user) {
        currentUserId = state.session.user.id
    } else {
        currentUserId = undefined
    }

    return {
        currentUserId: currentUserId,
        activeTask: state.ui.activeTask
    }
};

const mDTP = dispatch => ({
    updateTask: () => dispatch(updateTask()),
    openModal: (modal, taskId) => dispatch(openModal(modal, taskId)),
    closeModal: () => dispatch(closeModal()),
    receiveActiveTaskId: taskId => dispatch(receiveActiveTaskId(taskId))
});

export default connect(mSTP, mDTP)(SideBar)