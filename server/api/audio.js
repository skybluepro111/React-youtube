const fs = require('fs');

module.exports = function (app, config, query) {
    // CREATES AUDIO ==============================
  app.post('/user/:userid/audio', (req, res, next) => {
    const buf = new Buffer(req.body.blob, 'base64'); // decode
    const name = `${req.session.user.im._id}_${(new Date()).getTime()}.wav`;
    console.log('[newAudio]', name);
    fs.writeFile(`./audios/${name}`, buf, (err) => {
      if (err) { console.log('err', err); } else {
        return res.json({
          status: 'success',
          file: name,
        });
      }
    });
  });

    // Delete audio
  app.post('/user/:userid/audio/:id', (req, res) => {
    const id = req.params.id;
    query.findPretAndUpdateUser(req.session.user.im, req.body.pret_id, req.body.duration);
    console.log('[delAudio]', id);
    if (!id) res.status(500).send({ status: 'Id needed' });
    try {
      fs.unlinkSync(`./audios/${id}`, (err) => {
        (err) ? console.log('err', err) : console.log('deleting', id);
      });
    } catch (err) {
      console.log('file was not there (already deleted)');
    }
  });
};
