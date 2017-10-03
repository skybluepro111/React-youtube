import exps from './exps';
import posts from './posts';
import prets from './prets';
import tags from './tags';
import users from './users';
import audio from './audio';
import news from './news';

module.exports = function (app, config, query) {
  users(app, config, query),
    exps(app, config, query),
    posts(app, config, query),
    prets(app, config, query),
    tags(app, config, query),
    audio(app, config, query),
    news(app, config, query);
};
