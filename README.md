- New server x64 Ubuntu 16.04
- Switched to MONGODB instead of Redis (Hack Dos, DDBB gone)
- Redirection from http to https for forums.interpretame.com causes interpretame auth failing DONT DO IT
- Implemented MailGun for emails - support@interpretame.com (up to 10000 emails/month)
- Constants have been Implemented
- Clear error on login page

- Nodebb Plugin now send confirmation hook
- Nodebb Plugin now detects if user has not confirm account
- Iframes for settings, forum and Admin have been Implemented
- iframe has been styled
- Custom Iframe class instead of react npm plugin (improved for styles)
- Sessions Shared between app and foro (nodebb plugin)
- Cookies has been implemented (needed for sharing sessions)
- Cookie handling user info
- notification message have been implemented 

## HOW-to
`npm run debug`: debug mode
`npm run prod`: production mode
`npm run admin`: manage DDBB

** USER Template **
{ 
    username: 'test1234',
    userslug: 'test1234',
    email: 'cybermarkus1+test@gmail.com',
    joindate: 1481403635970,
    lastonline: 1481403635970,
    picture: '',
    fullname: '',
    location: '',
    birthday: '',
    website: '',
    signature: '',
    uploadedpicture: '',
    profileviews: 0,
    reputation: 0,
    postcount: 0,
    topiccount: 0,
    lastposttime: 0,
    banned: 0,
    status: 'offline',
    uid: 9,
    passwordExpiry: 0,
    'icon:text': 'T',
    'icon:bgColor': '#009688',
    joindateISO: '2016-12-10T21:00:35.970Z',
    lastonlineISO: '2016-12-10T21:00:35.970Z' 
}

** USER Cookie **
{
    name: body.name,
    cover: body['cover:url'],
    website: body.website,
    picture: body.picture,
    id: body.uid,
    email: body.email,
    type: body.groupTitle,
    username: body.username,
    location: body.location
}