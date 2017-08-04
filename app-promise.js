const yargs = require('yargs')
const axios = require('axios')

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

  const encodedAddress = encodeURIComponent(argv.address)

  const geocodeURL =  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

  axios.get(geocodeURL).then((response)=>{
    if (response.data.status === "ZERO_RESULTS") {
      throw new Error('Unable to find that address')
    }

    const lat = response.data.results[0].geometry.location.lat
    const lng = response.data.results[0].geometry.location.lng

    const weatherURL = `https://api.darksky.net/forecast/e3b4b75309a6673952635648623fcefd/${lat},${lng}`
    console.log(response.data.results[0].formatted_address)

    return axios.get(weatherURL).then((response => {

      const temperature = response.data.currently.temperature
      const apparentTemperature = response.data.currently.apparentTemperature

      argv.format ?
      console.log(`It's currently ${weather.convert(temperature)} celsius. It feels like ${weather.convert(apparentTemperature)} celsius though`)
      :
      console.log(`It's currently ${temperature}F. It feels like ${apparentTemperature}F though`)
    }))
  }).catch((error) => {
    if (error.code === "ENOTFOUND"){
      console.log("Unable to connect to API Servers")
    } else {
      console.log(error.message)
    }
  })
