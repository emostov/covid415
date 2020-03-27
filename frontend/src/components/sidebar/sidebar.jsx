import React, { Component } from 'react';

import ActiveSidebar from './active';
import AvailableSidebar from './available'
import '../../styles/sidebar.scss';

export default class SideBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      available: true,
    }

    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler(field) {
    const { receiveDisplayAssignedTasks } = this.props
    if (field === 'available' && this.state.available === true) {
      return null
    } else if (field === 'available') {
      this.setState({ available: true });
      receiveDisplayAssignedTasks(true);
    }
    if (field === 'active' && this.state.available === true) {
      this.setState({ available: false });
      receiveDisplayAssignedTasks(false);
    } else {
      return null
    }
  }


  render() {
    const { 
      currentUserId, 
      history, 
      updateTask, 
      openModal, 
      closeModal, 
      session, 
      userLocation,
      tasks,
      receiveNewTask,
      active
      // activeTask,
      // receiveActiveTaskId,
    } = this.props
    
    let available = []
    // let active = []
    Object.values(tasks).forEach((task) => {
      if (task.status === 0) {
        available.push(task)
      }
      //  else if (task.status === 1) {
      //   console.log('task pre push', task)
      //   active.push(task)
      // }
    })
    console.log('----')

    return (
      <div className='sidebar-container'>
        <div className="sidebar-inner-container">
          <div className="sidebar-container-header">
            <div className="sidebar-container-inner-header">
              <div className="sidebar-container-header-available"
                onClick={e => { e.preventDefault(); this.clickHandler('available') }}>
                <div className={this.state.available ? "available-title-name-active" : "available-title-name"}>
                  Delivery Requests
                </div>
              </div>
              <div className="sidebar-container-header-active"
                onClick={e => { e.preventDefault(); this.clickHandler('active') }}>
                <div className={this.state.available ? "active-title-name" : "active-title-name-active"}>
                  My Deliveries
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-container-inner-body">
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
                    activeTask={this.props.activeTask}
                    receiveActiveTaskId={this.props.receiveActiveTaskId}
                    currentPosition={userLocation}
                    receiveNewTask={receiveNewTask}/>
                ) : (
                  <ActiveSidebar
                    session={session}
                    active={active}
                    updateTask={updateTask}
                    openModal={openModal}
                    closeModal={closeModal}
                    currentUserId={currentUserId}
                    history={history}
                    activeTask={this.props.activeTask}
                    receiveActiveTaskId={this.props.receiveActiveTaskId}
                    currentPosition={userLocation}
                    receiveNewTask={receiveNewTask}/>
                )
            }
          </div>
        </div>
      </div>
    )
  }
}
