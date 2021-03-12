const fetch = require('node-fetch')

 const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZm9yZnJlZWlkIiwiYSI6ImNrbTA1Nzd6MjFvanIydm13dDJhb2tqODkifQ.i1dPg6JPi5zUaVXvUy3nzw&limit=1'

    fetch(url, {method: 'GET'})
    .then(res => res.json())
    .then(res => {
        if(res.features.length === 0){
            callback('Unable to find location, Try Another Search', undefined)
        }
        else{
           callback(undefined, {
                latitude:   res.features[0].center[1],
                longitude:  res.features[0].center[0],
                location:  res.features[0].place_name
            })
        }
    })
    .catch(err => 
    callback('Unable to Connect to location Services', undefined)
    )
}

module.exports = geoCode