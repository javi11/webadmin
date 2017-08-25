import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Filter,
  TextInput,
  SelectInput,
  DateInput,
  Show,
  SimpleShowLayout,
  ShowButton
} from 'admin-on-rest';
import { RawJsonField } from './custom-fields';

const NotificationsFilter = props =>
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
  </Filter>;

export const NotificationList = props =>
  <List {...props} filters={<NotificationsFilter />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="components" />
      <TextField source="createdAt" />
      <TextField source="status" />
      <TextField source="type" />
      <TextField source="userId" />
      <ShowButton />
    </Datagrid>
  </List>;

export const NotificationShow = props =>
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="components" />
      <TextField source="createdAt" />
      <TextField source="status" />
      <TextField source="type" />
      <TextField source="userId" />
      <RawJsonField label="Payload" source="payload" />
    </SimpleShowLayout>
  </Show>;
