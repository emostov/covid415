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
      allMarkers: [],
    }
  }

  componentDidMount() {



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

    this.setState({ map });

    // display the markers after 2 seconds
    setTimeout(() => {
      if (this.state.map && this.props.tasks) {
        this.placeMapMarkers()
      }
    }, 2 * 1000)


  }


  placeMapMarkers() {
    const { map } = this.state
    const allMarkers = [];

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
            title: `${task.type}`,
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
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
      }) // add popups
        .setHTML(
          '<h3>' + marker.properties.title + '</h3>'
          + '<p>' + 'Volunteer Needed' + '</p>'
        )

      // make a marker for each feature and add to the map
      const mapBoxMarker = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(popup)
        .addTo(this.state.map);

      allMarkers.push({ mBMarker: mapBoxMarker, id: marker.properties.taskId });
      const markerEl = mapBoxMarker.getElement();
      markerEl.addEventListener('mouseenter', () => {
        // Add popup to map 
        popup.addTo(map);
      });
      markerEl.addEventListener('mouseleave', () => {
        // Remove popup from map
        popup.remove();
      });
    });

    this.setState({ allMarkers });
  }

  updatePopups() {
    const { allMarkers, map } = this.state;
    const { activeTask } = this.props;
    allMarkers.length && allMarkers.forEach((markerObj) => {
      const { mBMarker, id } = markerObj;

      if (
        activeTask && activeTask.taskId === id && !mBMarker.getPopup().isOpen()
      ) {
        mBMarker.getPopup().addTo(map)
      } else if (mBMarker.getPopup().isOpen()) {
        console.log('removing popup')
        mBMarker.getPopup().remove();
      }
    })

  }

  render() {
    { this.updatePopups() }
    return (
      < div >
        <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div >
    )
  }


}


export default Map;