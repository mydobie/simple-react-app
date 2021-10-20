// EXAMPLE: Form validation page (Select colors)

/*
Example of an application that validates form input.
If the field is empty, no warning is shown and the submit button is inactive
If the field entry is invalid, a warning is shown and the submit button is inactive
If the field entry is valid, a confirmation message is show and the submit button is active
*/
import React, { ReactElement, useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ROUTES from '../AppRouteNames';

// ** Main component type */
type ColorPageProps = {
  startingColor: string;
};

// *** Main component ***
const ColorPage = ({ startingColor }: ColorPageProps): ReactElement => {
  const acceptedColors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

  const [color, setColor] = useState(startingColor);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // EXAMPLE: Event listener
  // The method is called when the text input below is changed
  const onColorChange = (enteredColor: string): void => {
    // EXAMPLE: Form field validation
    if (enteredColor === '') {
      setIsValid(false);
      setIsInvalid(false);
    } else if (
      acceptedColors.some(
        (c) => enteredColor && c === enteredColor.toLowerCase()
      )
    ) {
      setIsValid(true);
      setIsInvalid(false);
    } else {
      setIsValid(false);
      setIsInvalid(true);
    }
    setColor(enteredColor);
  };

  useEffect(() => {
    onColorChange(startingColor);
    // Only run on component load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorButton = (): ReactElement => {
    const button = (
      <Button variant='success' disabled={!isValid} data-testid='homeButton'>
        Go to homepage
      </Button>
    );

    // EXAMPLE: Linking to a route the application (prevents page reload)
    return isValid === true ? <Link to={ROUTES.HOME}>{button}</Link> : button;
  };

  // *** Return ***
  return (
    <>
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
              data-testid='colorTextInput'
              type='text'
              name='color'
              value={color}
              isValid={isValid}
              isInvalid={isInvalid}
              onChange={(event) => onColorChange(event.target.value)}
            />
            <Form.Control.Feedback
              data-testid='validMessage'
              data-valid={isValid}
            >
              Looks good!
            </Form.Control.Feedback>
            <Form.Control.Feedback
              type='invalid'
              data-testid='invalidMessage'
              data-invalid={isInvalid}
            >
              Please enter a primary or secondary color
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingTop: '20px' }}>{colorButton()}</Col>
      </Row>
    </>
  );
};

export default ColorPage;
