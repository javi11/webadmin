import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { grey50 } from 'material-ui/styles/colors';
import { Card, CardActions, Chip, Avatar, RaisedButton, TextField } from 'material-ui';

import { Notification, translate, userLogin as userLoginAction } from 'admin-on-rest';

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
  login = ({ username, password }) => {
    const { userLogin, location } = this.props;
    userLogin({ username, password }, location.state ? location.state.nextPathname : '/');
  };

  render() {
    const { handleSubmit, submitting, theme, translate } = this.props;
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
              <form style={styles.cell} onSubmit={handleSubmit(this.login)}>
                <div style={styles.form}>
                  <p style={styles.hint}>Use your PassAxa credentials</p>
                  <div style={styles.input}>
                    <Field
                      name="username"
                      component={renderInput}
                      floatingLabelText={translate('aor.auth.username')}
                    />
                  </div>
                  <div style={styles.input}>
                    <Field
                      name="password"
                      component={renderInput}
                      floatingLabelText={translate('aor.auth.password')}
                      type="password"
                    />
                  </div>
                </div>
                <CardActions>
                  <RaisedButton
                    type="submit"
                    primary
                    disabled={submitting}
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
                Activate your PassAxa
              </Chip>
            </div>
          </Card>
          <div style={styles.copyright}>
            © 2017 Axa{' '}
          </div>
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
  translate: PropTypes.func.isRequired
};

Login.defaultProps = {
  theme: {}
};

const enhance = compose(
  translate,
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
  connect(null, { userLogin: userLoginAction })
);

export default enhance(Login);
