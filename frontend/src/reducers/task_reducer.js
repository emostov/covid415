import { RECEIVE_TASKS, RECEIVE_NEW_TASK } from '../actions/task_actions';



const convertToTasksObj = (tasks) => {
  const newTasks = {};
  tasks.forEach((t) => {
    newTasks[t._id] = t;
  })

  return newTasks;
}

const allTasksUpdate = (tasks, nextState) => {
  tasks.forEach((t) => {
    if (nextState[t._id] !== undefined) {
      // call function that replaces updated fields
      const updated = {
        ...nextState[t._id],
        ...t
      }
      nextState[t._id] = updated
    } else {
      nextState[t._id] = t
    }
  })
  return nextState;
}

const TasksReducer = (state = {}, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  // const nextState = state.slice()
  switch (action.type) {
    case RECEIVE_TASKS:
      if (Object.keys(nextState).length > 0) {
        nextState = allTasksUpdate(action.tasks.data, nextState);
      } else {
        nextState = convertToTasksObj(action.tasks.data)
      }
      return nextState
    case RECEIVE_NEW_TASK:
      if (nextState[action.task._id] !== undefined) {
        // call function that replaces updated fields
        const updated = {
          ...nextState[action.task._id],
          ...action.task
        }

        nextState[action.task._id] = updated
      } else {
        nextState[action.task._id] = action.task.data
      }
      return nextState
    default:
      return state
  }
}

export default TasksReducer