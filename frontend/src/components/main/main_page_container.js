import { connect } from 'react-redux';

import MainPage from './main_page.jsx';
import { fetchTasks } from '../../actions/task_actions';

const mSTP = (state, ownProps) => {
    return {
        tasks: Object.values(state.tasks),
        history: ownProps.history
    }
};

const mDTP = dispatch => {
    return {
        fetchTasks: () => dispatch(fetchTasks())
    }
};

export default connect(mSTP, mDTP)(MainPage);