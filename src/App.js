// in src/App.js
import React from 'react';
import { Admin, Resource } from 'admin-on-rest';
import loopbackRestClient, { authClient } from 'aor-loopback';
import config from './config';

import { SolutionList } from './components/solution';
import { InstallationList } from './components/installation';
import { NotificationList, NotificationShow } from './components/notification';

const restClient = loopbackRestClient(`${config.API_HOST}${config.API_PATH}`);

const App = () =>
  <Admin
    restClient={restClient}
    authClient={authClient(`${config.API_HOST}${config.API_PATH}/oauth2/token`)}
  >
    <Resource name="solutions" list={SolutionList} />
    <Resource name="installations" list={InstallationList} />
    <Resource name="notifications" show={NotificationShow} list={NotificationList} />
  </Admin>;

export default App;
