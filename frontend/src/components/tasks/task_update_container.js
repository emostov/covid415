import { connect } from 'react-redux';
import TaskUpdate from './task_update';
import { updateTask } from '../../actions/task_actions';

const mSTP = state => ({

});

const mDTP = dispatch => ({
    updateTask: () => dispatch(updateTask())
});

export default connect(mSTP, mDTP)(TaskUpdate);