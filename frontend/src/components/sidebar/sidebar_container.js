import { connect } from 'react-redux';

import SideBar from './sidebar';
import { updateTask } from '../../actions/task_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { receiveActiveTaskId } from '../../actions/active_task_actions';
import { getUserLocation } from '../../actions/location_actions'
import { receiveTaskDistanceInfo } from '../../actions/task_distance_actions';
import {
  receiveDisplayAssignedTasks
} from '../../actions/displayed_tasks_actions';

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
    
  }
};

const mDTP = dispatch => ({
  updateTask: () => dispatch(updateTask()),
  openModal: (modal, taskId) => dispatch(openModal(modal, taskId)),
  closeModal: () => dispatch(closeModal()),
  getUserLocation: () => dispatch(getUserLocation()),
  receiveActiveTaskId: (taskId) => dispatch(receiveActiveTaskId(taskId)),
  receiveTaskDistanceInfo: (data) => dispatch(receiveTaskDistanceInfo(data)),
  receiveDisplayAssignedTasks:
    (bool) => dispatch(receiveDisplayAssignedTasks(bool)),
});

export default connect(mSTP, mDTP)(SideBar)