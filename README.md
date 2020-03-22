![logo](frontend/src/public/COVID415.png)
# COVID415

[COVID415](http://covid415.herokuapp.com/#/) is a service that matches San Franciscans in self-isolation due to the novel coronavirus 2019-nCoV (also known as COVID-19) pandemic with local volunteers to deliver essentials like food and medicine.

![home](frontend/public/homepage.png "COVID415")

## Technologies used
* Front-end:
  * React
  * Redux
* Back-end
  * Express
  * MongoDB
* Cloud:
  * Heroku
* Integrations:
  * Google Maps Geoencoding API
  * Google Maps Distance Matrix API
  * MapBox

## Features
* ### **View delivery requests** - an interactive list and map show all delivery requests sorted by distance away. Users can browse requests and accept a request.
![accept_delivery](frontend/public/accept_delivery.gif "Accept Delivery")

* ### **Manage your deliveries** - an separate tab allows users to view and manage all the delivery requests that they've accepted.
![complete_delivery](frontend/public/complete_delivery.gif "Complete Delivery")

* ### Request a delivery - as a user under self-isolation, you can request a delivery which will be added to the list and map.
![request_task](frontend/public/request_task.gif "Request Task")

## Future features
- ### Direct messaging
- ### Notifications
- ### Secure payment integrations

## Code Highlights
The Following are code snippets that help build the core functionality for this application.

### Backend Google Maps API Geocoding
Using express we made calls to various Google Maps API's in order to facilitate:
1. Autocomplete Address Search 
2. Geocoding of address's for Latitude, and Longitude
``` javascript
//routes/api/tasks.js
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTaskInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const unFrozenParser = backendUtil.pullKeys(req.user);

    // Connecting to Google's Geocoding API, and receiving an origins Latitude, and Longitude
    // Along with their address.
    // This is used in conjuction with an Google address autocomplete library and API in order to get addresses
    geocodeUtil.parseAddress(req.body.deliveryAddress).then(
      (gMapsResponse) => {
        const newTask = new Task({
          type: req.body.type,
          details: req.body.details,
          requester: unFrozenParser,
          deliveryAddress: gMapsResponse.data.results[0].formatted_address,
          deliveryLatLong: Object.values(gMapsResponse.data.results[0].geometry.location),
          deliveryNeighborhood: gMapsResponse.data.results[0].address_components[2].short_name,
          deliveryInstructions: req.body.deliveryInstructions,
        });

        newTask.save()
          .then((task) => res.json(task))
          .catch(err => res.json(err))
      },
    )
      .catch(err => res.json(err));
});
```

### Frontend MapBox API popups
Here the object ``` const geojson ``` which holds the data, and attributes of our Mapbox API template is allowed 
access to popups. Its the foundation for the visual connection between our tasks in our side bar and our map.
Since we are dealing with React architecture, we treated our SideBar Component, and or Map component as our two main features. Both of which branch down from our Main Component, and since we are using redux we are able to give each their own container for access to global state.
``` javascript
// frontend/components/map/map.jsx
geojson.features.forEach((marker) => {
      // create a HTML element for each feature
      const el = document.createElement('div');
      const { status, type } = marker.properties
      if (status === 0) {
        el.className = 'marker notActive'
      } else if (status === 1) {
        el.className = 'marker active'
      } else if (status === 2) {
        el.className = 'marker completed'
      }
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
        className: statusPopupClass(status)
      }).setHTML(
        `${type} delivery${`<br />`}${typeIconString(type.toLowerCase(), status)}`
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
```

### Sorting Distances
In order to get our Distances sorted for the user by closes task, we added a Util thats natively built into Javascript which using HTML its own built in HTML geolocator.
``` javascript
// frontend/actions/location_actions.js
export const getUserLocation = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition((pos) => {
    return  dispatch(receiveUserLocation(pos))
  }
)};
```

We wait for our results within a ```componentDidUpdate```.
While waiting asychronously for our results we use react-bootstrap to have a loading icon. Once received we calculate the distance for each task using the Latitude, and Longitude with the turf.js library, we add it to the task object, and reset it back to global state. 
``` javascript
// frontend/components/sidebar/card.jsx
distanceFromCurrentToTask() {
    const { task, currentPosition } = this.props
    if (this.props.task === undefined) {
      return null
    }
    
    if (currentPosition.length === 0) {
      return null
    }
    const {latitude, longitude} = currentPosition.coords;
    
    let from = turf.point([longitude, latitude])
    let to = turf.point([task.deliveryLatLong[1], task.deliveryLatLong[0]])
    let options = { units: 'miles' }

    let distanceTo = turf.distance(from, to, options)
    const dist = frontendUtil.parseDistance(distanceTo)
    task['distance'] = dist
    this.props.receiveNewTask(task)
  }
 ```
Then we disptact the next action and send our information to a reducer, update our tasks which allows us to then grab them from global state, sort it, and pass it back down to our sidebar component. 

``` javascript 
//fronend/reducers/task_reducer.js
const convertToTasksObj = (tasks) => {
  const newTasks = {};
  tasks.forEach((t) => {
    newTasks[t._id] = t;
  })

  return newTasks;
}

const allTasksUpdate = (tasks, nextState) => {
  tasks.forEach((t) => {
    if (nextState[t._id] !== undefined) {
      // call function that replaces updated fields
      const updated = {
        ...nextState[t._id],
        ...t
      }
      nextState[t._id] = updated
    } else {
      nextState[t._id] = t
    }
  })
  return nextState;
}

const TasksReducer = (state = {}, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  // const nextState = state.slice()
  switch (action.type) {
    case RECEIVE_TASKS:
      if (Object.keys(nextState).length > 0) {
        nextState = allTasksUpdate(action.tasks.data, nextState);
      } else {
        nextState = convertToTasksObj(action.tasks.data)
      }
      return nextState
    case RECEIVE_NEW_TASK:
      if (nextState[action.task._id] !== undefined) {
        // call function that replaces updated fields
        const updated = {
          ...nextState[action.task._id],
          ...action.task
        }

        nextState[action.task._id] = updated
      } else {
        nextState[action.task._id] = action.task.data
      }
      return nextState
    default:
      return state
  }
}
```
