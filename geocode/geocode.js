const request = require('request')

const geocodeAddress = (address, callback) => {

  const reqOptions = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
    json: true
  }

  request(reqOptions ,
    (error, response, body) => {
      if (error) {
        callback(error.code + " Unable to connect to Google servers")

      } else if (body.status === "ZERO_RESULTS") {
        callback('No results found')

      } else if (body.status === "OK") {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude : body.results[0].geometry.location.lat,
          longitude : body.results[0].geometry.location.lng
        })

      }
  })
}

module.exports = {
  geocodeAddress
}
