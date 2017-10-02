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
/* global navigator */

import React from 'react';
import {
  ReferenceArrayField,
  TextField,
  ChipField,
  SingleFieldList,
  DateField,
  List,
  Datagrid,
  Filter,
  TextInput,
  AutocompleteInput,
  DateInput,
  ShowButton,
  FunctionField,
  ReferenceInput
} from 'admin-on-rest';
import Chip from 'material-ui/Chip';
import { red50, green50, red500, green500, grey50 } from 'material-ui/styles/colors';

const styles = {
  color: grey50
};

function getLang() {
  return navigator.languages !== undefined ? navigator.languages[0] : navigator.language;
}

const NotificationFilter = props => (
  <Filter {...props}>
    <DateInput
      label="axa.filters.since"
      source="createdAt.gte"
      options={{
        hintText: 'Since'
      }}
    />
    <DateInput
      label="axa.filters.until"
      source="createdAt.lte"
      options={{
        hintText: 'Until'
      }}
    />
    <ReferenceInput
      label="axa.inputs.componentId"
      source="components"
      reference="components"
      sort={{ field: 'name', order: 'ASC' }}
      filter={{ role: 'component-owner' }}
      filterToQuery={searchText => ({ name: { like: searchText } })}
      perPage={1000000}
    >
      <AutocompleteInput
        optionText="name"
        options={{
          menuStyle: { maxHeight: '300px', overflowY: 'auto' }
        }}
      />
    </ReferenceInput>
    <TextInput label="axa.filters.userId" source="userId.like" alwaysOn />
  </Filter>
);

const getStatus = pushNotifications => {
  let status = '';
  if (pushNotifications && pushNotifications.length > 0) {
    if (pushNotifications.some(push => push.status === 'error')) {
      status = 'error';
    }
    if (!status && pushNotifications.some(push => push.status === 'sent')) {
      status = 'sent';
    }
  }

  return status;
};

const rowStyle = ({ pushNotifications }) => {
  const status = getStatus(pushNotifications);
  if (status === 'error') {
    return { backgroundColor: red50 };
  } else if (status === 'sent') {
    return { backgroundColor: green50 };
  }

  return {};
};

const statusBgColor = status => {
  let color = '';
  if (status === 'error') {
    color = red500;
  } else if (status === 'sent') {
    color = green500;
  }

  return color;
};

const NotificationList = props => (
  <List {...props} filters={<NotificationFilter />} title="axa.notification.title">
    <Datagrid rowStyle={rowStyle}>
      <TextField source="userId" label="axa.fields.userId" />
      <ReferenceArrayField label="axa.fields.components" reference="components" source="components">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <DateField
        label="axa.fields.createdAt"
        source="createdAt"
        showTime
        locales={getLang()}
        options={{
          weekday: 'long',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false
        }}
      />
      <FunctionField
        label="axa.fields.status"
        render={record => {
          const status = getStatus(record.pushNotifications);
          return (
            <Chip labelStyle={styles} backgroundColor={statusBgColor(status)}>
              {status.toUpperCase()}
            </Chip>
          );
        }}
      />
      <ShowButton />
    </Datagrid>
  </List>
);

export default NotificationList;
