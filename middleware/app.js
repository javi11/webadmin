/*
 * Copyright (c) 2017 AXA Group Solutions.
 *
 * Licensed under the AXA Group Solutions License (the "License")
 * you may not use this file except in compliance with the License.
 * A copy of the License can be found in the LICENSE.TXT file distributed
 * together with this file.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const root = require('app-root-path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const config = require('./config.json');
const proxy = require('express-http-proxy');

require('./init-global-container.js')();

const app = express();
const allowedPath = config.models.map(model => `^/${model}`);

app.disable('x-powered-by');
// view engine setup
app.set('view engine', 'ejs');
app.set('views', `${root}/middleware/views`);

app.use(express.static(`${root}/dist/`));
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(
  '/v1/api',
  proxy(config.target, {
    filter: (req) => {
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
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
