const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const root = require('app-root-path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const routes = require('./routes');
const config = require('./config.json');
const proxy = require('express-http-proxy');

const app = express();
const allowedPath = config.models.map(model => `^/${model}`);

app.disable('x-powered-by');
// view engine setup
app.set('view engine', 'ejs');

if (app.get('env') === 'production') {
  app.set('views', './views/');
  app.use(express.static(`${root}/client/dist/`));
}

app.use(compression());
app.use(logger('dev'));
app.use(json());
app.use(
  urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use('/', routes);
app.use(
  '/v1/api',
  proxy(config.target, {
    filter: (req, res) => {
      const regexModels = new RegExp(allowedPath.join('|'), 'gi');
      return regexModels.test(req.path);
    }
  })
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export default app;
