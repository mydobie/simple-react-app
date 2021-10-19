// NOTE This is a sample page and should either be
// modified or removed from a real project

import React, { ReactElement } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

// *** Main component ***
const Home = (): ReactElement => (
  <Row data-testid='homePageContainer'>
    <Col>
      <Card bg='secondary' text='white'>
        <Card.Body>
          <h1>Sample Application </h1>
          <p>This is the home page for an application</p>
        </Card.Body>
      </Card>
      <p>
        This project can be used as template when starting other React projects.
      </p>
    </Col>
  </Row>
);

export default Home;
