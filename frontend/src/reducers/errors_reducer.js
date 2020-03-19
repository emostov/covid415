import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import TaskErrorsReducer from './task_errors_reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  tasks: TaskErrorsReducer
});