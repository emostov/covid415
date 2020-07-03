import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import { mapBoxPublicKey } from '../../config/keys_front'
import '../../styles/map.scss'
import { typeIconString, statusPopupClass } from '../../util/card_icon_util';

const Map = (props) => {
  const {
    tasks,
    helpNeededTasks,
    activeTask,
    activeTasks,
    receiveActiveTaskId,
    displayNotAssignedTasks,
    currentUserTasks
  } = props;

  const lng = -122.44;
  const lat = 37.76;
  const zoom = 11;

  const [map, setMap] = useState(null);
  const [userMarkers, setUserMarkers] = useState(null);
  const [helpNeededMarkers, setHelpNeededMarkers] = useState(null);

  const mapContainer = useRef(null);

  const callPlaceMarkers = () => {
    if (map && tasks.length) {
      const userMarkers = placeMapMarkers(currentUserTasks);
      const newHelpNeededMarkers = placeMapMarkers(helpNeededTasks);

      setUserMarkers(userMarkers);
      setHelpNeededMarkers(newHelpNeededMarkers);
    } else {
      setTimeout(() => {
        callPlaceMarkers()
      }, 1 * 100);
    }
  };

  const placeMapMarkers = (tasks) => {
    if (!tasks) return;

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
            status: task.status,
            type: task.type
          }
        }))
    };

    geojson.features.forEach((marker) => {

      // Create a HTML element for each feature
      const el = document.createElement('div');
      const { status, type, taskId } = marker.properties;
      if (status === 0) {
        el.className = 'marker notActive';
      } else if (status === 1) {
        el.className = 'marker active';
      } else if (status === 2) {
        el.className = 'marker completed';
      }
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
        className: statusPopupClass(status)
      }).setHTML(
        `${type} delivery${`<br />`}${typeIconString(type.toLowerCase(), status)}`
      )

      // Make a marker for each feature and add to the map
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
        if (popup.isOpen() && (!activeTask || activeTask.taskId !== taskId)) {
          popup.remove();
        }
      });
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation()
        const isOpen = popup.isOpen();
        popup.addTo(map);

        // If popup is open and is the active task id 
        if (isOpen && activeTask && (activeTask.taskId === taskId)) {

          // Make it not the active taskid & close via popupdate which looks
          // at active task id
          receiveActiveTaskId(null);
        } else {
          receiveActiveTaskId(taskId);

          // Not critical, but smooths animation because otherwise we rely on 
          // update popups which has an update time out
          popup.addTo(map);
        }
      });
    });

    return allMarkers;
  }

  const clearMarkers = (markers) => {
    if (!markers) return;
    markers.forEach((marker) => {
      marker.mBMarker.remove();
    });
  };

  const addMarkers = (markers) => {
    if (!markers) return;
    markers.forEach((marker) => {
      marker.mBMarker.addTo(map);
    });
  };

  const updateMarkers = () => {
    removeAllPopups();
    if (displayNotAssignedTasks) {
      // Display the helped needed markers
      clearMarkers(userMarkers);
      addMarkers(helpNeededMarkers);
    } else {
      clearMarkers(helpNeededMarkers);
      addMarkers(userMarkers);
    }
  };

  const updatePopups = () => {
    if (!(userMarkers && helpNeededMarkers)) return;
    const allMarkers = displayNotAssignedTasks ? helpNeededMarkers : userMarkers;

    // Use set timeout to makesure if activeTask was set somewhere else it 
    // has time to propagate
    setTimeout(() => {
      allMarkers.length && allMarkers.forEach((markerObj) => {
        const { mBMarker, id } = markerObj;
        if (
          activeTask && activeTask.taskId === id && !mBMarker.getPopup().isOpen()
        ) {
          mBMarker.getPopup().addTo(map)
        } else if (
          mBMarker.getPopup().isOpen() && activeTask && activeTask.taskId !== id
        ) {
          mBMarker.getPopup().remove();
        }
      })
    }, 1)
  }

  const removeAllPopups = () => {
    if (!(userMarkers && helpNeededMarkers)) return;
    const allMarkers = userMarkers.concat(helpNeededMarkers);
    allMarkers.length && allMarkers.forEach((markerObj) => {
      const { mBMarker } = markerObj;
      if (mBMarker.getPopup().isOpen()) {
        mBMarker.getPopup().remove();
      }
    });
  };

  useEffect(() => {
    mapboxgl.accessToken = mapBoxPublicKey;

    // Set the map's max bounds
    const bounds = [
      [-122.54, 37.6], // [west, south]
      [-122.34, 37.9]  // [east, north]
    ];
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [lng, lat],
        zoom: zoom
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
      setMap(map)
    }
    if (!map) initializeMap({ setMap, mapContainer });
    callPlaceMarkers();
  }, [map]);

  useEffect(() => {
    if (
      (
        Object.keys(tasks).length
        !== Object.keys(tasks).length
      )
      || (
        helpNeededTasks &&
        Object.keys(helpNeededTasks).length
        !== Object.keys(helpNeededTasks).length
      )
      || (
        activeTasks &&
        Object.keys(activeTasks).length
        !== Object.keys(activeTasks).length
      )

    ) {
      removeAllPopups();
      clearMarkers(userMarkers);
      clearMarkers(helpNeededMarkers);

      // Remake markers so all are up to date with current tasks
      const userMarkers = placeMapMarkers(currentUserTasks);
      const newHelpNeededMarkers = placeMapMarkers(helpNeededTasks);

      setUserMarkers(userMarkers);
      setHelpNeededMarkers(newHelpNeededMarkers);
    }
  }, [tasks, helpNeededTasks, activeTasks]);


  updateMarkers();
  updatePopups();

  return (
    < div >
      <div ref={el => mapContainer.current = el} className="mapContainer" />
    </div >
  );
}

export default Map;