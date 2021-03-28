// NOTE This file allows you to write code that will be run before and after every ajax call

/* eslint-disable no-fallthrough */
/* eslint-disable arrow-body-style */
import React from 'react';
import axios from 'axios';
// import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const SetAxios = (props) => {
  const { clearError, setError } = props;
  // const history = useHistory(); // You can goto another route automatically = history.push("/mypath")
  // const location = useLocation(); // Route of current page = location.pathname

  SetAxios.setAxiosHeaders();

  axios.interceptors.request.use(
    (request) => {
      // Add code to be run before an ajax call is made HERE
      clearError();
      return request;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => {
      // Add code to be run after a successful ajax call HERE
      return response;
    },
    (error) => {
      switch (error.response.status) {
        case 401:
        //  history.push(LOGIN_ROUTE); // example to forward to another page
        // break;
        case 403:
        // break;
        case 404:
        // break;
        case 500:
        // break;
        default:
          setError(SetAxios.UNKNOWN_ERROR);
          break;
      }
      return Promise.reject(error);
    }
  );

  return <div />;
};

SetAxios.propTypes = {
  clearError: PropTypes.func,
  setError: PropTypes.func,
};
SetAxios.defaultProps = { clearError: () => {}, setError: () => {} };

SetAxios.setAxiosHeaders = (token) => {
  // Set common headers like authorization HERE
  // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

SetAxios.UNKNOWN_ERROR = 'An unknown error has occurred. Please try again.';

export default SetAxios;
