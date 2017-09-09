// in src/App.js
import React from 'react';
import { Admin, Resource } from 'admin-on-rest';
import { authClient } from './rest-clients/loopback/index';
import config from './config';
import { axaTheme } from './themes/axa-theme';

import CustomLayout from './components/axa-components/custom-layout';
import menu from './components/axa-components/menu';
import { SolutionList } from './components/solution';
import { InstallationList } from './components/installation';
import { NotificationList, NotificationShow } from './components/notification';
import { Dashboard } from './components/dashboard/index';
import { restClient } from './rest-client';

const App = () => (
  <Admin
    menu={menu}
    dashboard={Dashboard}
    restClient={restClient}
    authClient={authClient(`${config.API_HOST}${config.API_PATH}/oauth2/token`)}
    theme={axaTheme()}
    appLayout={CustomLayout}
    title="WebAdmin"
  >
    <Resource name="solutions" list={SolutionList} />
    <Resource name="components" />
    <Resource name="installations" list={InstallationList} />
    <Resource name="notifications" show={NotificationShow} list={NotificationList} />
  </Admin>
);

export default App;
