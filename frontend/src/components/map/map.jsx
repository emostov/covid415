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
      dispalyNotAssignedTasks: true,
    }
  }

  componentDidMount() {
    mapboxgl.accessToken = mapboxkeys.public_key;
    // Set the map's max bounds
    const bounds = [
      [-122.54, 37.6], // [west, south]
      [-122.34, 37.9]  // [east, north]
    ];
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
    this.setState({
      map,
      dispalyNotAssignedTasks: this.props.dispalyNotAssignedTasks
    });
    this.callPlaceMarkers();
  }
  // Recursively sets a timeout and calls itself if not loaded
  // Essentially a recursive while loop
  callPlaceMarkers() {
    if (this.state.map && this.props.tasks.length) {
      const userMarkers = this.placeMapMarkers(this.props.currentUserTasks);
      const helpNeededMarkers = this.placeMapMarkers(this.props.helpNeededTasks);
      this.setState({ userMarkers, helpNeededMarkers })
    } else {
      setTimeout(() => {
        this.callPlaceMarkers()
      }, 1 * 100)
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.tasks !== prevProps.tasks) {
      this.clearMarkers(this.state.userMarkers);
      this.clearMarkers(this.state.helpNeededMarkers);

      const userMarkers = this.placeMapMarkers(this.props.currentUserTasks);
      const helpNeededMarkers = this.placeMapMarkers(this.props.helpNeededTasks);
      this.setState({ userMarkers, helpNeededMarkers })
    }
  }

  placeMapMarkers(tasks) {
    if (!tasks) return;
    const { map } = this.state
    const allMarkers = [];
    const geojson = {
      type: 'FeatureCollection',
      features:
        tasks.map(task => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [task.deliveryLatLong[1], task.deliveryLatLong[0]]
          },
          properties: {
            title: `${task.type}`,
            deliveryAddress: task.deliveryAddress,
            taskId: task._id,
            volunteerId: task.volunteer,
            status: task.status
          }
        }))
    };
    // add markers to map
    geojson.features.forEach((marker) => {
      // create a HTML element for each feature
      const el = document.createElement('div');
      const { status, volunteerId } = marker.properties
      const { currentUserId } = this.props
      if (status === 0) {
        el.className = 'marker inActive'
      } else if (status === 1) {
        el.className = 'marker active'
      } else if (status === 2) {
        el.className = 'marker completed'
      }
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
      }).setHTML(
        '<h3>' + marker.properties.title + '</h3>'
        + '<p>' + 'Volunteer Needed' + '</p>'
      )
      // make a marker for each feature and add to the map
      const mapBoxMarker = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(popup)
      // Add mapBox marker and associated id to array
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

    return allMarkers;
  }

  // Removes all current markers from map
  clearMarkers(markers) {
    if (!markers) return;
    markers.forEach((marker) => {
      marker.mBMarker.remove();
    })
  }

  addMarkers(markers) {
    if (!markers) return;
    markers.forEach((marker) => {
      marker.mBMarker.addTo(this.state.map);
    })
  }

  updateMarkers() {
    const { userMarkers, helpNeededMarkers } = this.state;
    if (this.props.dispalyNotAssignedTasks) {
      // display the helped needed markers
      this.clearMarkers(userMarkers);
      this.addMarkers(helpNeededMarkers);
    } else {
      this.clearMarkers(helpNeededMarkers);
      this.addMarkers(userMarkers);
    }
  }

  updatePopups() {
    const { userMarkers, helpNeededMarkers, map } = this.state;
    const { activeTask } = this.props;
    if (!(userMarkers && helpNeededMarkers)) return;

    const allMarkers = userMarkers.concat(helpNeededMarkers);
    allMarkers.length && allMarkers.forEach((markerObj) => {
      const { mBMarker, id } = markerObj;
      if (
        activeTask && activeTask.taskId === id && !mBMarker.getPopup().isOpen()
      ) {
        mBMarker.getPopup().addTo(map)
      } else if (mBMarker.getPopup().isOpen()) {
        mBMarker.getPopup().remove();
      }
    })
  }

  render() {
    this.updateMarkers();
    this.updatePopups();

    return (
      < div >
        <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div >
    )
  }
}


export default Map;