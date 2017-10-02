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
import { get } from 'lodash';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { translate as aorTranslate } from 'admin-on-rest';

/**
 * A container component that shows embedded array elements as a list of input sets
 *
 * You must define the fields and pass them as children.
 *
 * @example Display all the items of an order
 * // order = {
 * //   id: 123,
 * //   items: [
 * //       { qty: 1, price: 10 },
 * //       { qty: 3, price: 15 },
 * //   ],
 * // }
 * <EmbeddedArrayField source="items">
 *      <NumberField source="qty" />
 *      <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 * </EmbeddedArrayField>
 *
 */
class EmbeddedArrayField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRowHover: false,
      selectable: false,
      showCheckboxes: false,
      hoverable: false
    };
  }

  render() {
    const { children, source, record, translate } = this.props;
    const elements = get(record, source) || [];
    return (
      <div>
        <Table selectable={this.state.selectable}>
          <TableHeader displaySelectAll={this.state.showCheckboxes}>
            <TableRow>
              {React.Children.map(children, child => (
                <TableHeaderColumn key={child.props.label}>
                  {`${translate(child.props.label)}`}
                </TableHeaderColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            showRowHover={this.state.showRowHover}
          >
            {elements.map(
              (element, i) => (
                <TableRow key={element.id} hoverable={this.state.hoverable}>
                  {React.Children.map(
                    children,
                    (child, index) =>
                      child && (
                        <TableRowColumn key={index}>
                          {React.cloneElement(child, {
                            source: child.props.source,
                            record: record[source][i]
                          })}
                        </TableRowColumn>
                      )
                  )}
                </TableRow>
              ),
              this
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

EmbeddedArrayField.propTypes = {
  children: PropTypes.node.isRequired,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired
};

EmbeddedArrayField.defaultProps = {
  addLabel: true,
  record: null
};

const enhance = compose(pure, aorTranslate);

export default enhance(EmbeddedArrayField);
