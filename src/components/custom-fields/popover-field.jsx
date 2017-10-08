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
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover/Popover';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { translate as aorTranslate } from 'admin-on-rest';

class PopupField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleRequestClose() {
    return () =>
      this.setState({
        open: false
      });
  }

  handleTouchTap() {
    return event => {
      event.preventDefault();

      this.setState({
        open: true,
        anchorEl: event.currentTarget
      });
    };
  }

  render() {
    const {
      record,
      children,
      elStyle,
      label,
      buttonLabel,
      source,
      translate,
      options,
      buttonStyle
    } = this.props;
    const child = React.cloneElement(children, {
      record,
      elStyle,
      label,
      source
    });
    return (
      <div>
        <RaisedButton
          style={buttonStyle}
          label={translate(buttonLabel)}
          onClick={this.handleTouchTap()}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
          targetOrigin={{ horizontal: 'middle', vertical: 'center' }}
          onRequestClose={this.handleRequestClose}
          {...options}
        >
          {child}
        </Popover>
      </div>
    );
  }
}

PopupField.propTypes = {
  source: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  record: PropTypes.object,
  elStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  options: PropTypes.object,
  label: PropTypes.string,
  buttonLabel: PropTypes.string,
  translate: PropTypes.func.isRequired
};

PopupField.defaultProps = {
  label: null,
  record: null,
  elStyle: null
};

const enhance = compose(pure, aorTranslate);

export default enhance(PopupField);
