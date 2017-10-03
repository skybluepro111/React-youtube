import {
  ALL_POSTS,
  EDIT_POST,
  CREATE_POST,
  SINGLE_POST,
  REMOVE_POST,
} from './actionTypes';
import helperQuery from './helper';

function getPosts(userid) {
  const url = `/user/${userid}/posts`;
  const type = ALL_POSTS;
  const response = 'posts';
  return helperQuery(url, type, null);
}

function getPost() {
  const url = '/me';
  const type = SINGLE_POST;
  const response = 'post';
  return helperQuery(url, type, response);
}

function createPost(variables) {
  const url = '/api/todos/';
  const type = CREATE_POST;
  const response = 'post';
  return helperQuery(url, type, response, variables);
}

function updatePost(variables) {
  const url = `/api/todos/${variables._id}`;
  const type = EDIT_POST;
  const response = 'post';
  return helperQuery(url, type, response, variables);
}

function removePost(variables) {
  const url = `/api/todos/${variables._id}`;
  const type = REMOVE_POST;
  const response = 'post';
  return helperQuery(url, type, response, variables, true);
}

module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  removePost,
};
