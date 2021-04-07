const request = require("request")

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=e62712f06a00eda1079aa6307ef85ae1&query=" + lat + "," + long;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to process request", undefined)
        }
        else if (response.body.error) {
            callback("Given location not found", undefined);
        }
        else {
            console.log(response.body)
            callback(undefined, response.body.current.weather_descriptions[0] + ". It's currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees." + "There is " + response.body.current.precip + "% chance of precipitation with a humidity of " + response.body.current.humidity + "%.");
        }
    })
}
module.exports = forecast