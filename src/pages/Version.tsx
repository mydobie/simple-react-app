// Page that shows the application name and version from package.json file
// Along with the git commit.
// Note this file should be used in most applications
// Normally there isn't a need to modify it
import React, { ReactElement } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FeatureFlagsUI } from 'feature-flags/react';
import { useGetVersion } from '../js/getVersion';

const Version = (/* props */): ReactElement => {
  const [version] = useGetVersion();

  return (
    <>
      <Row data-testid='versionPageContainer'>
        <Col>
          <h1>Version</h1>
          <ul>
            <li>
              <strong>Application Name: </strong>
              <span id='appNameFromPackageJson'>
                {process.env.REACT_APP_NAME}
              </span>
            </li>
            <li>
              <strong>Version: </strong>
              <span id='appVersionFromPackageJson'>
                {process.env.REACT_APP_VERSION}
              </span>
            </li>
            <li>
              <strong>Git Commit: </strong>
              <span id='gitCommitHash'>{process.env.REACT_APP_GIT_SHA}</span>
            </li>
            <li>
              <strong>State persists on refresh: </strong>
              {process.env.REACT_APP_USE_LOCAL_STORAGE
                ? process.env.REACT_APP_USE_LOCAL_STORAGE
                : 'false'}
            </li>
          </ul>
          <h2>Dependencies</h2>
          {/* Be careful sharing what dependencies that are are in use.  You don't want to notify users of dependencies that have known security vulnerabilities */}
          <ul>
            <li>
              <strong>React: </strong>
              {React.version}
            </li>
            {version.bootstrap ? (
              <li>
                <strong>Bootstrap: </strong>
                {version.bootstrap}
              </li>
            ) : null}
            {version.featureFlags ? (
              <li>
                <strong>Feature Flags: </strong>
                {version.featureFlags}
              </li>
            ) : null}
          </ul>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h1>Feature flags</h1>
          <p>The current status of feature flags:</p>
          {/* EXAMPLE: List feature flags (read only) */}
          <FeatureFlagsUI readonly />
        </Col>
      </Row>
    </>
  );
};

export default Version;
