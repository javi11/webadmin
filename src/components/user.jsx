import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Filter,
  TextInput,
  DateInput,
  DateField,
  SelectInput,
  Edit,
  SimpleForm,
  DisabledInput,
  EditButton,
  required,
  minLength,
  Create
} from 'admin-on-rest';

function getLang() {
  return navigator.languages !== undefined ? navigator.languages[0] : navigator.language;
}

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
    <SelectInput
      source="role"
      labhel="axa.fields.role"
      choices={[{ id: 'solution-owner', name: 'Solution owner' }, { id: 'admin', name: 'Admin' }]}
    />
    <SelectInput
      source="status"
      labhel="axa.fields.status"
      choices={[{ id: 'active', name: 'Active' }, { id: 'deleted', name: 'Deleted' }]}
    />
    <TextInput label="Search by username" source="username.like" alwaysOn />
  </Filter>
);

export const UserList = props => (
  <List {...props} filters={<UserFilter />}>
    <Datagrid>
      <TextField source="id" label="axa.fields.id" />
      <TextField source="username" label="axa.fields.username" />
      <TextField source="role" label="axa.fields.role" />
      <TextField source="status" label="axa.fields.status" />
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
      <EditButton />
    </Datagrid>
  </List>
);

export const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput label="axa.fields.id" source="id" />
      <DisabledInput label="axa.fields.username" source="username" />
      <SelectInput
        source="role"
        labhel="axa.fields.role"
        choices={[{ id: 'solution-owner', name: 'Solution owner' }, { id: 'admin', name: 'Admin' }]}
      />
      <SelectInput
        source="status"
        labhel="axa.fields.status"
        choices={[{ id: 'active', name: 'Active' }, { id: 'deleted', name: 'Deleted' }]}
      />
    </SimpleForm>
  </Edit>
);

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput
        label="axa.fields.username"
        source="username"
        validate={[required, minLength(3)]}
      />
      <SelectInput
        source="role"
        labhel="axa.fields.role"
        choices={[{ id: 'solution-owner', name: 'Solution owner' }, { id: 'admin', name: 'Admin' }]}
        validate={[required]}
      />
      <SelectInput
        source="status"
        labhel="axa.fields.status"
        choices={[{ id: 'active', name: 'Active' }, { id: 'deleted', name: 'Deleted' }]}
        validate={[required]}
      />
    </SimpleForm>
  </Create>
);
