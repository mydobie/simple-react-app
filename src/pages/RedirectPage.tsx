/* NOTE:

There are two ways to automatically direct a user to a given route:
1. Use the useNavigate Hook 
2. Use Navigate component (less ideal)
*/

import React, { ReactElement, useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Needed for method 1
// import {  Navigate, useNavigate  } from 'react-router'; // Needed for method 2
import { Link } from 'react-router-dom';

import ROUTES from '../AppRouteNames';

// *** Main component ***
const RedirectPage = (): ReactElement => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) {
      // EXAMPLE: Automatically forwarding to a route (without a button click)
      // For method 1
      return navigate(ROUTES.HOME);
      return;
    }
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <>
      <Row>
        <Col>
          <h1>Redirect</h1>
          <p>
            You will automatically be directed to the home page in {count}{' '}
            seconds!
          </p>
          {/* Redirect component only used in method 2 */}
          {/* {count <= 0 ? <Navigate to={ROUTES.HOME} /> : null} */}
          <p>
            <Link to={ROUTES.HOME}>Go to home page</Link>
          </p>
          <p>
            <Button
              onClick={() => {
                navigate(ROUTES.HOME);
              }}
              data-testid='goToHomeButton'
            >
              Go to home page
            </Button>
          </p>
        </Col>
      </Row>
    </>
  );
};

export default RedirectPage;
