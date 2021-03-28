import React from 'react';
// import PropTypes from 'prop-types';
// import {  } from 'react-bootstrap';

const SAMPLE_NO_STATE = (props) => {
  // const {} = props;

  const myVar = 'Hello world';
  return (
    <div>
      <strong>CONTENT GOES HERE - {myVar}</strong>
    </div>
  );
};
SAMPLE_NO_STATE.propTypes = {};
SAMPLE_NO_STATE.defaultProps = {};

export default SAMPLE_NO_STATE;
