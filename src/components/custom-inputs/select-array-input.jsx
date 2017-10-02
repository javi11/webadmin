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
import get from 'lodash.get';
import ChipInput from 'material-ui-chip-input';

import { translate as aorTranslate, FieldTitle } from 'admin-on-rest';

const dataSourceConfig = { text: 'text', value: 'value' };
const extractIds = eventOrValue => {
  const value =
    eventOrValue.target && eventOrValue.target.value ? eventOrValue.target.value : eventOrValue;
  if (Array.isArray(value)) {
    return value.map(o => o.value);
  }
  return [value];
};

export class SelectArrayInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentWillMount() {
    this.setState({
      values: this.getChoicesForValues(this.props.input.value || [], this.props.choices)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.choices !== nextProps.choices ||
      this.props.input.value !== nextProps.input.value
    ) {
      this.setState({
        values: this.getChoicesForValues(nextProps.input.value || [], nextProps.choices)
      });
    }
  }

  getChoicesForValues(values, choices = []) {
    const { optionValue, optionText } = this.props;
    if (!values || !Array.isArray(values)) {
      throw Error('Value of SelectArrayInput should be an array');
    }
    return values
      .map(
        value =>
          choices.find(c => c[optionValue] === value) || {
            [optionValue]: value,
            [optionText]: value
          }
      )
      .map(this.formatChoice());
  }

  handleFocus() {
    return () => {
      const extracted = extractIds(this.state.values);
      this.props.onFocus(extracted);
      this.props.input.onFocus(extracted);
    };
  }

  handleAdd() {
    return newValue => {
      const values = [...this.state.values, newValue];
      this.setState({ values });
      this.handleChange(values);
    };
  }

  handleDelete() {
    return newValue => {
      const values = this.state.values.filter(v => v.value !== newValue);
      this.setState({ values });
      this.handleChange(values);
    };
  }

  handleChange(eventOrValue) {
    const extracted = extractIds(eventOrValue);
    this.props.onChange(extracted);
    this.props.input.onChange(extracted);
  }

  handleBlur() {
    return () => {
      const extracted = extractIds(this.state.values);
      this.props.onBlur(extracted);
      this.props.input.onBlur(extracted);
    };
  }

  formatChoice() {
    return choice => {
      const { optionText, optionValue, translateChoice, translate } = this.props;
      const choiceText =
        typeof optionText === 'function' ? optionText(choice) : get(choice, optionText);
      return {
        value: get(choice, optionValue),
        text: translateChoice ? translate(choiceText, { _: choiceText }) : choiceText
      };
    };
  }

  formatChoices(choices) {
    return () => choices.map(this.formatChoice());
  }

  /**
   * Handle on paste elements, split by ','
   */
  handleOnPaste() {
    return event => {
      const clipboardText = event.clipboardData.getData('Text');
      event.preventDefault();
      const newValues = clipboardText
        .split(',')
        .filter(t => t.length > 0)
        .map(t => ({ text: t, value: t }));
      const values = [...this.state.values, ...newValues];
      this.setState({ values });
      this.handleChange(values);
    };
  }

  render() {
    const {
      elStyle,
      input,
      isRequired,
      choices,
      label,
      meta,
      options,
      resource,
      source,
      setFilter
    } = this.props;
    if (typeof meta === 'undefined') {
      throw new Error(
        "The SelectArrayInput component wasn't called within a redux-form <Field>. Did you decorate it and forget to add the addField prop to your component? See https://marmelab.com/admin-on-rest/Inputs.html#writing-your-own-input-component for details."
      );
    }
    const { touched, error } = meta;

    return (
      <ChipInput
        {...input}
        value={this.state.values}
        onBlur={this.handleBlur()}
        onFocus={this.handleFocus()}
        onClick={this.handleFocus()}
        onRequestAdd={this.handleAdd()}
        onRequestDelete={this.handleDelete()}
        onUpdateInput={setFilter}
        floatingLabelText={
          <FieldTitle label={label} source={source} resource={resource} isRequired={isRequired} />
        }
        onPaste={this.handleOnPaste()}
        errorText={touched && error}
        style={elStyle}
        dataSource={this.formatChoices(choices)()}
        dataSourceConfig={dataSourceConfig}
        openOnFocus
        {...options}
      />
    );
  }
}
SelectArrayInput.propTypes = {
  addField: PropTypes.bool.isRequired,
  elStyle: PropTypes.object,
  choices: PropTypes.arrayOf(PropTypes.object),
  input: PropTypes.object,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  setFilter: PropTypes.func,
  options: PropTypes.object,
  optionText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  optionValue: PropTypes.string.isRequired,
  resource: PropTypes.string,
  source: PropTypes.string,
  translate: PropTypes.func.isRequired,
  translateChoice: PropTypes.bool.isRequired
};

SelectArrayInput.defaultProps = {
  addField: true,
  choices: [],
  onBlur: () => true,
  onChange: () => true,
  onFocus: () => true,
  options: {},
  optionText: 'name',
  optionValue: 'id',
  translateChoice: true
};

export default aorTranslate(SelectArrayInput);
