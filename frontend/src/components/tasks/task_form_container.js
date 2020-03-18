import { connect } from 'react-redux';
import TaskForm from './task_form';

const mSTP = state => ({
    task: {
        type: ''
    }
});

const mDTP = dispatch => ({

});

export default connect(mSTP, mDTP)(TaskForm);