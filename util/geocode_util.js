const axios = require ('axios');
const geocodeKey = require('../config/keys_geocode');

module.exports = {
    parseAddress: address => {
        let addr = address.split(' ').join('+');

        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${geocodeKey.key}`)
            .then(res => (
                Object.values(res.data.results[0].geometry.location))
            )
    }
}