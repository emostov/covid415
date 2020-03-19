import { connect } from 'react-redux';
import { fetchTasks, createNewTask } from '../../actions/task_actions';
import { closeModal } from '../../actions/modal_actions';
import TaskForm from './task_form';

const mSTP = (state, ownProps) => {
    return{
    task: {
        type: '',
        details: '',
        requester: state.session.user.id,
        deliveryAddress: '',
        deliveryInstructions: ''
    },
    history: ownProps.history,
    errors: state.errors.task
}};

const mDTP = dispatch => ({
    fetchTasks: () => dispatch(fetchTasks()),
    createNewTask: task => dispatch(createNewTask(task)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(TaskForm);