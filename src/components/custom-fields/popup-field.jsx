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
import Dialog from 'material-ui/Dialog';
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

  handleOpen() {
    return () => this.setState({ open: true });
  }

  handleClose() {
    return () => this.setState({ open: false });
  }

  render() {
    const { record, children, elStyle, label, source, translate } = this.props;
    const child = React.cloneElement(children, {
      record,
      elStyle,
      label,
      source
    });
    return (
      <div>
        <RaisedButton label={translate(label)} onClick={this.handleOpen()} />
        <Dialog
          actions={[
            <FlatButton
              label={translate('axa.popup.dismiss')}
              primary
              onClick={this.handleClose()}
            />
          ]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose()}
        >
          {child}
        </Dialog>
      </div>
    );
  }
}

PopupField.propTypes = {
  source: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  record: PropTypes.object,
  elStyle: PropTypes.object,
  label: PropTypes.string,
  translate: PropTypes.func.isRequired
};

PopupField.defaultProps = {
  label: null,
  record: null,
  elStyle: null
};

const enhance = compose(pure, aorTranslate);

export default enhance(PopupField);
