![logo](frontend/src/public/COVID415.png)
# COVID415


###### [Live Site](http://covid415.herokuapp.com/#)

## Table of Contents

* [Creators](#creators)
* [Background](#background)
* [Technologies](#technologies)
* [Features](#features)
* [Code Snippets](#code-snippets)

---

## Creators

###### [Jump to Background](#background)

* [Andrew Howell](https://www.linkedin.com/in/andrewhhowell/)
* [Justin Fang](https://www.linkedin.com/in/justinjfang/)
* [Tarik Gul](https://www.linkedin.com/in/tarik-gul-6497b21a4/)
* [Zeke Mostov](https://www.linkedin.com/in/zeke-mostov-62557620/)

---

## Background
###### [Jump to Technologies](#technologies)


__tl;dr__  [COVID415](http://covid415.herokuapp.com/#/) is a service that matches San Franciscans in self-isolation due to the novel coronavirus 2019-nCoV (also known as COVID-19) pandemic with local volunteers to deliver essentials like food and medicine.

![home](frontend/public/homepage.png "COVID415")

###### Interface

The site affords users the ability to both post a request for help from a volunteer, as well as volunteer to help themselves. Volunteers can take on delivery requests (which are conveniently sorted by distance away), view their pending delivery requests, and confirm they have carried out the delivery.

Visually, the App is centered around a map and a red, yellow, green color theme. Features related to different stages of task completion embrace this intuitive color scheme to relay a sense of urgency for yet to be claimed/completed tasks and provide a feeling of accomplishment for completed tasks. For example, red markers indicate tasks that have yet to have a volunteer take them on, yellow markers are pending tasks, and green markers indicate tasks that have been completed. Yellow and green markers are only visible to the logged in volunteer and reference their task portfolio.


### Technologies

* Front-end:
  * React
  * Redux
  * Axios
* Back-end
  * Express
  * MongoDB
  * JWT
  * Passport
* Cloud:
  * Heroku
* Integrations:
  * Google Maps Geoencoding API
  * Google Maps Distance Matrix API
  * MapBox

### Features

##### View delivery requests
###### [Jump to Next Feature Highlight](#manage-your-deliveries)
_An interactive list and map show all delivery requests sorted by distance away. Users can browse requests and accept a request._

![accept_delivery](frontend/public/accept_delivery.gif "Accept Delivery")

##### Manage your deliveries
###### [Jump to Next Feature Highlight](#request-a-delivery)
_A separate tab allows users to view and manage all the delivery requests that they've accepted._

![complete_delivery](frontend/public/complete_delivery.gif "Complete Delivery")

##### Request a delivery 
###### [Jump to Future features ](#future-features)
_As a user under self-isolation, you can request a delivery which will be added to the list and map._

![request_task](frontend/public/request_task.gif "Request Task")

##### Future features

* Direct messaging
* Notifications
* Secure payment integrations

## Code Snipets

##### Backend Google Maps API Geocoding
###### [Jump to Next Code Snippet](#frontend-mapbox-api-popups)

Using express we made calls to various Google Maps API's in order to facilitate:

1. Autocomplete Address Search

2. Address formatting for incomplete / mal-formed address input

3. Tagging of neighborhood data against request addresses

4. Geoencoding of address' Latitude and Longitude

``` javascript
// routes/api/tasks.js
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTaskInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const unFrozenParser = backendUtil.pullKeys(req.user);

    // Connecting to Google's Geocoding API, and receiving an origins Latitude,
    // and Longitude along with their address. This is used in conjuction with
    // Google's address autocomplete library and API in order to help the user
    // provide valid street addresses
    geocodeUtil.parseAddress(req.body.deliveryAddress).then(
      (gMapsResponse) => {
        const newTask = new Task({
          type: req.body.type,
          details: req.body.details,
          requester: unFrozenParser,
          deliveryAddress: gMapsResponse.data.results[0].formatted_address,
          deliveryLatLong: 
            Object.values(gMapsResponse.data.results[0].geometry.location),
          deliveryNeighborhood: 
            gMapsResponse.data.results[0].address_components[2].short_name,
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

#### MapBox Marker Popups
###### [Jump to Next Code Snippet](#sorting-distances)

In order to display markers on the map and show popups for each marker on hover of the marker or the associated task card in the left sidebar, we utilized the MapBox Marker and associated Popup API. The markers and popups are then styled to communicate their respective status in a task's lifecycle (i.e., unmatched->pending delivery->completed).

``` javascript
// frontend/components/map/map.jsx
geojson.features.forEach((marker) => {

      // Create a HTML element for each feature
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

      // Make a marker for each feature and add to the map
      const mapBoxMarker = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(popup)

      // Add mapBox marker and associated id to array
      allMarkers.push({ mBMarker: mapBoxMarker, id: marker.properties.taskId });

      // Get HTML element of marker and attach an event listener so we can
      // detect when a mouse enters or leaves
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

#### Sorting Distances

##### Overview
In order to motivate task uptake and completion by volunters, tasks are sorted by their relative distance to the current user.

__Current implementation flow:__

* Wait for current user location.
* Once user location is received dispatch to state.
* When a change in user location is detected in componentDidUpdate calculate distance from user for each task.
* Upon tasks receiving a non-null distance attribute, trigger a sort of tasks by location.

__Future improvements:__
  At the moment all of the above flow takes place within React components. Therefore, the execution of each step is dependent on components mounting, and updating. For example, we check if task's have distance in order to sort them.

##### Code

In order to grab the current users position, we used the built-in ```navigator.geolocation.getCurrentPosition()```.

``` javascript
// frontend/actions/location_actions.js
export const getUserLocation = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition((pos) => {
    return  dispatch(receiveUserLocation(pos))
  }
)};
```

We wait for our results within a ```componentDidUpdate``` lifecycle method.
While waiting asychronously for our results we present a loading icon. Once the results are received, we calculate the distance for each task using difference in Lat/Long via the turf.js library. We then add it to the task object, and set the difference back in the global store.

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
    const from = turf.point([longitude, latitude])
    const to = turf.point([task.deliveryLatLong[1], task.deliveryLatLong[0]])
    const options = { units: 'miles' }
    const distanceTo = turf.distance(from, to, options)
    const dist = frontendUtil.parseDistance(distanceTo)
    task['distance'] = dist
    this.props.receiveNewTask(task)
  }
 ```

Next, we dispatch the next action and send our information to a reducer which updates our tasks and allows us to then grab them from global state, sort, and pass them back down to our SideBar component. 

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
