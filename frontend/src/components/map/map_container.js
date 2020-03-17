import { connect } from 'react-redux';
import Map from './map';
import { fetchTasks } from '../../actions/task_actions';

const mSTP = state => {
    return ({
        tasks: Object.values(state.tasks)
    })
};

const mDTP = dispatch => {
    return ({
        fetchTasks: () => dispatch(fetchTasks())
    })
};

export default connect(mSTP, mDTP)(Map);