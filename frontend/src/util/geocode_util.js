const axios = require('axios');
const mapKeys = require('../config/keys_mapbox')

module.exports = {
    parseDestination: (origin, destination) => {
        
        const ori = origin.join('')
        const dest = [destination[1], destination[0]]
        const finalDest = dest.join('%2C')

        return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${ori}&destinations=${dest}&key=${mapKeys.distanceMatrixKey}`)
            .then(res => (res))
    },

}