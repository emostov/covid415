import React from 'react';

import SideBarContainer from '../sidebar/sidebar_container';
import MapContainer from '../map/map_container';
import '../../styles/main_page.scss';

import keys from '../../config/keys_mapbox';

class MainPage extends React.Component {

  componentDidMount() {
    this.props.fetchTasks();
    this.props.getUserLocation();
    this.useScript();
    if (!this.props.loggedIn) {
      this.props.openModal('welcome')
    };
  }

  useScript() {
    const script = document.createElement("script");
    script.className = 'autocomplete'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${keys.geocodeKey}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);
  }

  render() {

    if (this.props.tasks.length === 0) {
      return null
    }
    const { tasks, history } = this.props
    return (
      <div className="mainpage-container">
        <MapContainer />
        <SideBarContainer 
          tasks={tasks} 
          history={history}/>
      </div>
    );
  }
}

export default MainPage;