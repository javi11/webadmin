import React from 'react';
import { List, Datagrid, TextField, Filter, TextInput, DateInput } from 'admin-on-rest';

const UserFilter = props => (
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
    <TextInput label="Search by username" source="username.like" alwaysOn />
  </Filter>
);

export const UserList = props => (
  <List {...props} filters={<UserFilter />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="role" />
      <TextField source="status" />
      <TextField source="createdAt" />
    </Datagrid>
  </List>
);
