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
// const passAxa = require('passaxa');
const { unauthorized, notFound } = require('boom');
const cors = require('cors');
const request = require('request');

require('./init-global-container.js')();

const logger = require('./utils/global-container.js').get('logger');

const app = express();
const allowedPath = config.models.map(model => `^/${model}`);

app.disable('x-powered-by');
// view engine setup
app.set('view engine', 'ejs');
app.set('views', `${root}/middleware/views`);

app.use(express.static(`${root}/build/`));
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(cors());

// Get PassAxa Token
app.use('/v1/api/OAuth2/token', (req, res, next) => {
  const missingCredentials = !req.body && !req.body.username && !req.body.password;
  if (missingCredentials) {
    return next(unauthorized().output.payload);
  }

  req.body.email = req.body.username;
  req.body.password =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.WXRzQktVclRsMlpydXZ3K01FMXMzZmtic2dhTnRiQ2xXWUtyQ3hPR0FPR05sSld2WUs3VE1YN05XSEZ4YXUyaE5NMWljQVFxZnRxVWpnR2Q0cU9OS0tQUmdPRUYrQXR1ZVZvSCtIN0c5OXkwOE9acU0rNFNuZzBzQWsrMm11ZWgzK3NqVUJvUVVmUXNUQ1krbjJxclc2VTBTUHRycHhYdVRCelR6WkVNZTNCOSs5QkRiN0YvL2FMeG9ZdXRydm5IYzEyR2ZQT0ZVWVIyVUVZNVRBMStvejZtY0N5aXF3TmsxcDFWTlNuamlZdEJKbnU2QXl4bjY1Mk40eXNSVDVRREplTG5MV1puVUZZSGRNVFFyM1lpRHZETHl4TGJTNFN3clpUQUFCV0dVRmhlZXoxeFlQMlBxTW1pMGxCZCtaVVdOaE5WZkZ3VmhVTlJ3WXVidHM0dXZHWGd3Wnl2SXJqYjVWNmJyTisxVC9ha2VRaGUzOUliQWFRMCtPSEJNdlRRSlNMeEo2djlRcnFqbHlQWDB6MW9pSmhoeFhkM0ZPaCt4VE9OOE5yd0hBenIzN2U2YXJ5c2tqc3NoaVM5eXZ0S1dLcllYQjA1Q2J5OHNTT2ZXRGhPOWFBSnZtQXhCQVdMZ0s1Vm9EdlhsUnNNRGNKUDI5TFJCbVo2akVlZW1hUXdkYWN6dWxOUWNpU1dHSWVVZ0g2YVFlWm9TcTNUU2xWQzdzeUpLSTBzdTVTcjRwa01kSDRYOE5ReW5CeDlZYkl0YmVHdkFiSmRkUmhxelBKR2lGOGtsZEFYMnZOZnZkYk00OG5PWGtKeTdwOE9MR3VCdW5EM3pyd0JpTDFjUEIxbFBxdU9CZUQ1Z3VGVDhuTzBqMXdFNWhDUTZPR3c5bXhITkJCQ1FYeExJQWVlSHplMEZ4M3dvZUtTd1dhNkdybGFZeVF1UHNFVDExNzFjbmZjbDQxdXZNOEV5MHJUN3hrT3ZiM3AyU1FHY2liLzNMOHJnR1dCL2NUaFB3dGRvZy9UZEZKa2xSTVg0cHdQZjVzM0x5Vk5RL3BER2hXZm5VWmhxcGp3aUh1bW1JYjZWZDBPNWF6WmNYU1BRdERVbFlobDNYeDQ3K0pGV3l2ZjVPVXNUbjY2eHNrT3lvN1BaT3hmdVdCbFBnSlN5bzN5VFNRUlZwejQwdlNMaVM4eFV0L0tRWGVGOCtvdEd4ZEtXTityS0dQdnFGajB5anhUbWpJa1Z1K1lhTWg4a1ZzZlVBVWtvV29vVkVDVVJTdDZGaTgxWnU4bENYTnExUGJ1TTBqRDNCcVJWMkJYcUY4dkJVWG1aMWpNeExEVFphZz0.39lvrFxMI4k6Ch37T37x6WiG3atz7_1brcuCSPmonmQ';
  req.body.grant_type = 'password';
  return next();

  /* return passAxa({
    email: req.body.username,
    password: req.body.password
  })
    .then(result => {
      let error;

      if (result.loggedin) {
        logger.debug('PassAxa token', result.token);
        req.body.email = result.username;
        req.body.password = result.token;
        req.body.grant_type = 'password';
      } else {
        logger.debug('Invalid password or email', req.body.username, req.body.password);
        error = unauthorized().output.payload;
      }

      return next(error);
    })
    .catch(err => {
      logger.debug('PassAxa error', err);

      return next(unauthorized().output.payload);
    }); */
});

app.use('/v1/api', (req, res, next) => {
  const regexModels = new RegExp(allowedPath.join('|'), 'gi');
  if (regexModels.test(req.path)) {
    const options = {
      uri: config.target + req.path,
      qs: req.query,
      method: req.method,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      json: true
    };
    if (req.headers.authorization || req.query.access_token) {
      Object.assign(options.headers, {
        Authorization: req.headers.authorization || req.query.access_token
      });
    }

    if (req.body) {
      Object.assign(options, { body: req.body });
    }

    logger.debug('Middleware options', options);

    return request(options, (err, response) => {
      if (err) {
        logger.error('Error on request the endpoint on amf', err);
        return next(err);
      }
      const body = response.body;
      res.set(response.headers);
      res.status(response.statusCode || 500);

      return res.json(body);
    });
  }

  return next(notFound().output.payload);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
} else {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {}
    });
  });
}

module.exports = app;
