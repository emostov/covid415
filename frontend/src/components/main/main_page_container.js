import { connect } from 'react-redux';

import MainPage from './main_page.jsx';
import { fetchTasks } from '../../actions/task_actions';
import { getUserLocation } from '../../actions/location_actions'
import { openModal } from '../../actions/modal_actions';

const mSTP = (state, ownProps) => {
    return {
        tasks: Object.values(state.tasks),
        history: ownProps.history,
        loggedIn: state.session.isAuthenticated
    }
};

const mDTP = dispatch => {
    return {
        fetchTasks: () => dispatch(fetchTasks()),
        getUserLocation: () => dispatch(getUserLocation()),
        openModal: modal => dispatch(openModal(modal))
    }
};

export default connect(mSTP, mDTP)(MainPage);