// NOTE This is a sample page and should either be
// modified or removed from a real project

import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Jumbotron } from 'reactstrap';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { helloMessage } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className='display-3' id='helloId'>
                {helloMessage}
              </h1>
              <p className='lead'>This is the home page for an application</p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

Home.propTypes = {
  helloMessage: PropTypes.string,
};
Home.defaultProps = {
  helloMessage: 'Hello, World!',
};
