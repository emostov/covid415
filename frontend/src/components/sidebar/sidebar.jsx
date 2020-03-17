import React, { Component } from 'react';
import AciveSidebar from './active';
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
    return (
      <div className='sidebar-container'>
        <div className="sidebar-inner-container">
          <div className="sidebar-container-header">
            <div className="sidebar-container-inner-header">
              <div className="sidebar-container-header-available"
                   onClick={e =>{e.preventDefault(); this.clickHandler('available')}}>
                <div className="available-title-name">
                  Available
                </div>
              </div>
              <div className="sidebar-container-header-active"
                   onClick={e=> {e.preventDefault(); this.clickHandler('active')}}>
                <div className="active-title-name">
                  Active
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
                  <AvailableSidebar />
                ) : (
                  <AciveSidebar />
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
