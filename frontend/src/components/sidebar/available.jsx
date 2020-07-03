import React from 'react';
import Card from './card'
import frontendUtil from '../../util/frontend_util'

const AvailableSidebar = props => {

  const {
    currentUserId,
    history,
    available,
    openModal,
    closeModal,
    currentPosition,
    receiveActiveTaskId,
    activeTask,
    receiveNewTask
  } = props;

  let sortedTasks = frontendUtil.sortDistances2(available);

  return (
    <div className='card-container-available' id='card-container'>
      {
        sortedTasks.map((task, i) => {
          return <Card
            key={`card-available-${i}`}
            cardType={'available'}
            task={task}
            openModal={openModal}
            closeModal={closeModal}
            currentUserId={currentUserId}
            history={history}
            activeTask={activeTask}
            receiveActiveTaskId={receiveActiveTaskId}
            currentPosition={currentPosition}
            receiveNewTask={receiveNewTask}
          />
        })
      }
    </div>
  );

}

export default AvailableSidebar;