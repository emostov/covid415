export const selectCurrentUserTask = (state) => {
  const { id } = state.session.user;
  const { tasks } = state;
  return Object.values(tasks).filter((task) => task.volunteer === id)
};

export const selectHelpNeededTasks = (state) => {
  const { tasks } = state;
  return Object.values(tasks).filter((task) => task.status === 0)
};

export const selectCurrenUserActiveTasks = (state) => {
  if (!state.session.user) return [];
  const { id } = state.session.user;
  const { tasks } = state;
  return Object.values(tasks).filter((task) =>
    task.volunteer === id && task.status === 1
  )
}