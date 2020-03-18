import { connect } from 'react-redux';

import Map from './map';
import { fetchTasks } from '../../actions/task_actions';
import { receiveActiveTaskId } from '../../actions/active_task_actions';

const mSTP = state => {
  console.log(state.ui.activeTask)
  return ({
    tasks: Object.values(state.tasks),
    activeTask: state.ui.activeTask
  })
};

const mDTP = (dispatch, getState) => {
  return ({
    fetchTasks: () => dispatch(fetchTasks()),
    receiveActiveTaskId: (taskId) => dispatch(receiveActiveTaskId(taskId)),
    
  })
};

export default connect(mSTP, mDTP)(Map);