import { connect } from 'react-redux';
import TaskUpdate from './task_update';
import { updateTask } from '../../actions/task_actions';
import { closeModal } from '../../actions/modal_actions';

const mSTP = state => {
    let taskId = state.ui.modal.taskId;
    return {
        task: Object.values(state.tasks).filter(task => task._id === taskId)[0]
    }
};

const mDTP = dispatch => ({
    updateTask: task => dispatch(updateTask(task)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(TaskUpdate);