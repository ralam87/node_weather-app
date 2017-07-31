const request = require('request')
const yargs = require('yargs')

const aOptions = {
  demand : true,
  alias : "address",
  describe : "Address to fetch weather for",
  string : true
}

const argv = yargs
  .options({
    a : aOptions
  })
  .help()
  .alias('help', 'h')
  .argv

const reqOptions = {
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}`,
  json: true
}

request(reqOptions ,
  (error, response, body) => {
    if (error) {
      console.log(error.code + " Unable to connect to Google servers")
    } else if (body.status === "ZERO_RESULTS") {
      console.log('No results found')
    } else if (body.status === "OK") {
      console.log(`Searching for : ${body.results[0].formatted_address}`)
      console.log("Latitude : " + body.results[0].geometry.location.lat)
      console.log("Longitude : " + body.results[0].geometry.location.lng)
    }
})
