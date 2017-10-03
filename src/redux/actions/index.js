import users from './users';
import prets from './prets';
import posts from './posts';
import audios from './audios';
import exps from './exps';
import tags from './tags';
import news from './news';

module.exports = {
  ...users,
  ...prets,
  ...posts,
  ...audios,
  ...exps,
  ...tags,
  ...news,
};
