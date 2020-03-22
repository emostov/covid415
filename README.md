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

The site affords users the ability to both post request for volunteer help, as well volunteer to help themselves. Volunteers can take on delivery requests, (which are conveniently sorted by distance away,) view delivery there pending deliver requests, and confirm they have carried out the delivery.

Visually, the App is centered around a map and a red, yellow, green color theme. Features related to different stages of task completion embrace this intuitive color scheme to endow a sense of urgency for yet to be completed tasks and provide a feeling of accomplishment for completed tasks. For example: red markers indicate tasks that have yet to have a volunteer take them on, yellow markers are pending tasks, and green markers indicate tasks that have been completed. Green markers are only visible to the logged in volunteer.


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

2. Geoencoding of address's for Latitude, and Longitude

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

In order to display markers on the map and show popups for each marker on marker hover and on hover of the associated task card in the left sidebar, the MapBox marker and associated popup API where utilized. The markers and popups are given style to indicate respective status based on there associated task's status.

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

Task's distances from the current user are used to help show tasks that are nearby and motivate task uptake and completion by volunteers.

__Current implementation flow:__

* Wait for current user location.
* Once user location is received dispatch to state.
* When a change in user location is detected in componentDidUpdate calculate distance from user for each task and dispatch each task with updated distance to state
* Upon tasks receiving a non-null distance attribute, trigger a sort of tasks by location

__Bottleknecks & Future improvements:__

  At the moment all of the above flow takes place within react components. Therefore, the execution of each step is dependent on components mounting, and updating, and in some cases, rendering. For example, we check if task's have distance to sort them in a render method.

  To improve this in future, we plan on decoupling user location, task distance calculations, and task sorting from the components. Broadly speaking, we plan to have an array in state of task ids, that will hold order. Upon recieving a non-null user location trigger distance calculations for each task. When a task with an updated distance is dispatched, a check for the ability to sort the task id array will be triggered. Components rendering ordered tasks can simply reffer to the task id array in state.

##### Code

In order to grab the current users position, we used the built in ```navigator.geolocation.getCurrentPosition()```.

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
    const from = turf.point([longitude, latitude])
    const to = turf.point([task.deliveryLatLong[1], task.deliveryLatLong[0]])
    const options = { units: 'miles' }
    const distanceTo = turf.distance(from, to, options)
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
