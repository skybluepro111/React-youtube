import {
  ALL_NEWS,
} from './actionTypes';
import helperQuery from './helper';

function getNews(variables) {
  const url = '/news';
  const type = ALL_NEWS;
  const response = 'news';
  return helperQuery(url, type, response, variables);
}

module.exports = {
  getNews,
};
