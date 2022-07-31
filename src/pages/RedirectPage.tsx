import React, { ReactElement, useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import ROUTES from '../AppRouteNames';

// *** Main component ***
const RedirectPage = (): ReactElement => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) {
      // EXAMPLE: Automatically forwarding to a route (without a button click)
      navigate(ROUTES.HOME);
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
          <p>
            <Link to={ROUTES.HOME} data-testid='goToHomeLink'>
              Go to home page
            </Link>
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
