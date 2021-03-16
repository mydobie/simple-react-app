import React from 'react';
// import PropTypes from 'prop-types';

import { Container, Row, Col } from 'reactstrap';
import { isFeatureActive, FeatureFlagsUI } from 'feature_flags';
import { COLORS, DINOS } from '../feature-flags.config';

export default class FeatureFlags extends React.Component {
  static colorList() {
    return (
      <div>
        <h2>Primary Colors of Light</h2>
        <ul>
          <li>Red</li>
          <li>Green</li>
          <li>Blue</li>
        </ul>
      </div>
    );
  }

  static dinoList() {
    return (
      <div>
        <h2>Common Dinosaurs</h2>
        <ul>
          <li>Pterodactyl</li>
          <li>Lirainosaurus</li>
          <li>Iguanodon</li>
        </ul>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Features based on feature flags</h1>
            <p>
              {`This page as a read only view of which features are active along
              with simple sections below based on feature flag status. Please
              use the 'Feature flags' option in the main navigation to change the
              status of a feature flag.`}
            </p>
            {/* EXAMPLE: List feature flags (read only) */}
            <FeatureFlagsUI readonly />
            <hr />
            {/* EXAMPLE: Show/Hide based on feature flag */}
            {isFeatureActive(COLORS) ? FeatureFlags.colorList() : null}
            {isFeatureActive(DINOS) ? FeatureFlags.dinoList() : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

FeatureFlags.propTypes = {};
FeatureFlags.defaultProps = {};
