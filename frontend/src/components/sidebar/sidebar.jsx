import React, { Component } from 'react';

import ActiveSidebar from './active';
import AvailableSidebar from './available'

export const Sidebar = props => {
  const [available, setAvailable] = useState(true);

  const {
    currentUserId,
    history,
    updateTask,
    openModal,
    closeModal,
    session,
    userLocation,
    receiveNewTask,
    active,
    available,
    activeTask,
  } = props;

  function clickHandler(field) {
    const { receiveDisplayAssignedTasks } = props
    if (field === 'available' && available === true) {
      return null
    } else if (field === 'available') {
      setAvailable(true);
      receiveDisplayAssignedTasks(true);
    }
    if (field === 'active' && available === true) {
      setAvailable(false);
      receiveDisplayAssignedTasks(false);
    } else {
      return null
    }
  }
  return (
    <div className='sidebar-container'>
      <div className="sidebar-inner-container">
        <div className="sidebar-container-header">
          <div className="sidebar-container-inner-header">
            <div className="sidebar-container-header-available"
              onClick={e => { e.preventDefault(); clickHandler('available') }}>
              <div className={available ? "available-title-name-active" : "available-title-name"}>
                Delivery Requests
              </div>
            </div>
            <div className="sidebar-container-header-active"
              onClick={e => { e.preventDefault(); clickHandler('active') }}>
              <div className={this.state.available ? "active-title-name" : "active-title-name-active"}>
                My Deliveries
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-container-inner-body" id='scroll-container'>
          {
            this.state.available
              ?
              (
                <AvailableSidebar
                  available={available}
                  updateTask={updateTask}
                  openModal={openModal}
                  closeModal={closeModal}
                  currentUserId={currentUserId}
                  history={history}
                  activeTask={activeTask}
                  receiveActiveTaskId={props.receiveActiveTaskId}
                  currentPosition={userLocation}
                  receiveNewTask={receiveNewTask} />
              ) : (
                <ActiveSidebar
                  session={session}
                  active={active}
                  updateTask={updateTask}
                  openModal={openModal}
                  closeModal={closeModal}
                  currentUserId={currentUserId}
                  history={history}
                  activeTask={activeTask}
                  receiveActiveTaskId={props.receiveActiveTaskId}
                  currentPosition={userLocation}
                  receiveNewTask={receiveNewTask} />
              )
          }
        </div>
      </div>
    </div>
  )
};
