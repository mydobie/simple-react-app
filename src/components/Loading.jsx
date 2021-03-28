/*
Simple component to display a loading icon
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

const Loading = (props) => {
  const { size, color, children } = props;
  return (
    <div style={{ display: 'inline-block' }}>
      <Spinner
        style={{ width: size, height: size }}
        variant={color}
        animation='border'
      />
      <span className='sr-only'>{children}</span>
    </div>
  );
};

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.string,
};
Loading.defaultProps = {
  color: 'secondary',
  size: '60px',
  children: 'Loading',
};

export default Loading;
