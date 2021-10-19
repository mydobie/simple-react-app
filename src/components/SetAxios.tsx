// NOTE This file allows you to write code that will be run before and after every ajax call

/* eslint-disable no-fallthrough */

import React, { ReactElement } from 'react';
import axios from 'axios';
// import { useHistory, useLocation } from 'react-router-dom';

// ** Main component type */
interface Props {
  clearError?: () => void;
  setError?: (error?: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  testResponse?: (response: any) => void; // this is only used to test SetAxios
  testMode?: boolean;
}

// *** Main component ***
const SetAxios = ({
  clearError = () => {},
  setError = () => {},
  testResponse = () => {},
  testMode = false,
}: Props): ReactElement => {
  // const history = useHistory(); // You can goto another route automatically = history.push("/mypath")
  // const location = useLocation(); // Route of current page = location.pathname

  SetAxios.setAxiosHeaders();

  axios.interceptors.request.use(
    (config) => {
      // Add code to be run before an ajax call is made HERE
      clearError();
      return config;
    },
    (error) => (!testMode ? Promise.reject(error) : null)
  );

  axios.interceptors.response.use(
    (response) => {
      // Add code to be run after a successful ajax call HERE
      testResponse(response);
      return response;
    },
    (error) => {
      // Add code to be run after a failed ajax call HERE
      if (error.response?.status) {
        switch (error.response?.status) {
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
      } else {
        setError(SetAxios.UNKNOWN_ERROR);
      }
      return !testMode ? Promise.reject(error) : null;
    }
  );

  return <div />;
};

SetAxios.setAxiosHeaders = (/* token */) => {
  // Set common headers like authorization HERE
  // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

SetAxios.UNKNOWN_ERROR = 'An unknown error has occurred. Please try again.';

export default SetAxios;
