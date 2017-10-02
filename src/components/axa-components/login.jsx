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
/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';
import { grey50 } from 'material-ui/styles/colors';
import { Card, CardActions, Chip, Avatar, RaisedButton, TextField } from 'material-ui';

import {
  Notification,
  translate as aorTranslate,
  userLogin as userLoginAction
} from 'admin-on-rest';

import axaLogo from '../../assets/images/axa-logo-login.png';
import passAxa from '../../assets/images/passaxa.png';
import background from '../../assets/images/background.svg';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: '70vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: `url(${background}) no-repeat center center fixed`,
    backgroundColor: '#103184',
    backgroundSize: 'cover'
  },
  row: {
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%'
  },
  passAxa: {
    display: 'inline-flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
    justifyContent: 'right',
    float: 'right',
    padding: '0.5em 0.5em 0em 0.5em'
  },
  cell: {
    flex: 1
  },
  card: {
    minWidth: 240,
    width: 380,
    padding: 20
  },
  logo: {
    width: '240px',
    padding: '1em 1em 0em 1em'
  },
  form: {
    padding: '0 0.5em 1em 0.5em'
  },
  input: {
    display: 'flex'
  },
  hint: {
    textAlign: 'center',
    marginTop: '1em',
    color: '#ccc'
  },
  copyright: {
    marginTop: 60,
    color: grey50
  }
};

const renderInput = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) => (
  <TextField errorText={touched && error} {...inputProps} {...props} fullWidth />
);

class Login extends Component {
  login() {
    const { userLogin, location } = this.props;
    return ({ username, password }) => {
      userLogin({ username, password }, location.state ? location.state.nextPathname : '/');
    };
  }

  render() {
    const { handleSubmit, isLoading, theme, translate } = this.props;
    const muiTheme = getMuiTheme(theme);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{ ...styles.main }}>
          <Card style={styles.card}>
            <div style={styles.row}>
              <div style={styles.logo}>
                <img alt="Axa" src={axaLogo} />
              </div>
            </div>
            <div style={styles.row}>
              <form style={styles.cell} onSubmit={handleSubmit(this.login())}>
                <div style={styles.form}>
                  <p style={styles.hint}>Use your PassAxa credentials</p>
                  <div style={styles.input}>
                    <Field
                      name="username"
                      component={renderInput}
                      floatingLabelText={translate('aor.auth.username')}
                      disabled={isLoading}
                    />
                  </div>
                  <div style={styles.input}>
                    <Field
                      name="password"
                      component={renderInput}
                      floatingLabelText={translate('aor.auth.password')}
                      type="password"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <CardActions>
                  <RaisedButton
                    type="submit"
                    primary
                    disabled={isLoading}
                    icon={isLoading && <CircularProgress size={25} thickness={2} />}
                    label={translate('aor.auth.sign_in')}
                    fullWidth
                  />
                </CardActions>
              </form>
            </div>
            <div style={styles.passAxa}>
              <Chip
                onClick={() => window.open('https://passaxa.axa.com/pass/password_management.jsp')}
              >
                <Avatar icon={<img alt="passAxa" src={passAxa} />} />
                {translate('axa.auth.activatePassAxa')}
              </Chip>
            </div>
          </Card>
          <div style={styles.copyright}>© 2017 Axa</div>
          <Notification />
        </div>
      </MuiThemeProvider>
    );
  }
}

Login.propTypes = {
  ...propTypes,
  authClient: PropTypes.func,
  previousRoute: PropTypes.string,
  theme: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

Login.defaultProps = {
  theme: {},
  isLoading: false
};

const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });

const enhance = compose(
  aorTranslate,
  reduxForm({
    form: 'signIn',
    validate: (values, props) => {
      const errors = {};
      const { translate } = props;
      if (!values.username) errors.username = translate('aor.validation.required');
      if (!values.password) errors.password = translate('aor.validation.required');
      return errors;
    }
  }),
  connect(mapStateToProps, { userLogin: userLoginAction })
);

export default enhance(Login);
