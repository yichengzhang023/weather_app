const request = require('request')

const geoCode = (address,callback) => {
    const geoCodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZXppbzAyMyIsImEiOiJjanRjcHJxc3cwejJpNDZwN29hc2VnN2ZuIn0.-mPCVTuoBJ-MBHBFolFn7w'
    request({
        url:geoCodingUrl,
        json:true
    },(error,response)=>{
        if (error) {
            callback('Network Error',undefined)
        } else if (response.body.features !== 0 ) {
            callback(undefined,{
                longtitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        } else {
            callback('Location Not Found',undefined)
        }
    })
}

module.exports = geoCode