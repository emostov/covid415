import { combineReducers } from 'redux';

import modal from './modal_reducer'
import activeTask from './active_task_reducer'

const uiReducer = combineReducers({
    modal,
    activeTask
});

export default uiReducer;