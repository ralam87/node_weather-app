const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const aOptions = {
  demand : true,
  alias : "address",
  describe : "Address to fetch weather for",
  string : true
}

const formatOptions = {
  demand : false,
  alias : "format",
  describe : "Whether you want the temperature in celsius",
  boolean : true
}

const argv = yargs
  .options({
    a : aOptions,
    f : formatOptions
  })
  .help()
  .alias('help', 'h')
  .argv

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)

  } else {
    console.log(results.address)

    weather.getWeather(results.longitude, results.latitude, (errorMessage, weatherResults) => {
      errorMessage ?
        console.log(errorMessage)
        :
        argv.format ?
        console.log(`The current temparature is ${weather.convert(weatherResults.temperature)} degrees celsius, but feels like ${weather.convert(weatherResults.apparentTemperature)} degrees celsius`)
        :
        console.log(`The current temparature is ${weatherResults.temperature} fahrenheit, but feels like ${weatherResults.apparentTemperature} fahrenheit`)
    })
  }
})
