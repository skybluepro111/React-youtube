const feed = require('feed-read');
const http = require('http');
const async = require('async');
const request = require('request');

const LIMIT = 20;
const UNABLE_TO_CONNECT = 'Unable to connect.';
const MENEAME_URL = 'https://www.meneame.net/rss';
// var BBC_URL = 'http://feeds.bbci.co.uk/news/rss.xml';
// var SKY_URL = 'http://news.sky.com/feeds/rss/home.xml';

module.exports = function (app, config, query) {
    // Get All
  app.get('/news', (req, res) => {
    feed(MENEAME_URL, (err, articles) => {
      let i = 0;
      const result = [];
      articles.forEach((entry) => {
        if (i == LIMIT) return;
        result.push({
          link: entry.link,
          title: entry.title,
        });
        i++;
      });
      res.status(200).send({ news: result });
    });
  });
};
