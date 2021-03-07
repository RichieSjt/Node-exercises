const api_keys = require('./api_keys.js')
const request = require('postman-request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=' + api_keys.WEATHER_API_KEY + '&query=' + latitude + ',' + longitude

    // Destructuring response into body
    request({url, json: true}, (error, {body} = {}) =>{
        if(error){
            callback('Unable to connect to weather stack service.', undefined)
        }else if (body.error){
            callback(body.error.info, undefined)
        }else{
            const temperature = body.current.temperature
            const feels_like_temperature = body.current.feelslike
            const weather_descriptions = body.current.weather_descriptions
            const humidity = body.current.humidity
            const wind_speed = body.current.wind_speed

            // callback(undefined, {
            //     temperature: temperature,
            //     feels_like_temperature: feels_like_temperature,
            //     weather_descriptions: weather_descriptions
            // })
            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + '° degrees out and it feels like ' + feels_like_temperature + '° degrees out. The wind speed is ' + wind_speed + ' km/h and the humidity is ' + humidity + '%.')
        }
    })
}

module.exports = forecast


/* // Getting current weather information
const wheather_stack_url = 'http://api.weatherstack.com/current?access_key=' + api_keys.WEATHER_API_KEY + '&query=New%20York'

request({url: wheather_stack_url, json: true}, (error, response) =>{
    if(error){
        console.log('Unable to connect to weather stack service.')
    }else if (response.body.error){
        console.log(response.body.error.info)
    }else{
        //console.log(response.body.current)
        const temperature = response.body.current.temperature
        const feels_like_temperature = response.body.current.feelslike
        const weather_descriptions = response.body.current.weather_descriptions

        console.log(weather_descriptions[0] + '. It is currently ' + temperature + '° degrees out and it feels like ' + feels_like_temperature + '° degrees out.')
    }
})
*/
