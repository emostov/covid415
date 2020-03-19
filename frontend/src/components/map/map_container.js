import { connect } from 'react-redux';

import Map from './map';
import { fetchTasks } from '../../actions/task_actions';
import { receiveActiveTaskId } from '../../actions/active_task_actions';

const selectCurrentUserTask = (current) => {

};

const mSTP = state => {
  let currentUserId;
  if (state.session.user) {
    currentUserId = state.session.user.id
  } else {
    currentUserId = undefined
  }
  
  return ({
    tasks: Object.values(state.tasks),
    activeTask: state.ui.activeTask,
    currentUserId: state.session.user.id
  })
};

const mDTP = (dispatch, getState) => {
  return ({
    fetchTasks: () => dispatch(fetchTasks()),
    receiveActiveTaskId: (taskId) => dispatch(receiveActiveTaskId(taskId)),
    
  })
};

export default connect(mSTP, mDTP)(Map);