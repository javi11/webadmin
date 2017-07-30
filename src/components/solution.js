import React from 'react';
import { List, Datagrid, TextField } from 'admin-on-rest';

export const SolutionList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="status" />
    </Datagrid>
  </List>
);
