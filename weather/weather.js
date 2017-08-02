const request = require('request')

const getWeather = (lng, lat, callback) => {

  const requestOptions = {
    url: `https://api.darksky.net/forecast/e3b4b75309a6673952635648623fcefd/${lng},${lat}`,
    json: true
  }

  request(requestOptions, (error, response, body) => {
    !error && response.statusCode === 200 ?
      callback(undefined, {
        temperature : body.currently.temperature,
        apparentTemperature : body.currently.apparentTemperature
      })
      :
      callback('Unable to find weather')
  })
}

const convert = (temp) => {
  let conversion = (temp - 32) * 5/9
  return Math.round(conversion * 100) / 100
}

module.exports = {
  getWeather,
  convert
}
