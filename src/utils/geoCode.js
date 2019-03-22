const request = require('request')

const geoCode = (address, callback) => {
    const geoCodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZXppbzAyMyIsImEiOiJjanRjcHJxc3cwejJpNDZwN29hc2VnN2ZuIn0.-mPCVTuoBJ-MBHBFolFn7w'
    request({
        url: geoCodingUrl,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Network Error', undefined)
        } else if (body.features.length === 0) {
            callback('Location Not Found', undefined)
        } else {
            callback(undefined, {
                longtitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode