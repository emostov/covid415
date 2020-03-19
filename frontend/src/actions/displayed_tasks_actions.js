export const
  RECEIVE_DISPLAY_NOT_ASSIGNED_TASKS = 'RECEIVE_DISPLAY_NOR_ASSIGNED_TASKS';

// Boolean and if true the sidebar is displaying the help needed tasks
export const receieveDisplayAssignedTasks = (boolean) => ({
  type: RECEIVE_DISPLAY_NOT_ASSIGNED_TASKS,
  boolean,
});