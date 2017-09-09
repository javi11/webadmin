import React, { Component } from 'react';
import withWidth from 'material-ui/utils/withWidth';
import { AppBarMobile, GET_LIST } from 'admin-on-rest';

import Welcome from './welcome';
import NotificationList from './notification-list';
import { restClient } from '../../rest-client';

const styles = {
  welcome: { marginBottom: '2em' },
  flex: { display: 'flex' },
  leftCol: { flex: 1, marginRight: '1em' },
  rightCol: { flex: 1, marginLeft: '1em' },
  singleCol: { marginTop: '2em' }
};

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    restClient(GET_LIST, 'notifications', {
      sort: { field: 'createdAt', order: 'DESC' },
      pagination: { page: 1, perPage: 20 }
    })
      .then(response => response.data)
      .then(notifications => {
        this.setState({
          notifications
        });

        return notifications;
      });
  }

  render() {
    const { notifications } = this.state;
    const { width } = this.props;
    return (
      <div>
        {width === 1 && <AppBarMobile title="Axa webadmin Admin" />}
        <Welcome style={styles.welcome} />
        <div style={styles.flex}>
          <div style={styles.leftCol}>
            <div style={styles.singleCol}>
              <NotificationList notifications={notifications} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withWidth()(Dashboard);
