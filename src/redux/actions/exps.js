import {
  ALL_EXPS,
  EDIT_EXP,
  CREATE_EXP,
  SINGLE_EXP,
  REMOVE_EXP,
} from './actionTypes';
import helperQuery from './helper';

function getExps(user_id) {
  const url = `/user/${user_id}/exps`;
  const type = ALL_EXPS;
  const response = 'exps';
  return helperQuery(url, type, response);
}

function getAllExps() {
  const url = '/exps';
  const type = ALL_EXPS;
  const response = 'exps';
  return helperQuery(url, type, response);
}

function getExp(id) {
  const url = `/exps/${id}`;
  const type = SINGLE_EXP;
  const response = 'exp';
  return helperQuery(url, type, response);
}

function createExp(author_id, variables) {
  const url = `/user/${author_id}/exps`;
  const type = CREATE_EXP;
  const response = 'exp';
  return helperQuery(url, type, response, variables);
}

function updateExp(variables) {
  const url = `/exps/${variables._id}`;
  const type = EDIT_EXP;
  const response = 'exp';
  return helperQuery(url, type, response, variables);
}

function removeExp(variables) {
  const url = `/exps/${variables._id}`;
  const type = REMOVE_EXP;
  const response = 'exp';
  return helperQuery(url, type, response, variables, true);
}

module.exports = {
  getExp,
  getAllExps,
  getExps,
  createExp,
  updateExp,
  removeExp,
};
