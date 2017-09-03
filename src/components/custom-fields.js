import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';

const RawJsonField = ({ record, source }) =>
  <pre>
    <ReactJson src={record[source]} />
  </pre>;

RawJsonField.propTypes = {
  addLabel: PropTypes.bool,
  elStyle: PropTypes.object,
  label: PropTypes.string,
  source: PropTypes.string.isRequired,
  record: PropTypes.object
};

RawJsonField.defaultProps = {
  addLabel: true
};

export { RawJsonField };
