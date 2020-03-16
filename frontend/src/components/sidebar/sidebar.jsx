import React, { Component } from 'react';

import '../../styles/sidebar.scss';

export default class SideBar extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className='sidebar-container'>
        <div className="sidebar-inner-container">
          <div className="sidebar-container-header">
            <div className="sidebar-container-header-available">
              available
            </div>
            <div className="sidebar-container-header-active">
              active
            </div>
          </div>
          <div className="sidebar-container-body">
            body
            {/* Task item container goes here */}
          </div>
        </div>
      </div>
    )
  }
}
