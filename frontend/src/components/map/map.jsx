import React from 'react';

import mapboxgl from 'mapbox-gl';
import mapboxkeys from '../../config/keys_mapbox';
import '../../styles/map.scss'

class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lng: -122.44,
      lat: 37.76,
      zoom: 11
    }
  }

  componentDidMount() {
    this.props.fetchTasks()
      .then(() => {

        mapboxgl.accessToken = mapboxkeys.public_key;

        var bounds = [
          [-122.54, 37], // [west, south]
          [-122.34, 38]  // [east, north]
        ];
        // Set the map's max bounds

        const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/dark-v10',
          center: [this.state.lng, this.state.lat],
          zoom: this.state.zoom
        });

        map.addControl(new mapboxgl.NavigationControl());   

        map.setMaxBounds(bounds);

            let geojson = {
            type: 'FeatureCollection',
            features:
                this.props.tasks.map(task => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [task.deliveryLatLong[1], task.deliveryLatLong[0]]
                },
                properties: {
                    title: `${task.type} request`,
                    description: 'Volunteer Needed',
                    taskId: task._id
                }
                }))
        };
        // add markers to map

        geojson.features.forEach(function (marker) {

          // create a HTML element for each feature
          const el = document.createElement('div');
          el.className = 'marker';

          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                  '<h3>' + marker.properties.title + '</h3>'
                  + '<p>' + marker.properties.description + '</p>'
                )
            )
            //if popup is the active state ID popup, then open it
            //else make sure it's closed
            //also perhaps make the marker bigger
            .addTo(map);
        });
      })
  }

  render() {
    //recreate geoJSON for task
    //close if doesn't match id of state
    return (
      <div>
        <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div>
    )
  }
}


export default Map;