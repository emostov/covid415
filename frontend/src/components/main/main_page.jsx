import React, { useEffect } from 'react';

import SideBarContainer from '../sidebar/sidebar_container';
import MapContainer from '../map/map_container';
import '../../styles/main_page.scss';

import keys from '../../config/keys_mapbox';

const MainPage = (props) => {

    const callScript = () => {
        const script = document.createElement('script');
        script.className = 'autocomplete'
        script.src = `https://maps.googleapis.com/maps/api/js?key=${keys.geocodeKey}&libraries=places`;
        script.async = true;
        document.body.appendChild(script);
    };

    useEffect(() => {
        props.fetchTasks();
        props.getUserLocation();
        
        callScript();

        if(!props.loggedIn) {
          props.openModal('welcome');
        }
    }, []);

    if(props.tasks.length === 0) {
        return null;
    }

    const { history } = props;

    return (
        <div className="mainpage-container">
          <MapContainer />
          <SideBarContainer
            history={history} />
        </div>
    );
}

export default MainPage;