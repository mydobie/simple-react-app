// EXAMPLE: Form validation page (Select colors)

/*
Example of an application that validates form input.
If the field is empty, no warning is shown and the submit button is inactive
If the field entry is invalid, a warning is shown and the submit button is inactive
If the field entry is valid, a confirmation message is show and the submit button is active
*/
import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// EXAMPLE: Class based component
export default class ColorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: props.color, isInvalid: false, isValid: false };

    this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
    this.onColorChange = this.onColorChange.bind(this);
  }

  componentDidMount() {
    const { color } = this.props;
    this.onColorChange(color);
  }

  // EXAMPLE: Event listener
  // The method is called when the text input below is changed
  onColorChange(color) {
    let isValid;
    let isInvalid;

    // EXAMPLE: Form field validation
    if (color === '') {
      isValid = false;
      isInvalid = false;
    } else if (this.colors.find((c) => c === color.toLowerCase())) {
      isValid = true;
      isInvalid = false;
    } else {
      isValid = false;
      isInvalid = true;
    }
    this.setState({ isValid, isInvalid, color });
  }

  colorButton() {
    const { isValid } = this.state;
    const button = (
      <Button variant='success' disabled={!isValid}>
        Go to homepage
      </Button>
    );

    // EXAMPLE: Linking to a route the application (prevents page reload)
    return isValid === true ? <Link to='/'>{button}</Link> : button;
  }

  render() {
    const { color, isValid, isInvalid } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <h1>Sample Form with Validation</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId='myColor'>
              <Form.Label>Primary or secondary color</Form.Label>
              {/* EXAMPLE: React-Bootstrap invalid/valid settings */}
              <Form.Control
                type='text'
                name='color'
                value={color}
                isValid={isValid}
                isInvalid={isInvalid}
                onChange={(event) => this.onColorChange(event.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Please enter a primary or secondary color
              </Form.Control.Feedback>
            </Form.Group>
            <p>{this.colorButton()}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

ColorPage.propTypes = {
  color: PropTypes.string,
};
ColorPage.defaultProps = {
  color: '',
};
