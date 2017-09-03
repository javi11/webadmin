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
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.aEpscHU4ekxjdncyejRIZStEQU9WMUlzWDlVVVluSUhvTXpmbUd3UXhzUWZxWnBpVytlQnYvUnFUSjhQcVpYOEtDcFJ5OHpnQjE0ZWd4N1lkbThyRVBncjZpazFhRmF3Y0QvenM5Rk10MWZlY3VyN0FoeVNINjdVOTBIQXRYZDFZRGhRa1p3c2J0K1diYXJhbUwzTWZ6ZitOTS9LeGthM3ZZc3pITFJUVHpLRnNwWXc1RDJxaWp0V1I3ZGpnWEhSNGpuYmV3Q1Z5ci9EYktrOGMzVmo1RnlJMllObk10Q3RZNzFibC92YTByZ0phTDFoNzd0dDE4S0tTWlFtZ1Axcjg4bGU2WmxxUGFLM3A2STJYbmxhOG0xWGFUOWJFR3FnY2hWTnA0Y3h6dkpZMSs2NnZ0SlNkZlJTSi9vcmRuK1NvSDIwNnk3VENaSHlMdTdNU1hURWtLaTV0YVU1UW02aUN5bjZSTHltOXovQUZtVGw5d2JUNVFYLzdmQmROalcxM212TThUYUxNb3RZcXlOUFNIS0tNR2R5bXphS3FnM3BxdXhyWVU3RGMxTVRQWG5uSmlPUGZwczZwOUFHZHVPM2FpZ1ZDU2lrUmlYTFpNOTUrZGpnSmY3MmIxMFd5QWtCN2ZwUDM0bi9vOUMwU1g5RnhXMGdSM21mMGI1Zk9iRzdDWlJUbzB1enRQT25oNlhpSTA3QXVFeHVXZDhFYnpiR2hON1phR2lvSU0wRVEzMXJtYlpSVWRpbHl3elV1R1NlRTlyWjhBVzBqa0pDbjNILzVKUjVOS1BGaHJNSVlmNEpwaTVzeHNuRU5hUUIxVDVZeTJYWk1RMmQ4akpEdnpjclVuTmtBV2YrWVRBMzVpT3IrQ1IyVWJwc1hTUmhqWCtjT3cvMk82RnVqa2F2T1lWMDd4aWMwcWsxUkNDbmVXNW5sNHFCaTNMS0tMSVNUaC9GSndXaklWMjVJM2cvMDBqSXp6TkFZTU14Y3ZNTUlDWlEwbnZjMWJXOERMTmpSQkxOOGRJU2FFM2NtRkp0LzFjV2k3ai9KajhsRHMxWFBibmszVWtMSkNWQnRVTmtjU0NSczRCS1VNbHIrdU15MlhTV00rNGtiRTRSMVVFSzJLT0FtM0JrRUhzUVNLbjRzQ3RicUpRbys2eC9rTW10d3RrTmF1eVRMNEcwZUlFSDE4YkxaeWhDTkNzU3BTNEp0a1gwT0N2U0RzdkpWTjFRS3RrakxzVVJadFVkNFBlWHdCQUNORXpHTnNNb2sySmlEY1JhUk5lN3Znc2dFR09TeHVpM01NUWJ0d3p0TjJJOEZXUURoN2k4cUlnL2VNND0.I5-NH9vfGn22nsdJ1YzUlzbuoVJa_W_mNIiFd0S0YbU';
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
        Authorization: `Bearer ${req.headers.authorization || req.query.access_token}`
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
      if (req.path.indexOf('/token') > -1) {
        Object.assign(body, {
          id: body.access_token,
          ttl: body.expires_in
        });
      }

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
