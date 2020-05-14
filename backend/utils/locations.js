const axios = require('axios');

const HttpError = require('../models/http-error');

// const API_KEY = 'My Api-Key';
// Alternative of google api here.com which is free for use without credit card

async function getCoordsForAddress(address) {
  return {
    lat: 40.7484474,
    lng: -73.98715
  }; //this return because I didn't have a credit card.
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
