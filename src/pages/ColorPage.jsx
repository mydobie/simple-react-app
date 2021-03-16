// EXAMPLE: Form validation page (Select colors)

/*
Example of an application that validates form input.
If the field is empty, so warning is shown and the submit button is inactive
If the field entry is invalid, a warning is shown and the submit button is inactive
If the field entry is valid, a confirmation page is show and the submit button is active
*/
import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  FormFeedback,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

// EXAMPLE: Class based component
export default class ColorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color, // color entered in by the user
      isColorInvalid: false, // is the color entered invalid
      isColorValid: false, // is the color entered valid
    };

    this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

    //  Custom methods that need to have the 'this' variable bound
    this.handleColorChange = this.handleColorChange.bind(this);
    this.colorButton = this.colorButton.bind(this);
  }

  componentDidMount() {
    const { color } = this.state;
    // Validate color as soon as the component mounts
    this.validateColorField(color);
  }

  // EXAMPLE: Event listener
  // The method is called when the text input below is changed
  handleColorChange(event) {
    const enteredColor = event.target.value;
    this.setState({ color: event.target.value });
    this.validateColorField(enteredColor);
  }

  validateColorField(enteredColor) {
    // EXAMPLE: Form field validation
    // This sets state values.  The visibility and validity of other elements
    // look at the state values
    if (enteredColor.length === 0) {
      return this.setState({ isColorInvalid: false, isColorValid: false });
    }
    const index = this.colors.findIndex((color) => color === enteredColor);

    if (index === -1) {
      // color is entered, but not found in color array
      return this.setState({ isColorInvalid: true, isColorValid: false });
    }
    // color is entered and found in the color array
    return this.setState({ isColorInvalid: false, isColorValid: true });
  }

  colorButton() {
    const { isColorValid } = this.state;
    const button = (
      <Button color='success' disabled={!isColorValid}>
        Go to homepage
      </Button>
    );

    // EXAMPLE: Linking to a route the application (prevents page reload)
    return isColorValid === true ? <Link to='/'>{button}</Link> : button;
  }

  render() {
    const { isColorInvalid, isColorValid, color } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <h1>Sample Form with Validation</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for='myColor'>Enter a primary or secondary color:</Label>
              {/* EXAMPLE: Reactstrap invalid/valid settings */}
              <Input
                type='test'
                name='color'
                id='myColor'
                value={color}
                onChange={this.handleColorChange}
                invalid={isColorInvalid}
                valid={isColorValid}
              />
              <FormFeedback>You have entered in an invalid color</FormFeedback>
              <FormFeedback valid>Sweet! that is a valid color</FormFeedback>
            </FormGroup>
            {this.colorButton()}
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
