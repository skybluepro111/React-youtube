module.exports = function (app, config, query) {
    // Get All
  app.get('/exps', (req, res) => {
    (req.session.user && req.session.user.im.role === 1) ? query.getAll(res, 'Expression', 'exps') : res.redirect('/dashboard');
  });

    // Get AllById
  app.get('/user/:user_id/exps', (req, res) => {
    query.getAllbyAuthorId(res, req.params.user_id, 'Expression', 'exps');
  });

    // Get one
  app.get('/exps/:id', (req, res) => {
    query.getOne(res, req.params.id, 'Expression', 'exp');
  });

    // Create one
  app.post('/user/:userid/exps', (req, res) => {
    const expFrom = req.body.expFrom;
    const expTo = req.body.expTo;
    const object = query.setUser(req.session.user.im._id, { expFrom, expTo, completed: false });
    query.setOne(res, object, 'Expression', 'exp');
  });

    // Update one
  app.post('/exps/:id', (req, res) => {
    const id = req.params.id;
    if (!id) res.status(500).send({ status: 'Id needed' });
    const object = req.body;
    query.updateOne(res, id, object, 'Expression', 'exp');
  });

    // Delete one
  app.delete('/exps/:id', (req, res) => {
    const id = req.params.id;
    query.deleteOne(res, id, 'Expression', 'exp');
  });
};
