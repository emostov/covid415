import React from 'react';

import SideBar from '../sidebar/sidebar'
import Map from '../map/map'
import '../../styles/main_page.scss'

class MainPage extends React.Component {

  render() {
    return (
      <div className="mainpage-container">
        <SideBar />
        <Map />
      </div>
    );
  }
}

export default MainPage;