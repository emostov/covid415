import { connect } from 'react-redux';
import SideBar from './sidebar';
import { updateTask } from '../../actions/task_action';

const mSTP = state => ({

});

const mDTP = dispatch => ({
    updateTask: () => dispatch(updateTask())
});

export default connect(mSTP, mDTP)(SideBar)