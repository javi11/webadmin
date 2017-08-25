import React from 'react';
import { List, Datagrid, TextField, Filter, TextInput, DateInput } from 'admin-on-rest';

const InstallationFilter = props =>
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
    <TextInput label="Search by userId" source="name.like" alwaysOn />
    <TextInput label="Search by app version" source="appVersion.like" />
  </Filter>;

export const InstallationList = props =>
  <List {...props} filters={<InstallationFilter />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="appVersion" />
      <TextField source="deviceType" />
      <TextField source="componentId" />
      <TextField source="createdAt" />
      <TextField source="userId" />
    </Datagrid>
  </List>;
