import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { translate } from 'admin-on-rest';
import { Link } from 'react-router-dom';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';

const styles = {
  titleLink: { textDecoration: 'none', color: '#000' },
  card: { borderLeft: 'solid 4px #4caf50', flex: 1, marginLeft: '1em' },
  icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#4caf50' }
};

const location = { pathname: 'amfusers' };

export default translate(({ users = [], translate }) => (
  <Card style={styles.card}>
    <SupervisorAccount style={styles.icon} />
    <CardTitle
      title={
        <Link to={location} style={styles.titleLink}>
          {translate('pos.dashboard.list_users')}
        </Link>
      }
    />
    <List>
      {users.map(record => (
        <ListItem
          key={record.id}
          href={`#/amfusers/${record.id}/show`}
          primaryText={record.createdAt}
          secondaryText={record.username}
          secondaryTextLines={2}
          leftAvatar={<Avatar icon={<AccountCircle />} />}
        />
      ))}
    </List>
  </Card>
));
