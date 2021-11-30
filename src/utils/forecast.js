const request = require('request');
// const url =
//   'http://api.weatherstack.com/current?access_key=c491ac40880676097a618afcbe3847aa&query=51.160522,71.470360&units=m';

// request({ url, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to weather service');
//   } else if (response.body.error) {
//     console.log('Unable to find location');
//   } else {
//     const { temperature, feelslike, weather_descriptions } =
//       response.body.current;
//     console.log(
//       `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`
//     );
//   }
// });

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c491ac40880676097a618afcbe3847aa&query=${encodeURIComponent(
    lat
  )},${encodeURIComponent(long)}&units=m`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      const data = {
        description: weather_descriptions[0],
        temperature,
        feelslike,
      };
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
