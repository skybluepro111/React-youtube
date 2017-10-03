import routes from './routes';
import render, {
  setupReducers,
  replaceReducers,
} from '@sketchpixy/rubix/lib/node/redux-router';
import l20n from '@sketchpixy/rubix/lib/L20n';

l20n.initializeLocales({
  locales: ['en', 'es'],
  default: 'en',
});

import reducers from './redux/reducers';

setupReducers(reducers);
render(routes, () => {
  l20n.ready();
});
