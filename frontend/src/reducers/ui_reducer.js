import { combineReducers } from 'redux';

import modal from './modal_reducer'
import activeTask from './active_task_reducer'
import dispalyNotAssignedTasks from './display_not_assigned_tasks_reducer'

const uiReducer = combineReducers({
  modal,
  activeTask,
  dispalyNotAssignedTasks,
});

export default uiReducer;