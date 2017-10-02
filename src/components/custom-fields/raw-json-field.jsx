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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import { get } from 'lodash';

class RawJsonField extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange() {
    return ({ updated_src }) => {
      this.props.input.onChange(updated_src);
      this.forceUpdate();
    };
  }

  render() {
    const { source, record, editable, input, collapsed } = this.props;

    return (
      <pre>
        <ReactJson
          {...input}
          collapseStringsAfterLength="5"
          onEdit={editable ? this.handleChange() : false}
          onAdd={editable ? this.handleChange() : false}
          collapsed={collapsed}
          src={get(record, source)}
          style={{ whiteSpace: 'normal' }}
        />
      </pre>
    );
  }
}

RawJsonField.propTypes = {
  source: PropTypes.string.isRequired,
  record: PropTypes.object,
  editable: PropTypes.bool,
  input: PropTypes.object,
  collapsed: PropTypes.bool
};

RawJsonField.defaultProps = {
  elStyle: null,
  label: null,
  record: null,
  editable: null,
  input: null,
  collapsed: true
};

export default RawJsonField;
