module.exports = function (app, config, query) {
  app.get('/users', (req, res, next) => {
      query.getAll(res, 'User', 'users')
  });

  app.get('/me', (req, res, next) => {
    if (!req.session.user || !req.session.user.im) {
      res.status(200).send({});
    } else {
      query.getUserById(req.session.user.im._id, (user) => {
        console.warn('[me] ', req.session && req.session.user ? `Session ref:${req.session.user.im.ref.uid} time:${req.session.user.im.time} role:${req.session.user.im.role}` : 'No session');
        req.session.user.im = user;
        res.status(200).send(req.session.user ? req.session.user : {});
      });
    }
  });
};
