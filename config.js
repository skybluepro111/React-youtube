module.exports = {
  url: '/',
  // your community or team name to display on join page.
  community: 'Interprétame',
  // your slack team url (ex: socketio.slack.com)
  slackUrl: 'interpretame.slack.com',
  // access token of slack
  // You can generate it in https://api.slack.com/web#auth
  // You should generate the token in admin user, not owner.
  // If you generate the token in owner user, missing_scope error will be occurred.
  //
  // You can test your token via curl:
  //   curl -X POST 'https://YOUR-SLACK-TEAM.slack.com/api/users.admin.invite' \
  //   --data 'email=EMAIL&token=TOKEN&set_active=true' \
  //   --compressed
  slacktoken: 'xoxp-20187941588-174036801799-173387369027-52f79dc8d2264c228bb0c8721e622940',
  // an optional security measure - if it is set, then that token will be required to get invited.
  inviteToken: null
};
