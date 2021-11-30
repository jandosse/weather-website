const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiamFuZG9zc2UiLCJhIjoiY2t3Z2N2bDlqMGI4czJ1bWwzcnNxYmx6NCJ9.zm2toVfBznGCZAgoAZ2yJg&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to geocoding service');
    } else if (body.features.length === 0) {
      callback('Unable to find geolocation. Try another search address');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

// const mapUrl =
//   'https://api.mapbox.com/geocoding/v5/mapbox.places/Nur-Sultan.json?access_token=pk.eyJ1IjoiamFuZG9zc2UiLCJhIjoiY2t3Z2N2bDlqMGI4czJ1bWwzcnNxYmx6NCJ9.zm2toVfBznGCZAgoAZ2yJg&limit=1';

//   request({ url:mapUrl, json: true }, (error, response) => {
//     if (error) {
//       console.log('Unable to connect to geocoding service');
//     } else if (response.body.features.length === 0) {
//       console.log('Unable to find geolocation');
//     } else {
//       const { center } = response.body.features[0];
//       const latitude = center[1];
//       const longitude = center[0];
//       console.log(`Latitude ${center[1]}. Longitude ${center[0]}`);
//     }
//   });
