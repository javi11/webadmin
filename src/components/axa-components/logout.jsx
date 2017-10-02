/*
 * Copyright (c) 2017 AXA Group Solutions.
 *
 * Licensed under the AXA Group Solutions License (the "License")
 * you may not use this file except in compliance with the License.
 * A copy of the License can be found in the LICENSE.TXT file distributed
 * together with this file.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import AccountBox from 'material-ui/svg-icons/action/account-box';
import PowerOff from 'material-ui/svg-icons/action/power-settings-new';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { userLogout as userLogoutAction, translate as aorTranslate } from 'admin-on-rest';

const Logout = ({ translate, userLogout }) => (
  <IconMenu
    iconButtonElement={
      <IconButton>
        <AccountBox />
      </IconButton>
    }
    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
  >
    <MenuItem
      primaryText={translate('aor.auth.logout')}
      leftIcon={<PowerOff />}
      onClick={userLogout}
    />
  </IconMenu>
);

Logout.propTypes = {
  translate: PropTypes.func,
  userLogout: PropTypes.func
};

Logout.defaultProps = {
  translate: null,
  userLogout: null
};

const mapStateToProps = state => ({
  theme: state.theme
});

const enhance = compose(aorTranslate, connect(mapStateToProps, { userLogout: userLogoutAction }));

export default enhance(Logout);
