const http = require('http')
const path = require('path');
const api_keys = require(path.join(__dirname, '..', '..', 'weather-app', 'utils', 'api_keys.js'))

const url = 'http://api.weatherstack.com/current?access_key=' + api_keys.WEATHER_API_KEY + '&query=40,-75'

const request = http.request(url, (response) =>{
    let data = ''

    // Receiving chunks from the response
    response.on('data', (chunk) => {
        console.log(chunk)
        data += chunk.toString()
    })
    // Parsing the string once we receive all of the response's chunks
    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('An errro ocurred', error)
})

request.end();