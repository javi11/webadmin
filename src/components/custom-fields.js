import React from 'react';
import PropTypes from 'prop-types';

const RawJsonField = ({ record, source }) =>
  <pre>
    {JSON.stringify(record[source], null, 2)}
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
