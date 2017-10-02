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
  List,
  Datagrid,
  TextField,
  Filter,
  TextInput,
  DateInput,
  ReferenceField,
  SelectInput,
  DateField,
  ReferenceInput,
  AutocompleteInput
} from 'admin-on-rest';

function getLang() {
  return navigator.languages !== undefined ? navigator.languages[0] : navigator.language;
}

const DeviceFilter = props => (
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
    <TextInput label="axa.filters.userId" source="userId.like" alwaysOn />
    <TextInput label="axa.filters.appVersion" source="appVersion.like" />
    <TextInput label="axa.filters.id" source="id" />
    <SelectInput
      source="deviceType"
      label="axa.filters.deviceType"
      choices={[{ id: 'ios', name: 'iOS' }, { id: 'android', name: 'Android' }]}
    />
    <ReferenceInput
      label="axa.inputs.componentId"
      source="componentId"
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
  </Filter>
);

const DeviceList = props => (
  <List {...props} title="axa.device.title" filters={<DeviceFilter />}>
    <Datagrid>
      <TextField label="axa.fields.appVersion" source="appVersion" />
      <TextField label="axa.fields.deviceType" source="deviceType" />
      <ReferenceField
        label="axa.fields.component"
        source="componentId"
        reference="components"
        linkType={false}
      >
        <TextField source="name" />
      </ReferenceField>
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
      <TextField label="axa.fields.userId" source="userId" />
    </Datagrid>
  </List>
);

export default DeviceList;
