import ActionTypes from '../actions/actionTypes';
import customStateSwitcher from './helper';

const posts = customStateSwitcher(ActionTypes.SINGLE_POST, ActionTypes.ALL_POSTS, ActionTypes.CREATE_POST, ActionTypes.EDIT_POST, ActionTypes.REMOVE_POST);
const users = customStateSwitcher(ActionTypes.SINGLE_USER, ActionTypes.ALL_USERS, ActionTypes.CREATE_USER, ActionTypes.EDIT_USER, ActionTypes.REMOVE_USER);
const prets = customStateSwitcher(ActionTypes.SINGLE_PRET, ActionTypes.ALL_PRETS, ActionTypes.CREATE_PRET, ActionTypes.EDIT_PRET, ActionTypes.REMOVE_PRET);
const exps = customStateSwitcher(ActionTypes.SINGLE_EXP, ActionTypes.ALL_EXPS, ActionTypes.CREATE_EXP, ActionTypes.EDIT_EXP, ActionTypes.REMOVE_EXP);
const audio = customStateSwitcher(null, ActionTypes.ALL_AUDIOS, ActionTypes.CREATE_AUDIO, null, null);
const news = customStateSwitcher(null, ActionTypes.ALL_NEWS, null, null, null);
const tags = customStateSwitcher(ActionTypes.SINGLE_TAG, ActionTypes.ALL_TAGS, ActionTypes.CREATE_TAG, ActionTypes.EDIT_TAG, ActionTypes.REMOVE_TAG);

const reducers = {
  posts,
  users,
  prets,
  exps,
  audio,
  tags,
  news,
};

module.exports = {
  ...reducers,
};
