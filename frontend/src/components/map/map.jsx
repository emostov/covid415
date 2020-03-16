import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

import '../../styles/map.scss'

class Map extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            lng: -122.44,
            lat: 37.76,
            zoom: 12.2
        }
    }

    componentDidMount() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaGltdXJheDN4IiwiYSI6ImNrN3UwYmptNjB3eGEzZnB1MGZyMXN4eGIifQ.KzlIQPQU2VgrhC7y_8eMcw';

        var bounds = [
            [-122.54, 37.7], // [west, south]
            [-122.34, 37.81]  // [east, north]
          ];
          // Set the map's max bounds

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.setMaxBounds(bounds);
    }

    render() {

        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )
    }
}



export default Map;