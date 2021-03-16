/*
Simple component to display a loading icon
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';

const Loading = (props) => {
  const { size, color, children } = props;
  return (
    <Spinner style={{ width: size, height: size, color }}>{children}</Spinner>
  );
};

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.string,
};
Loading.defaultProps = {
  color: '#6c757d',
  size: '60px',
  children: 'Loading',
};

export default Loading;
