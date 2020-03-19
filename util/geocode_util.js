const axios = require('axios');
const  { geocodeKey }  = require('../config/keys')

module.exports = {
  parseAddress: (address) => {
    const addr = address.split(' ').join('+');

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${geocodeKey}`)
      .then((res) => (
        Object.values(res.data.results[0].geometry.location)));
  },
  parseDestination: (origin, destination) => {
    const ori = origin.join('')
    const dest = destination.join('%2C')

    return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${ori}&destinations=${dest}&key=${geocodeKey}`)
      .then(res => (
      Object.values(res.rows.elements.distance.text)))
  }
};
