module.exports = function (app, config, query) {
  //   // Get All by ADMIN
  // app.get('/prets', (req, res) => {
  //   (req.session.user && req.session.user.im.role === 1) ? query.getAll(res, 'Pret', 'prets') : res.redirect('/dashboard');
  // });

    // Get All publics
  app.get('/prets', (req, res) => {
    query.getAllPublish(res, 'Pret', 'prets');
  });

    // Get All by UserId
  app.get('/user/:userid/prets', (req, res) => {
    query.getPretsbyAuthorId(res, req.params.userid, 'Pret', 'prets');
  });

    // Get One by id
  app.get('/prets/:id', (req, res) => {
    query.getOne(res, req.params.id, 'Pret', 'pret');
  });

    // Create one
  app.post('/user/:userid/prets', (req, res) => {
    const newPret = {
      video: {
        id: req.body.video.id.videoId,
        thumb: req.body.video.snippet.thumbnails.high.url,
        title: req.body.video.snippet.title,
        desc: req.body.video.snippet.description,
      },
      duration: req.body.duration,
      audio: req.body.audio,
    };
      // Creating tags
    if (req.body.tags && req.body.tags.length) query.setTags(req.body.tags, newPret.video.id);
      // Check duration
    const timeleft = req.session.user.im.time - Math.floor(req.body.duration / 60);
    const object = query.setUser(req.session.user.im._id, newPret);
    query.setOne(res, object, 'Pret', 'pret', (pret) => {
      query.setUserAfterPret(req.session.user.im._id, pret._id.toString(), timeleft);
    });
  });

  // Update one
  app.post('/prets/:id', function(req, res) {
      var id = req.params.id;
      if (!id) res.status(500).send({status:"Id needed"});
      var object = req.body;
      if (object.feedback.to && object.feedback.new) {
        query.setFeedbackToUserId(object.feedback.to, object._id, function(user) {
          object.feedback.to = user;
          query.updateOne(res, id, object, 'Pret', 'pret');
          }) 
      } else {
        query.updateOne(res, id, object, 'Pret', 'pret');
      }
  });

    // Delete one
  app.delete('/user/:userid/prets/:id', (req, res) => {
    const id = req.params.id;
    if (!id) res.status(500).send({ status: 'Id needed' });
    query.deleteOne(res, id, 'Pret', 'pret');
  });
};
