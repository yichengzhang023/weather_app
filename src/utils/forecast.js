const request = require('request')
// const url = '37.8267,-122.4233'

const forecast = (latitude, longtitude, callback) => {
    forcastUrl = 'https://api.darksky.net/forecast/fc4e90d39d19f68c8aabf68dc8b3e4fb/' + latitude + ',' + longtitude + '?exclude=minutely,hourly,daily,alerts,flags&units=si'
    request({
        url:forcastUrl,
        json:true
    },(error,response)=>{
        if (error) {
            callback('Network Error',undefined)
        } else if (!response.body.error) {
            callback(undefined,{
                temperature: response.body.currently.temperature,
                probability_to_rain: response.body.currently.precipProbability
            })
        } else {
            callback('Location Not Found',undefined)
        }
    })
}

module.exports = forecast