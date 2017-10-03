const request = require('request');
// sign with default (HMAC SHA256)
// const jwt = require('jsonwebtoken');
const forums = require('../../constants').forums;

const ONE_MIN = 60 * 1000; /* ms */

module.exports = function (app, config, query) {
  // LOGIN ================================
  app.get('/login', (req, res, next) => {
    if (req.session.user) {
      res.redirect('/dashboard');
    } else {
      res.render('login/login.pug');
    }
  });

  app.post('/login', (req, res, next) => {
    const options = {
      uri: `${forums}/api/ns/login`,
      method: 'POST',
      json: {
        username: req.body.username,
        password: req.body.password,
      },
      rejectUnauthorized: false,
    };
    request(options, (err, httpResponse, body) => {
      if (err || body.message || body === 'Not Found') {
        console.error('login failed:', err, (body.message) ? body.message : body);
        return res.render('login/login.pug', {
          message: (body.message) ? body.message : body,
        });
      }
      console.log('login successful!, creating cookie');
        // var token = jwt.sign({ id: body.uid, username: body.username }, 'estoeslaostiapatxi');
      query.getOrCreateUser(body.uid, body.username, body.userslug, body.email, body.picture).then((IMuser) => {
        let tour = false;
          // check if is first time
        if (((new Date()) - new Date(IMuser.date)) < ONE_MIN) {
          tour = true;
          console.log('new user in the platform');
        }
        const user = {
          tour,
          im: IMuser,
          info: {
            cover: body['cover:url'],
            picture: body.picture,
          },
        };
        console.log('[login] User logged', user.im._id, user.im.ref.username);
        req.session.user = user;
        req.session.save();
        return res.redirect('/dashboard');
      });
    });
  });

  // SIGNUP ================================
  app.get('/signup', (req, res, next) => {
    res.render('login/signup.pug');
  });

  app.post('/signup', (req, res, next) => {
    const options = {
      auth: {
        bearer: '7da9f246-fa50-4fdd-986e-5d7fd6317c9b',
      },
      uri: `${forums}/api/v1/users`,
      method: 'POST',
      json: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        _uid: '2',
      },
    };
    request(options, (err, httpResponse, body) => {
      if (err || body.message) {
        console.error('signup failed:', err, body.message);
        return res.render('login/signup.pug', {
          message: body.message,
        });
      }
      console.log('signup successful!');
      return res.redirect('/signup_success');
    });
  });

  app.get('/signup_success', (req, res, next) => {
    res.render('login/signup_success');
  });

  // LOGOUT ==============================
  app.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
  });
};
