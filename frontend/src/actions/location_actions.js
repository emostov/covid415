export const RECEIVE_CURRENT_LOCATION = 'RECEIVE_CURRENT_LOCATION'

export const receiveUserLocation = data => {
    return {
        type: RECEIVE_CURRENT_LOCATION,
        data
    } 
} 

export const getUserLocation = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition((pos) => {
    return  dispatch(receiveUserLocation(pos))
  }
)}

