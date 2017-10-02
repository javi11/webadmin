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
/* global Request, Headers, fetch */
import storage from './storage';

const authClient = (loginApiUrl, noAccessPage = '/login') => (type, params) => {
  if (type === 'AUTH_LOGIN') {
    Object.assign(params, { grant_type: 'password' });
    const request = new Request(loginApiUrl, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ access_token, token_type, expires_in }) => {
        storage.save('lbtoken', { access_token, token_type }, expires_in);
      });
  }
  if (type === 'AUTH_LOGOUT') {
    storage.remove('lbtoken');
    return Promise.resolve();
  }
  if (type === 'AUTH_ERROR') {
    const { status } = params;
    if (status === 401 || status === 403) {
      storage.remove('lbtoken');
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (type === 'AUTH_CHECK') {
    const token = storage.load('lbtoken');
    if (token && token.access_token) {
      return Promise.resolve();
    }

    storage.remove('lbtoken');
    return Promise.reject({ redirectTo: noAccessPage });
  }
  return Promise.reject('Unkown method');
};

export default authClient;
