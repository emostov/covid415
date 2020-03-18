import { connect } from 'react-redux';
import TaskUpdate from './task_update';
import { updateTask } from '../../actions/task_actions';

const mSTP = (state, ownProps) => ({

});

const mDTP = dispatch => ({
    updateTask: task => dispatch(updateTask(task))
});

export default connect(mSTP, mDTP)(TaskUpdate);