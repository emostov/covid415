import { combineReducers } from 'redux';

import modal from './modal_reducer'
import activeTask from './active_task_reducer'
import userLocation from './location_reducer'
import displayNotAssignedTasks from './display_not_assigned_tasks_reducer'

const uiReducer = combineReducers({
  modal,
  activeTask,
  userLocation,
  displayNotAssignedTasks,
});

export default uiReducer;