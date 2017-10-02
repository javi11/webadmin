import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Filter,
  TextInput,
  SelectInput,
  DateInput,
  DateField
} from 'admin-on-rest';

const SolutionFilter = props => (
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
      choices={[{ id: 'active', name: 'Active' }, { id: 'deleted', name: 'Deleted' }]}
    />
    <TextInput label="Search by name" source="name.like" alwaysOn />
  </Filter>
);

export const SolutionList = props => (
  <List {...props} filters={<SolutionFilter />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="status" />
      <DateField source="createdAt" showTime={true} />
    </Datagrid>
  </List>
);
