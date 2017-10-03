import {
  ALL_USERS,
  EDIT_USER,
  CREATE_USER,
  SINGLE_USER,
  REMOVE_USER,
} from './actionTypes';
import helperQuery from './helper';

function getUsers() {
  const url = '/users';
  const type = ALL_USERS;
  const response = 'users';
  return helperQuery(url, type, response);
}

function getUser() {
  const url = '/me';
  const type = SINGLE_USER;
  const response = 'user';
  return { id: 1 };
}

function createUser(variables) {
  const url = '/api/todos/';
  const type = CREATE_USER;
  const response = 'user';
  return helperQuery(url, type, response, variables);
}

function updateUser(variables) {
  const url = `/api/todos/${variables._id}`;
  const type = EDIT_USER;
  const response = 'user';
  return helperQuery(url, type, response, variables);
}

function removeUser(variables) {
  const url = `/api/todos/${variables._id}`;
  const type = REMOVE_USER;
  const response = 'user';
  return helperQuery(url, type, response, variables, true);
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  removeUser,
};
