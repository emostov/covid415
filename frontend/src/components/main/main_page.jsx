import React from 'react';

import SideBar from '../sidebar/sidebar';
import MapContainer from '../map/map_container';
import '../../styles/main_page.scss';

class MainPage extends React.Component {

  render() {
    return (
      <div className="mainpage-container">
        <SideBar />
        <MapContainer />
      </div>
    );
  }
}

export default MainPage;