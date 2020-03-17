import { connect } from 'react-redux';
import MainPage from './main_page.jsx';
import { fetchTasks } from '../../actions/task_action'

const mSTP = state => {
    return {
        tasks: Object.values(state.tasks)
    }
};

const mDTP = dispatch => {
    return {
        fetchTasks: () => dispatch(fetchTasks())
    }
};

export default connect(mSTP, mDTP)(MainPage);