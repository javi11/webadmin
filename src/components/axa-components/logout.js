import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import AccountBox from 'material-ui/svg-icons/action/account-box';
import PowerOff from 'material-ui/svg-icons/action/power-settings-new';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { userLogout as userLogoutAction, translate } from 'admin-on-rest';

const Logout = ({ translate, userLogout }) => (
  <IconMenu
    iconButtonElement={<IconButton><AccountBox /></IconButton>}
    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
  >
    <MenuItem
      primaryText={translate('aor.auth.logout')}
      leftIcon={<PowerOff />}
      onTouchTap={userLogout}
    />
  </IconMenu>
);

Logout.propTypes = {
  translate: PropTypes.func,
  userLogout: PropTypes.func
};

const mapStateToProps = state => ({
  theme: state.theme
});

const enhance = compose(translate, connect(mapStateToProps, { userLogout: userLogoutAction }));

export default enhance(Logout);
