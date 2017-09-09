import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

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
export class EmbeddedArrayField extends Component {
  state = {
    showRowHover: false,
    selectable: false,
    showCheckboxes: false,
    hoverable: false
  };

  render() {
    const { children, source, record } = this.props;
    const elements = get(record, source) || [];
    return (
      <div>
        <Table selectable={this.state.selectable}>
          <TableHeader displaySelectAll={this.state.showCheckboxes}>
            <TableRow>
              {React.Children.map(children, child => (
                <TableHeaderColumn key={child.props.label}>
                  {`${child.props.label}`}
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
                <TableRow key={i} hoverable={this.state.hoverable}>
                  {React.Children.map(
                    children,
                    (child, index) =>
                      child &&
                      <TableRowColumn key={index}>
                        {React.cloneElement(child, {
                          source: `${source}[${i}].${child.props.source}`,
                          record
                        })}
                      </TableRowColumn>
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
  addLabel: PropTypes.bool,
  basePath: PropTypes.string,
  children: PropTypes.node.isRequired,
  data: PropTypes.object,
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired
};

EmbeddedArrayField.defaultProps = {
  addLabel: true
};
