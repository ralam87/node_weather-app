const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)

  } else {
    console.log(results.address)

    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      errorMessage ?
        console.log(errorMessage)
        :
        console.log(`The current temparature is ${weatherResults.temperature}, but feels like ${weatherResults.apparentTemperature}`)
    })
  }
})
