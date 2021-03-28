// Contains routing for entire application

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// FEATURE FLAGS
import { FeatureFlagsUI } from 'feature_flags';
import { isProd } from './js/whichEnv';
// END FEATURE FLAGS

import {
  HOME_ROUTE,
  VERSION_ROUTE,
  FEATURE_FLAGS_ROUTE,
} from './AppRouteNames';

import Home from './pages/Home';
import Version from './pages/Version';
import FourOhFour from './pages/FourOhFour';

const AppRoutes = (props) => {
  const { onFeatureChange } = props;

  return (
    <div>
      <Switch>
        <Route path={HOME_ROUTE} exact>
          <Home />
        </Route>

        <Route path={VERSION_ROUTE}>
          <Version />
        </Route>

        {/* // START FEATURE FLAGS */}
        {/* Only show feature flags UI for non production */}
        {!isProd() ? (
          <Route path={FEATURE_FLAGS_ROUTE}>
            <FeatureFlagsUI onFeatureChange={onFeatureChange} />
          </Route>
        ) : null}
        {/* // END FEATURE FLAGS */}

        <Route path='/'>
          <FourOhFour />
        </Route>
      </Switch>
    </div>
  );
};

AppRoutes.propTypes = {
  onFeatureChange: PropTypes.func,
};
AppRoutes.defaultProps = {
  onFeatureChange: () => {},
};
export default AppRoutes;
