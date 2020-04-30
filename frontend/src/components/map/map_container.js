import { connect } from 'react-redux';

import Map from './map';
import { fetchTasks } from '../../actions/task_actions';
import { receiveActiveTaskId } from '../../actions/active_task_actions';
import {
  selectHelpNeededTasks, selectCurrentUserTask, selectCurrenUserActiveTasks
} from '../../reducers/selectors';

const mSTP = (state) => {
  let currentUserId, currentUserTasks;
  if (state.session.user) {
    currentUserId = state.session.user.id;
    currentUserTasks = selectCurrentUserTask(state);
  } else {
    currentUserId = undefined;
    currentUserTasks = undefined;
  }

  const { activeTask, displayNotAssignedTasks } = state.ui;
  return ({
    tasks: Object.values(state.tasks),
    activeTask,
    currentUserId,
    currentUserTasks,
    helpNeededTasks: selectHelpNeededTasks(state),
    displayNotAssignedTasks,
    activeTasks: selectCurrenUserActiveTasks(state),
  })
};

const mDTP = (dispatch) => {
  return ({
    fetchTasks: () => dispatch(fetchTasks()),
    receiveActiveTaskId: (taskId) => dispatch(receiveActiveTaskId(taskId)),

  })
};

export default connect(mSTP, mDTP)(Map);