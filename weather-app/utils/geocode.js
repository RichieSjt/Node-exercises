const api_keys = require('./api_keys.js')
const request = require('postman-request')

const geocode = (address, callback) =>{
    const map_box_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + api_keys.MAP_BOX_TOKEN + '&limit=1'

    request({url: map_box_url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }else{
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const location = response.body.features[0].place_name
            
            callback(undefined, {
                latitude: latitude, 
                longitude: longitude,
                location: location 
            })
        }
    })
}

module.exports = geocode

/*
// Getting latitude and longitude coordinates from a place
const map_box_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Paris.json?access_token=' + api_keys.MAP_BOX_TOKEN + '&limit=1'

request({url: map_box_url, json: true}, (error, response) =>{
    if(error){
        console.log('Unable to connect to map box service.')
    }else if (response.body.features.length === 0){
        console.log('Unable to find location. Try another search.')
    }else{
        const name = response.body.features[0].place_name
        const lat = response.body.features[0].center[1]
        const long = response.body.features[0].center[0]

        console.log(name)
        console.log('Latitude: ' + lat)
        console.log('Longitude: ' + long + "\n")
    }
}) */
