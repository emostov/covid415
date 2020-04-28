import { connect } from 'react-redux';

import SideBar from './sidebar';
import { updateTask } from '../../actions/task_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { receiveActiveTaskId } from '../../actions/active_task_actions';
import { getUserLocation } from '../../actions/location_actions';
import { receiveNewTask } from '../../actions/task_actions';   
import {
  receiveDisplayAssignedTasks
} from '../../actions/displayed_tasks_actions';
import { selectCurrenUserActiveTasks, selectHelpNeededTasks} from '../../reducers/selectors'


const mSTP = state => {
  let currentUserId;
  if (state.session.user) {
    currentUserId = state.session.user.id
  } else {
    currentUserId = undefined
  }

  return {
    currentUserId: currentUserId,
    activeTask: state.ui.activeTask,
    session: state.session,
    userLocation: state.ui.userLocation,
    tasks: state.tasks,
    currentUserTasks: selectCurrenUserActiveTasks(state),
    helpNeededTasks: selectHelpNeededTasks(state),
  }
};

const mDTP = dispatch => ({
  updateTask: () => dispatch(updateTask()),
  openModal: (modal, taskId) => dispatch(openModal(modal, taskId)),
  closeModal: () => dispatch(closeModal()),
  getUserLocation: () => dispatch(getUserLocation()),
  receiveActiveTaskId: (taskId) => dispatch(receiveActiveTaskId(taskId)),
  receiveNewTask: (task) => dispatch(receiveNewTask(task)),
  receiveDisplayAssignedTasks:
    (bool) => dispatch(receiveDisplayAssignedTasks(bool)),
});

export default connect(mSTP, mDTP)(SideBar)