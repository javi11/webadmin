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

import React from 'react';
import { Admin, Resource } from 'admin-on-rest';
import Favicon from 'react-favicon';
import { authClient } from './rest-clients/loopback/index';
import config from './config';
import axaTheme from './themes/axa-theme';

import CustomLayout from './components/axa-components/custom-layout';
import Login from './components/axa-components/login';
import menu from './components/axa-components/menu';
import InstallationList from './components/installation';
import { NotificationList, NotificationShow } from './components/notification';
import restClient from './rest-client';
import I18n from './i18n';
import createResponseReducer from './reducers/create-response-reducer';
import favIconImage from './assets/images/favicon.ico';

const App = () => (
  <div>
    <Favicon url={favIconImage} />
    <Admin
      customReducers={{ responseBody: createResponseReducer }}
      menu={menu}
      restClient={restClient}
      authClient={authClient(`${config.getAPIHost()}${config.getAPIPath()}/oauth2/token`)}
      theme={axaTheme()}
      appLayout={CustomLayout}
      title="WebAdmin"
      loginPage={Login}
      messages={I18n}
    >
      <Resource name="components" />
      <Resource
        name="installations"
        options={{ label: 'axa.sidebar.installation' }}
        list={InstallationList}
      />
      <Resource
        name="notifications"
        options={{ label: 'axa.sidebar.notification' }}
        show={NotificationShow}
        list={NotificationList}
      />
    </Admin>
  </div>
);

export default App;
