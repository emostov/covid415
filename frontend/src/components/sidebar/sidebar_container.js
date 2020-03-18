import { connect } from 'react-redux';
import SideBar from './sidebar';
import { updateTask } from '../../actions/task_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

const mSTP = state => ({

});

const mDTP = dispatch => ({
    updateTask: () => dispatch(updateTask()),
    openModal: (modal, taskId) => dispatch(openModal(modal, taskId)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(SideBar)