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
    if (field === 'available' && this.state.available === true) {
      return null
    } else if (field === 'available') {
      this.setState({ available: true })
    }
    if (field === 'active' && this.state.available === true) {
      this.setState({ available: false })
    } else {
      return null
    }
  }
  
  render() {
    const { updateTask, openModal, closeModal } = this.props

    let available = []
    let active = []
    this.props.tasks.forEach((task, i) => {
      if (task.status === 0) {
        available.push(task)
      } else if (task.status === 1) {
        active.push(task)
      }
    })

    return (
      <div className='sidebar-container'>
        <div className="sidebar-inner-container">
          <div className="sidebar-container-header">
            <div className="sidebar-container-inner-header">
              <div className="sidebar-container-header-available"
                   onClick={e =>{e.preventDefault(); this.clickHandler('available')}}>
                <div className={this.state.available ? "available-title-name-active" : "available-title-name"}>
                  Available Tasks
                </div>
              </div>
              <div className="sidebar-container-header-active"
                   onClick={e=> {e.preventDefault(); this.clickHandler('active')}}>
                <div className={this.state.available ? "active-title-name" : "active-title-name-active"}>
                  My Tasks
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-container-body">
            <div className="sidebar-container-inner-body">
              {
                this.state.available
                ?
                (
                  <AvailableSidebar 
                        available={available} 
                        updateTask={updateTask} 
                        openModal={openModal} 
                        closeModal={closeModal}/>
                ) : (
                  <ActiveSidebar 
                        active={active} 
                        updateTask={updateTask} 
                        openModal={openModal} 
                        closeModal={closeModal}/>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
