import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { translate } from 'admin-on-rest';
import { Link } from 'react-router-dom';
import EventNote from 'material-ui/svg-icons/notification/event-note';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

const styles = {
  titleLink: { textDecoration: 'none', color: '#000' },
  card: { borderLeft: 'solid 4px #f44336', flex: 1, marginRight: '1em' },
  icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#f44336' }
};

const location = { pathname: 'notifications' };

export default translate(({ notifications = [], translate }) => (
  <Card style={styles.card}>
    <CommentIcon style={styles.icon} />
    <CardTitle
      title={
        <Link to={location} style={styles.titleLink}>
          {translate('pos.dashboard.list_notifications')}
        </Link>
      }
    />
    <List>
      {notifications.map(record => (
        <ListItem
          key={record.id}
          href={`#/notifications/${record.id}/show`}
          primaryText={record.createdAt}
          secondaryText={record.userId}
          secondaryTextLines={2}
          leftAvatar={<Avatar icon={<EventNote />} />}
        />
      ))}
    </List>
  </Card>
));
