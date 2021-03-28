// EXAMPLE: Alert component
/* 
This component takes errors, warnings, or success messages
See propTypes at the end of the file for options
*/

/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const Errors = (props) => {
  const { errorArray, children, title, type, displayAsHTML } = props;

  const buildFromArray = errorArray.map((error, index) =>
    displayAsHTML === true ? (
      <p key={index} dangerouslySetInnerHTML={{ __html: error }} />
    ) : (
      <p key={index}>{error}</p>
    )
  );

  const color = {
    error: 'danger',
    warning: 'warning',
    success: 'success',
    info: 'info',
  };
  return (
    <Alert variant={color[type]}>
      {title !== '' ? <h2 className='alertTitle'>{title}</h2> : null}
      {children !== '' ? children : buildFromArray}
    </Alert>
  );
};

export default Errors;

Errors.propTypes = {
  // array of messages to be displayed in a single box
  // Example => <Alert errorArray={['I am an error']} />
  // You need to use errorArray OR children (not both)
  errorArray: PropTypes.arrayOf(PropTypes.string),

  // Elements displayed in the box.  Example => <Alert><p>I am an error</p></Alert>
  children: PropTypes.node,

  // Title displayed at the top of the box.  Defaults to not shown
  title: PropTypes.string,

  // Type of box shown.  See reactstrap Alerts for styling
  type: PropTypes.oneOf(['error', 'warning', 'success', ' info']),

  // IF html is passed as part of the errorArray, display them as html
  // WARNING: use with caution, do NOT use if user entered messages
  // or message from another system (databases, api, ajax)are displayed
  displayAsHTML: PropTypes.bool,
};
Errors.defaultProps = {
  errorArray: [],
  children: '',
  title: '',
  type: 'error',
  displayAsHTML: false,
};
