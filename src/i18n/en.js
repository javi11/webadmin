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

export default {
  axa: {
    auth: {
      activatePassAxa: 'Activate your passAxa'
    },
    sidebar: {
      notification: 'Notifications',
      installation: 'Installations'
    },
    notification: {
      detail: 'Notification #%{id}',
      title: 'Notification list',
      tabs: {
        details: 'Details',
        payload: 'Payload',
        info: 'Info'
      }
    },
    installation: {
      title: 'Installation list'
    },
    dashboard: {
      welcome: {
        title: 'Welcome to MyAxa entity services',
        subtitle: ''
      },
      devices: {
        android: 'Android device |||| Android devices',
        ios: 'iOS device  |||| iOS devices'
      },
      lastNotifications: 'Last notifications sent'
    },
    filters: {
      id: 'Filter by id',
      deviceType: 'Device type',
      since: 'Since',
      until: 'Until',
      status: 'Status',
      userId: 'Filter by userId',
      appVersion: 'Search by app version'
    },
    fields: {
      id: 'Id',
      userId: 'User id',
      components: 'Components',
      component: 'Component',
      createdAt: 'Created at',
      status: 'Status',
      type: 'Type',
      payload: 'Payload',
      pushNotifications: 'Push notifications',
      installationId: 'Installations id',
      deviceType: 'Device type',
      appVersion: 'App version',
      response: 'Response',
      deliveryStatus: 'Delivery status'
    },
    inputs: {
      eventType: 'Push notification type',
      users: 'userId1, userId2',
      title: 'Title',
      message: 'Message',
      componentId: 'Component',
      documentId: 'Document id',
      claimId: 'Claim id',
      policyId: 'Policy id',
      pushNotifications: 'Push notifications',
      deviceId: 'Device id',
      response: 'Response',
      code: 'Weblet code'
    },
    popup: {
      dismiss: 'dismiss'
    }
  }
};
