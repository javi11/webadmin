import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiAppBar from 'material-ui/AppBar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import compose from 'recompose/compose';
import logo from '../../assets/images/logo.svg';
import Logout from './logout';

const styles = {
  logo: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    WebkitTextOverflow: 'ellipsis',
    textOverflow: 'ellipsis',
    margin: 0,
    letterSpacing: 0,
    fontSize: 24,
    fontWeight: '400',
    color: 'rgb(255, 255, 255)',
    height: 44,
    WebkitFlex: '1 1 0%',
    MsFlex: '1 1 0%',
    flex: '1 1 0%'
  },
  bar: {
    background: '#f2f2ff',
    borderBottom: 'solid 2px #cfcffa'
  },
  title: {
    color: '#333333'
  }
};

const AppBar = ({ title, iconElementLeft }) => (
  <MuiAppBar
    title={title}
    style={styles.bar}
    titleStyle={styles.title}
    iconElementLeft={<img alt="Axa" style={styles.logo} src={logo} />}
    iconElementRight={<Logout />}
  />
);

AppBar.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};

const enhance = compose(
  muiThemeable(), // force redraw on theme change
  connect(null, {})
);

export default enhance(AppBar);
