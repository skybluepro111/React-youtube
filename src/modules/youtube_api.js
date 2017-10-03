const axios = require('axios');

const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

module.exports = function (options, callback) {
  if (!options.key) {
    throw new Error('Youtube Search expected key, received undefined');
  }

  const params = {
    maxResults: options.maxResults || 20,
    part: 'snippet',
    key: options.key,
    q: options.term,
    type: 'video',
  };

  axios.get(ROOT_URL, { params })
    .then((response) => {
      if (callback) { callback(response.data.items); }
    })
    .catch((error) => {
      console.error(error);
    });
};
