

Object.defineProperty(exports, '__esModule', {
  value: true,
});

exports.default = function () {
  return function (req, res, next) {
    let mainjs = 'main.js',
      maincss = 'main.css';

    switch (process.env.NODE_ENV) {
      case 'development':

        res.locals.pretty = true;
        res.locals.app_stylesheets = `\n      <script src='${static_path}/assets/js/devServerClient.js'></script>\n      <script src='${static_path}/assets/js/${mainjs}'></script>`;
        res.locals.app_scripts = `\n      <script src='${static_path}/assets/js/plugins.js'></script>\n      <script src='${static_path}/assets/js/app.js'></script>`;
        break;
      default:
        res.locals.app_stylesheets = `\n      <link rel='stylesheet' href='/css/${maincss}' />`;
        res.locals.app_scripts = '\n      <script src=\'/js/plugins.js\'></script>\n      <script src=\'/js/app.js\'></script>';
        break;
    }

    next();
  };
};

const hostname = process.env.WP_HOST || 'localhost';
const port = process.env.WP_PORT || 8079;
var static_path = `http://${hostname}:${port}`;
