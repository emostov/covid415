import React, { Component } from 'react';
import ActiveSidebar from './active';
import AvailableSidebar from './available'
import '../../styles/sidebar.scss';

export default class SideBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      available: true
    }

    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler(field) {
    const { receieveDisplayAssignedTasks } = this.props
    if (field === 'available' && this.state.available === true) {
      return null
    } else if (field === 'available') {
      this.setState({ available: true });
      receieveDisplayAssignedTasks(true);
    }
    if (field === 'active' && this.state.available === true) {
      this.setState({ available: false });
      receieveDisplayAssignedTasks(false);
    } else {
      return null
    }
  }

  getCurrentPosition() {
    console.log("outside of the render function")
    navigator.geolocation.getCurrentPosition(position => {
      userPos = [position.coords.longitude, position.coords.latitude]
      console.log("this is the user position", userPos)
      return userPos
    })
  }

  render() {
    const { currentUserId, history, updateTask, openModal, closeModal, session } = this.props

    let available = []
    let active = []
    this.props.tasks.forEach((task, i) => {
      if (task.status === 0) {
        available.push(task)
      } else if (task.status === 1) {
        active.push(task)
      }
    })
    this.getCurrentPosition();

    return (
      <div className='sidebar-container' onClick={this.getCurrentPosition}>
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
                    receiveActiveTaskId={this.props.receiveActiveTaskId} />
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
                    receiveActiveTaskId={this.props.receiveActiveTaskId} />
                )
            }
          </div>
        </div>
      </div>
    )
  }
}
