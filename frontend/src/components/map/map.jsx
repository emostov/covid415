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
      zoom: 11,
      map: '',
    }
  }

  componentDidMount() {
    this.props.fetchTasks()
      .then(() => {

        mapboxgl.accessToken = mapboxkeys.public_key;

        var bounds = [
          [-122.54, 37.6], // [west, south]
          [-122.34, 37.9]  // [east, north]
        ];
        // Set the map's max bounds

        const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/dark-v10',
          center: [this.state.lng, this.state.lat],
          zoom: this.state.zoom
        });

        map.addControl(new mapboxgl.NavigationControl());

        map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true
          })
        );

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
                deliveryAddress: task.deliveryAddress,
                taskId: task._id
              }
            }))
        };
        this.setState({ map })
      })
  }


  placeMapMarkers() {
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
            deliveryAddress: task.deliveryAddress,
            taskId: task._id
          }
        }))
    };

    // add markers to map
    geojson.features.forEach((marker) => {

      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';
      debugger
      // make a marker for each feature and add to the map
      const mapBoxMarker = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              '<h3>' + marker.properties.title + '</h3>'
              + '<p>' + marker.properties.deliveryAddress + '</p>'
            )
        )
        .addTo(this.state.map);

      const markerEl = mapBoxMarker.getElement();

      markerEl.addEventListener('mouseenter', () => {
        // dispatch state indicating that this marker is being shown
        mapBoxMarker.togglePopup()
      });

      markerEl.addEventListener('mouseleave', () => {
        // dispatch state indicating this marker is no longer being show
        mapBoxMarker.togglePopup()
      });
    });
  }

  render() {
    if (this.state.map && this.props.tasks) {
      this.placeMapMarkers()
    }
    return (

      < div >
        <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div >
    )
  }


}


export default Map;