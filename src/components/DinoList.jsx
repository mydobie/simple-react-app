import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';

// EXAMPLE: Using styled-components
const Li = styled.li`
  font-size: 20px;
  color: #7b027b;
  font-family: serif;
  border-bottom: 1px solid #ccc;
`;

// EXAMPLE: Function based component
const DinoList = (props) => {
  const { selectedDinos } = props;
  return (
    <div>
      <Row>
        <Col>
          <h2>Your selected Dinos:</h2>
          <ul>
            {/* EXAMPLE: Using map to display items from an array */}
            {selectedDinos.map((dino) => (
              <Li key={dino.key}>
                {/* This is a styled component set above */}
                {dino.text}
              </Li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

DinoList.propTypes = {
  selectedDinos: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      key: PropTypes.string,
    })
  ),
};
DinoList.defaultProps = {
  selectedDinos: [],
};

export default DinoList;
