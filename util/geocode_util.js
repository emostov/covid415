const axios = require('axios');
const  { geocodeKey }  = require('../config/keys')

module.exports = {
  parseAddress: (address) => {
    const addr = address.split(' ').join('+');

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${geocodeKey.key}`)
      .then((res) => (
        Object.values(res.data.results[0].geometry.location)));
  },
};
