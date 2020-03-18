export const RECEIVE_ACTIVE_TASK_ID = 'RECEIVE_ACTIVE_TASK_ID';

// Pass in null for taskId when no task is active
export const receiveActiveTaskId = (taskId) => ({
  type: RECEIVE_ACTIVE_TASK_ID,
  taskId,
});

