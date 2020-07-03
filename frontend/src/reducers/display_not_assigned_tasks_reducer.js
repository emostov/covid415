import {
  RECEIVE_DISPLAY_NOT_ASSIGNED_TASKS,
} from '../actions/displayed_tasks_actions';


const displayNotAssignedTasks = (state = true, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_DISPLAY_NOT_ASSIGNED_TASKS:
      return action.boolean;
    default:
      return state;
  }
}

export default displayNotAssignedTasks;