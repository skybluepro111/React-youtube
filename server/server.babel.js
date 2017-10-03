// Keymetrics
const pmx = require('pmx').init();
// Node
import path from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'connect-flash';

// Config
import config from '../config';
// Routes
import authRoutes from './auth';
import apiRoutes from './api';
import slackRoutes from './slack';
import mainRoutes from './index';

// Database
import Schema from '../data/schema';
import Functions from '../data/functions';

// React
import React from 'react';

// Redux
import { setupReducers } from '@sketchpixy/rubix/lib/node/redux-router';
import reducers from '../src/redux/reducers';
import Helmet from 'helmet';

// i18n
import i18n from 'i18n';

// Constants
const port = process.env.PORT || 8080;
// Session store
const FileStore = require('session-file-store')(session);
// Reducers react
setupReducers(reducers);
// App
const app = express();
// i18 internationalisation
i18n.configure({
  locales: ['en', 'es'],
  cookie: 'int_lang',
  directory: './src/locales',
  defaultLocale: 'en',
  autoReload: true,
});

app.use(compression());
app.use(cookieParser());
// default: using 'accept-language' header to guess language settings
app.use(i18n.init);
// paths
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/audios', express.static('audios'));
app.use(express.static('static_pages'));
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');

// express 4
app.use(bodyParser.json({
  limit: '100mb',
}));
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true,
}));

// helmet
app.use(Helmet());

app.set('trust proxy', 1); // trust first proxy
const sess = {
  name: 'interpretame',
  secret: 'keyboard cat',
  saveUninitialized: false,
  resave: false,
  // store: new FileStore(),
  cookie: {
    secure: 'auto',
    httpOnly: false,
    // disable for debug
    domain: (process.env.DEBUG_NODE) ? null : 'interpretame.com',
    maxAge: 86400000,
  },
};

app.use(session(sess));
app.use(flash());

const db = Schema;
const query = Functions(app, db);

authRoutes(app, config, query);
apiRoutes(app, config, query);
slackRoutes(app, config);
mainRoutes(app, config);

app.listen(port, () => {
  console.log(`Node.js app is running at http://localhost:${port}/`);
});
