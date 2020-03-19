import React from 'react';
import SideBarContainer from '../sidebar/sidebar_container'
import MapContainer from '../map/map_container'
import geocodeUtil from '../../util/geocode_util'
import '../../styles/main_page.scss'


class MainPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPosition: []
    }

    this.getCurrentDistance = this.getCurrentDistance.bind(this)
  }

  componentDidMount() {
    this.props.fetchTasks()
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      const userPos = [position.coords.latitude, position.coords.longitude]
      this.setState({ currentPosition: userPos })
    })
  }

  getCurrentDistance() {
    const { tasks } = this.props
    const distances = []
    this.getCurrentPosition();
    // This is where the API for the map needs to be called to find all the distances
    // between 2 points
    // tasks.map(task => {
    //   const taskPosition = task.deliveryLatLong;
    //   const userPosition = this.state.currentPosition;

    //   geocodeUtil.parseDestination(userPosition, taskPosition)
    // })
  }

  render() {
    this.getCurrentDistance();

    if (this.props.tasks.length === 0) {
      return null
    }
    const { tasks, history } = this.props
    return (
      <div className="mainpage-container">
        <MapContainer />
        <SideBarContainer 
          tasks={tasks} 
          history={history}
          currentPosition={this.state.currentPosition}/>
      </div>
    );
  }
}

export default MainPage;