// in src/App.js
import React from 'react';
import { Admin, Resource } from 'admin-on-rest';
import loopbackRestClient, { authClient } from './rest-clients/loopback/index';
import config from './config';
import { axaTheme } from './themes/axa-theme';

import { SolutionList } from './components/solution';
import { InstallationList } from './components/installation';
import { NotificationList, NotificationShow } from './components/notification';

const restClient = loopbackRestClient(`${config.API_HOST}${config.API_PATH}`);

const App = () => (
  <Admin
    restClient={restClient}
    authClient={authClient(`${config.API_HOST}${config.API_PATH}/oauth2/token`)}
    theme={axaTheme()}
  >
    <Resource name="solutions" list={SolutionList} />
    <Resource name="components" />
    <Resource name="installations" list={InstallationList} />
    <Resource name="notifications" show={NotificationShow} list={NotificationList} />
  </Admin>
);

export default App;
