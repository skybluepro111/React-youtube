import {
  ALL_TAGS,
  REMOVE_TAG,
  CREATE_TAG,
} from './actionTypes';
import helperQuery from './helper';

// Tags
function getTags() {
  const url = '/tags';
  const type = ALL_TAGS;
  const response = 'tags';
  return helperQuery(url, type, response);
}

function createTag(variables) {
  const url = '/tags';
  const type = CREATE_TAG;
  const response = 'tag';
  return helperQuery(url, type, response, variables);
}

function removeTag(variables) {
  const url = `/tags/${variables._id}`;
  const type = REMOVE_TAG;
  const response = 'tag';
  return helperQuery(url, type, response, variables, true);
}

module.exports = {
  getTags,
  createTag,
  removeTag,
};
