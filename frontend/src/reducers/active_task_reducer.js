import { RECEIVE_ACTIVE_TASK_ID } from '../actions/active_task_actions';

const activeTask = (state = null, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_ACTIVE_TASK_ID:
      newState.taskId = action.taskId
      return newState;
    default:
      return state;
  }
};

export default activeTask;