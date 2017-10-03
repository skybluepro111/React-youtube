const request = require('request');

module.exports = function (app, config) {
  app.get('/slack', (req, res) => {
        // res.setLocale(config.locale);
    res.render('slack/index', {
      community: config.community,
      tokenRequired: !!config.inviteToken,
    });
  });

  app.get('/slack/invite', (req, res) => {
        // res.setLocale(config.locale);
    res.render('slack/index', {
      community: config.community,
      tokenRequired: !!config.inviteToken,
    });
  });

  app.post('/slack/invite', (req, res) => {
    if (req.body.email && (!config.inviteToken || (!!config.inviteToken && req.body.token === config.inviteToken))) {
      request.post({
        url: `https://${config.slackUrl}/api/users.admin.invite`,
        form: {
          email: req.body.email,
          token: config.slacktoken,
          set_active: true,
        },
      }, (err, httpResponse, body) => {
            // body looks like: {"ok":true} || {"ok":false,"error":"already_invited"}
        if (err) { return res.send(`Error:${err}`); }
        body = JSON.parse(body);
        if (body.ok) {
          res.render('slack/result', {
            community: config.community,
            message: `Success! Check &ldquo;${req.body.email}&rdquo; for an invite from Slack.`,
          });
        } else {
          let error = body.error;
          if (error === 'already_invited' || error === 'already_in_team') {
            res.render('slack/result', {
              community: config.community,
              message: `${'Success! You were already invited.<br>' +
                            'Visit <a href="https://'}${config.slackUrl}">${config.community}</a>`,
            });
            return;
          } else if (error === 'invalid_email') {
            error = 'The email you entered is an invalid email.';
          } else if (error === 'invalid_auth') {
            error = 'Something has gone wrong. Please contact a system administrator.';
          }

          res.render('slack/result', {
            community: config.community,
            message: `Failed! ${error}`,
            isFailed: true,
          });
        }
      });
    } else {
      const errMsg = [];
      if (!req.body.email) errMsg.push('your email is required');
      if (config.inviteToken) {
        if (!req.body.token) errMsg.push('valid token is required');
        if (req.body.token && req.body.token !== config.inviteToken) errMsg.push('the token you entered is wrong');
      }
      res.render('slack/result', {
        community: config.community,
        message: `Failed! ${errMsg.join(' and ')}.`,
        isFailed: true,
      });
    }
  });
};