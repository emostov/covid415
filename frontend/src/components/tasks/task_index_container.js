import { connect } from 'react-redux'
import TaskIndex from './task_index';
import { fetchTasks } from '../../actions/task_action'

const mSTP = state => {
    return {
        tasks: Object.values(state.tasks)
    }
}

const mDTP = dispatch => {
    return {
        fetchTasks: () => dispatch(fetchTasks())
    }
};

export default connect(mSTP, mDTP)(TaskIndex);