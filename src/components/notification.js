import React from 'react';
import {
  ReferenceArrayField,
  TextField,
  ChipField,
  RichTextField,
  SingleFieldList,
  DateField,
  List,
  Datagrid,
  Filter,
  TextInput,
  SelectInput,
  DateInput,
  Show,
  TabbedShowLayout,
  ShowButton,
  Tab
} from 'admin-on-rest';
import { RawJsonField } from './custom-fields';

const NotificationsFilter = props => (
  <Filter {...props}>
    <DateInput
      label="Since"
      source="createdAt.gte"
      options={{
        hintText: 'Since'
      }}
    />
    <DateInput
      label="Until"
      source="createdAt.lte"
      options={{
        hintText: 'Until'
      }}
    />
    <SelectInput
      source="status"
      choices={[{ id: 'read', name: 'Read' }, { id: 'unread', name: 'Unread' }]}
    />
    <TextInput label="Search by userId" source="userId.like" alwaysOn />
  </Filter>
);

export const NotificationList = props => (
  <List {...props} filters={<NotificationsFilter />}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceArrayField label="Components" reference="components" source="components">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <DateField source="createdAt" showTime={true} />
      <TextField source="status" />
      <TextField source="type" />
      <TextField source="userId" />
      <ShowButton />
    </Datagrid>
  </List>
);

const PushNotifications = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="installationId" />
      <DateField source="createdAt" showTime={true} />
      <ChipField source="status" />
      <RichTextField source="response" />
    </Datagrid>
  </List>
);

export const NotificationShow = props => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="Details">
        <TextField source="id" />
        <TextField source="components" />
        <DateField source="createdAt" showTime={true} />
        <TextField source="status" />
        <TextField source="type" />
        <TextField source="userId" />
      </Tab>
      <Tab label="Payload">
        <RawJsonField label="Payload" source="payload" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
