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
/* global Headers, FormData, fetch  */
import HttpError from './HttpError';
import storage from './storage';

export const fetchJson = (url, options = {}) => {
  const requestHeaders =
    options.headers ||
    new Headers({
      Accept: 'application/json'
    });
  if (!(options && options.body && options.body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }
  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set('Authorization', options.user.token);
  } else {
    const token = storage.load('lbtoken');
    requestHeaders.set('Authorization', `${token.token_type} ${token.access_token}`);
  }

  return fetch(url, { ...options, headers: requestHeaders })
    .then(response =>
      response.text().then(text => ({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: text
      }))
    )
    .then(({ status, statusText, headers, body }) => {
      let json;
      try {
        json = JSON.parse(body);
      } catch (e) {
        // not json, no big deal
      }
      if (status < 200 || status >= 300) {
        return Promise.reject(
          new HttpError((json && json.error.message && json.error.message) || statusText, status)
        );
      }
      return { status, headers, body, json };
    });
};

export const queryParameters = data =>
  Object.keys(data).map(key => [key, data[key]].map(encodeURIComponent).join('=')).join('&');
