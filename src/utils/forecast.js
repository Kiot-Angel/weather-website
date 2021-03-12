const fetch = require('node-fetch')


forecast = (latitude,longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a71c87543ea5464de7a819e7d410c804&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}+&units=f`
    fetch(url,{method: 'GET'})
    .then(data => data.json())
    .then(res => {
        if (res.error) { 
            callback('Unable to find Location !', undefined)
        } else {
            callback(undefined, `${res.current.weather_descriptions} with ${res.current.humidity} % Humidity.
            It is currently ${res.current.temperature}  fehraneit out. It feels like ${res.current.feelslike} fehraneit out`)
        }
    })
    .catch(err => console.error('OOPS! Unable to connect with Network',err));
}





module.exports = forecast