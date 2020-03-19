import { connect } from 'react-redux';

import Map from './map';
import { fetchTasks } from '../../actions/task_actions';
import { receiveActiveTaskId } from '../../actions/active_task_actions';

const selectCurrentUserTask = (state) => {
  const { id } = state.session.user;
  const { tasks } = state;
  return Object.values(tasks).filter((task) => task.volunteer === id)
};

const mSTP = (state) => {
  let currentUserId, currentUserTasks;
  if (state.session.user) {
    currentUserId = state.session.user.id;
    currentUserTasks = selectCurrentUserTask(state);
  } else {
    currentUserId = undefined;
    currentUserTasks = undefined;
  }

  return ({
    tasks: Object.values(state.tasks),
    activeTask: state.ui.activeTask,
    currentUserId,
    currentUserTasks,

  })
};

const mDTP = (dispatch) => {
  return ({
    fetchTasks: () => dispatch(fetchTasks()),
    receiveActiveTaskId: (taskId) => dispatch(receiveActiveTaskId(taskId)),

  })
};

export default connect(mSTP, mDTP)(Map);