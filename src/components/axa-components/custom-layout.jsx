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

import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';
import CircularProgress from 'material-ui/CircularProgress';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';
import {
  AdminRoutes,
  Sidebar,
  Menu,
  Notification,
  defaultTheme,
  setSidebarVisibility as setSidebarVisibilityAction
} from 'admin-on-rest';
import AppBar from './app-bar';

const styles = {
  wrapper: {
    // Avoid IE bug with Flexbox, see #467
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  body: {
    backgroundColor: '#edecec',
    display: 'flex',
    flex: 1,
    overflowY: 'hidden',
    overflowX: 'scroll'
  },
  bodySmall: {
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    padding: '2em'
  },
  contentSmall: {
    flex: 1,
    paddingTop: '3em'
  },
  loader: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 16,
    zIndex: 1200
  }
};

const prefixedStyles = {};

class CustomLayout extends Component {
  componentWillMount() {
    if (this.props.width !== 1) {
      this.props.setSidebarVisibility(true);
    }
  }

  render() {
    const {
      children,
      customRoutes,
      dashboard,
      isLoading,
      logout,
      menu,
      catchAll,
      theme,
      title,
      width
    } = this.props;

    const muiTheme = getMuiTheme(theme);
    if (!prefixedStyles.main) {
      // do this once because user agent never changes
      const prefix = autoprefixer(muiTheme);
      prefixedStyles.wrapper = prefix(styles.wrapper);
      prefixedStyles.main = prefix(styles.main);
      prefixedStyles.body = prefix(styles.body);
      prefixedStyles.bodySmall = prefix(styles.bodySmall);
      prefixedStyles.content = prefix(styles.content);
      prefixedStyles.contentSmall = prefix(styles.contentSmall);
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={prefixedStyles.wrapper}>
          <div style={prefixedStyles.main}>
            {width !== 1 && <AppBar title={title} />}
            <div
              className="body"
              style={width === 1 ? prefixedStyles.bodySmall : prefixedStyles.body}
            >
              <div style={width === 1 ? prefixedStyles.contentSmall : prefixedStyles.content}>
                <AdminRoutes customRoutes={customRoutes} dashboard={dashboard} catchAll={catchAll}>
                  {children}
                </AdminRoutes>
              </div>
              <Sidebar theme={theme}>
                {createElement(menu || Menu, {
                  logout,
                  hasDashboard: !!dashboard
                })}
              </Sidebar>
            </div>
            <Notification />
            {isLoading && (
              <CircularProgress
                className="app-loader"
                color="#fff"
                size={width === 1 ? 20 : 30}
                thickness={2}
                style={styles.loader}
              />
            )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

CustomLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  catchAll: componentPropType,
  customRoutes: PropTypes.array,
  dashboard: componentPropType,
  isLoading: PropTypes.bool.isRequired,
  logout: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
  menu: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  setSidebarVisibility: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
  width: PropTypes.number
};

CustomLayout.defaultProps = {
  theme: defaultTheme
};

function mapStateToProps(state) {
  return {
    isLoading: state.admin.loading > 0
  };
}

const enhance = compose(
  connect(mapStateToProps, {
    setSidebarVisibility: setSidebarVisibilityAction
  }),
  withWidth()
);

export default enhance(CustomLayout);