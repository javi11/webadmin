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
import inflection from 'inflection';
import compose from 'recompose/compose';
import { DashboardMenuItem, MenuItemLink, translate as aorTranslate } from 'admin-on-rest';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%'
  }
};

const translatedResourceName = (resource, translate) =>
  translate(`resources.${resource.name}.name`, {
    smart_count: 2,
    _: resource.options && resource.options.label
      ? translate(resource.options.label, { smart_count: 2, _: resource.options.label })
      : inflection.humanize(inflection.pluralize(resource.name))
  });

const Menu = ({ hasDashboard, onMenuTap, resources, translate }) => (
  <div style={styles.main}>
    {hasDashboard && <DashboardMenuItem onClick={onMenuTap} />}
    {resources
      .filter(r => r.list)
      .map(resource => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={translatedResourceName(resource, translate)}
          leftIcon={<resource.icon />}
          onClick={onMenuTap}
        />
      ))}
  </div>
);

Menu.propTypes = {
  hasDashboard: PropTypes.bool,
  onMenuTap: PropTypes.func,
  resources: PropTypes.array.isRequired,
  translate: PropTypes.func.isRequired
};

Menu.defaultProps = {
  onMenuTap: () => null,
  hasDashboard: null
};

const mapStateToProps = state => ({
  resources: Object.keys(state.admin.resources).map(key => state.admin.resources[key].props)
});

const enhance = compose(aorTranslate, connect(mapStateToProps));

export default enhance(Menu);
