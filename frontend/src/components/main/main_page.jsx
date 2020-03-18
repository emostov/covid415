import React from 'react';
import SideBarContainer from '../sidebar/sidebar_container'
import MapContainer from '../map/map_container'
import '../../styles/main_page.scss'


class MainPage extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.fetchTasks()
  }

  render() {
    const { tasks, history } = this.props
    return (
      <div className="mainpage-container">
        <MapContainer />
        <SideBarContainer tasks={tasks} history={history}/>
      </div>
    );
  }
}

export default MainPage;