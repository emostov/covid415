import axios from 'axios';
// const mapboxKeys = require('../../../config/keys_geocode');
// import geocodeKey from '../../../config/keys_geocode';

export const parseAddress = address => {
    let addr = address.split(' ').join('+');
    let coords = [];

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyDsGMoUwaDuVAoiYUH7edAUr2i_adeeH-s`)
        .then(res => console.log(Object.values(res.data.results[0].geometry.location)))
};