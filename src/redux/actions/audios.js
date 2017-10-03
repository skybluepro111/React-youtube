import {
  ALL_AUDIOS,
  CREATE_AUDIO,
} from './actionTypes';
import helperQuery from './helper';

function createPretAudio(author_id, variables) {
  const url = `/user/${author_id}/audio`;
  const type = CREATE_AUDIO;
  const response = 'file';
  return helperQuery(url, type, response, variables);
}

module.exports = {
  createPretAudio,
};
