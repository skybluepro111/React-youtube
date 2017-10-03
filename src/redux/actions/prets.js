import {
  ALL_PRETS,
  EDIT_PRET,
  CREATE_PRET,
  SINGLE_PRET,
  REMOVE_PRET,
} from './actionTypes';

require('es6-promise').polyfill();

import axios from 'axios';

import helperQuery from './helper';

function getPrets(userId) {
  const url = `/user/${userId}/prets`;
  const type = ALL_PRETS;
  const response = 'prets';
  return helperQuery(url, type, response);
}

function getPret(id) {
  const url = `/prets/${id}`;
  const type = SINGLE_PRET;
  const response = 'pret';
  return helperQuery(url, type, response);
}

// Admin Fn
function getAllPrets() {
  const url = '/prets';
  const type = ALL_PRETS;
  const response = 'prets';
  return helperQuery(url, type, response);
}

function createPret(author_id, variables) {
  const url = `/user/${author_id}/prets`;
  const type = CREATE_PRET;
  const response = 'pret';
  return helperQuery(url, type, response, variables);
}

function updatePret(variables) {
  var url = '/prets/' + variables._id;
  var type = EDIT_PRET;
  var response = 'pret';
  return helperQuery(url, type, response, variables);
}

function removePret(variables) {
  const url = `/user/${variables.user_id}/prets/${variables.pret._id}`;
  const type = REMOVE_PRET;
  const response = 'pret';
  axios.post(`/user/${variables.user_id}/audio/${variables.pret.audio}`, {
    pret_id: variables.pret._id.toString(),
    duration: variables.pret.duration,
  });
  return helperQuery(url, type, response, variables, true);
}

module.exports = {
  getPret,
  getAllPrets,
  getPrets,
  createPret,
  updatePret,
  removePret,
};
