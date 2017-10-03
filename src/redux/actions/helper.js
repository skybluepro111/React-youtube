require('es6-promise').polyfill();

import axios from 'axios';

const debug = process.env.DEBUG_NODE ? 'http://localhost:8080' : null;

export default function helperQuery(url, type, response, objectToSend, toDelete) {
  if (debug && url.charAt(0) === '/') url = debug + url;
  return (dispatch) => {
    const promise = (!objectToSend) ?
      axios.get(url) : (!toDelete) ?
      axios.post(url, objectToSend) : axios.delete(url);
    return promise
      .then((result) => {
        if (result.data.errors) {
          dispatch({
            type,
            error: result.data.errors,
          });
          return;
        }
        dispatch({
          type,
          result: response ? result.data[response] : result.data,
        });
      });
  };
}
