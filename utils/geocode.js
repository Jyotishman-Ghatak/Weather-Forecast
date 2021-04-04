const request = require("request")

const geocode = (address, callback) => {
    const url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoianlvdGlzaG1hbmdoYXRhayIsImEiOiJja2xsNmhheHEwNjcxMnFxaGRnMmUwNjE0In0.LepPz9yKMwZpeEdiAk2Tww&limit=2"
    request({ url: url2, json: true }, (error, response) => {
        if (error) {
            callback("Unable to process request", undefined)
        }
        else if (response.body.features.length === 0) {
            callback("Given location not found", undefined);
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    })
}
module.exports = geocode