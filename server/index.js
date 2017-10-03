import React from 'react';
import { renderHTMLString } from '@sketchpixy/rubix/lib/node/redux-router';
import CustomRubixAssetMiddleware from './middleware';
import routes from '../src/routes';

module.exports = function (app, config) {
  // LOCALE
  app.get('/lang/:locale', (req, res) => {
    res.cookie('int_lang', req.params.locale);
    res.redirect(req.headers.referer);
  });

  // INIT ================================
  app.get('/', (req, res, next) => {
    res.render('landing/index');
  });

  const auth = function (req, res, next) {
    const noAuth = function () {
      console.log('no user', req.session);
      return res.redirect('/login');
    };
    return (req.session && req.session.user) ? next() : noAuth();
  };

  // REACT ===============================
  function renderHTML(req, res) {
    renderHTMLString(routes, req, (error, redirectLocation, data) => {
      if (error) {
        console.log('[renderHTML] Error, site or file does not exist');
        res.render('login/login', {
          message: error.Error,
        });
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else {
        res.render('app/index', {
          content: data.content,
          data: JSON.stringify(data.data).replace(/\//g, '\\/'),
        });
      }
    });
  }

  app.get('*', auth, CustomRubixAssetMiddleware(), (req, res, next) => {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    console.log('[* React]', (req.session.user && req.session.user.im) ? `[User${req.session.user.im._id}]` : '[No user]', fullUrl);
    renderHTML(req, res);
  });
};
