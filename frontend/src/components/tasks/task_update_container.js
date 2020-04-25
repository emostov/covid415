import { connect } from 'react-redux';
import TaskUpdate from './task_update';
import { fetchTasks, updateTask } from '../../actions/task_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

const mSTP = state => {
    let taskId = state.ui.modal.taskId;
    return {
        task: Object.values(state.tasks).filter(task => task._id === taskId)[0],
        currentUser: state.session.user
    }
};

const mDTP = dispatch => ({
    fetchTasks: () => dispatch(fetchTasks()),
    updateTask: task => dispatch(updateTask(task)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(TaskUpdate);