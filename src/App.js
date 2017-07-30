// in src/App.js
import React from 'react';
import { Admin, Resource, fetchUtils } from 'admin-on-rest';
import loopbackRestClient, { authClient } from 'aor-loopback';
import config from './config';

import { SolutionList } from './components/solution';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};
const restClient = loopbackRestClient(`${config.API_HOST}${config.API_PATH}`, httpClient);

const App = () => (
  <Admin
    restClient={restClient}
    authClient={authClient(`${config.API_HOST}${config.API_PATH}/oauth2/token`)}
  >
    <Resource name="solutions" list={SolutionList} />
  </Admin>
);

export default App;
