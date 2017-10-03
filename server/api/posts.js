const request = require('request');
const async = require('async');
const forums = require('../../constants').forums;

module.exports = function (app, config, query) {
  function httpGet(url, callback) {
    const options = {
      url,
      json: true,
    };
    request(options,
      (err, res, body) => {
        callback(err, body);
      },
    );
  }

  function postFilter(posts) {
    // general topics
    const aux = posts[0].categories.map(category => ({
      cid: category.cid,
      name: category.name,
      image: forums + category.image,
      items: category.totalPostCount,
      description: category.description,
      posts: category.posts,
    }));
    const gral = {
      url: `${forums}/${posts[0].url}`,
      categories: aux,
    };
    // user
    const user = {
      posts: posts[1].posts,
    };
    return [gral, user];
  }

  app.get('/user/:userid/posts', (req, res, next) => {
    if (!req.params.userid) {
      res.status(200).send({});
      return;
    }
    const urls = [
      `${forums}/api/`,
      `${forums}/api/user/${req.params.userid}`,
    ];
    async.map(urls, httpGet, (err, jsonCombined) => {
      if (err) return console.log(err);

      res.status(200).send(postFilter(jsonCombined));
    });
  });
};
