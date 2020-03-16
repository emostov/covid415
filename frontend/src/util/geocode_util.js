import axios from 'axios';
// const geocodeKey = require('../../../config/keys_geocode');
import geocodeKey from '../config/keys_geocode';

const parseAddress = address => {
    let addr = address.split(' ').join('+');

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${geocodeKey.key}`)
        .then(res => (
            Object.values(res.data.results[0].geometry.location))
        )
};

export default parseAddress;