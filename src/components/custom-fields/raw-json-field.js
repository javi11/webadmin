import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import get from 'lodash.get';

export const RawJsonField = ({ record, source }) => (
  <pre>
    <ReactJson collapseStringsAfterLength="5" collapsed="true" src={get(record, source)} />
  </pre>
);

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
