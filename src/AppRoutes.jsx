// Contains routing for entire application

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'; // HashRouter as Router // Good for when you can't control the URL ... like GitHub pages
import PropTypes from 'prop-types';

// FEATURE FLAGS
import { FeatureFlagsUI } from 'feature_flags';
import { isProd } from './js/whichEnv';
// END FEATURE FLAGS

import {
  HOME_ROUTE,
  VERSION_ROUTE,
  FEATURE_FLAGS_ROUTE,
  COLOR_ROUTE,
  DINO_ROUTE,
  REDIRECT_ROUTE,
  SAMPLE_FEATURES_ROUTE,
} from './AppRouteNames';

import Home from './pages/Home';
import Version from './pages/Version';
import FourOhFour from './pages/FourOhFour';
import ColorPage from './pages/ColorPage';
import DinoPage from './pages/DinoPage';
import RedirectPage from './pages/RedirectPage';
import FeatureFlag from './pages/FeatureFlag';

const AppRoutes = (props) => {
  const { onFeatureChange } = props;
  return (
    <div>
      <Switch>
        <Route path={HOME_ROUTE} exact>
          <Home />
        </Route>

        {/* EXAMPLE: Route with a redirect */}
        <Route path='/home' exact>
          <Redirect to={HOME_ROUTE} />
        </Route>

        {/* EXAMPLE Route with values in url 
              NOTE: the ? marks an optional value */}
        <Route
          path={`${COLOR_ROUTE}/:colorName?`}
          render={(colorprops) => (
            <ColorPage color={colorprops.match.params.colorName || ''} />
          )}
        />

        <Route path={DINO_ROUTE}>
          <DinoPage />
        </Route>

        <Route path={REDIRECT_ROUTE}>
          <RedirectPage />
        </Route>

        {/* EXAMPLE: Route to a component without props */}
        <Route path={VERSION_ROUTE}>
          <Version />
        </Route>

        {/* EXAMPLE: Feature flag UI */}
        {/* // START FEATURE FLAGS */}
        {/* Only show feature flags UI for non production */}
        {!isProd() ? (
          <Route path={FEATURE_FLAGS_ROUTE}>
            <FeatureFlagsUI onFeatureChange={onFeatureChange} />
          </Route>
        ) : null}
        {/* // END FEATURE FLAGS */}

        <Route path={SAMPLE_FEATURES_ROUTE}>
          <FeatureFlag />
        </Route>

        {/* EXAMPLE: Route to 404 page
              NOTE: this needs to be the last in the switch */}
        <Route path='/'>
          <FourOhFour />
        </Route>
      </Switch>
    </div>
  );
};

// ENABLE FOR FEATURE FLAGS
AppRoutes.propTypes = {
  onFeatureChange: PropTypes.func,
};
AppRoutes.defaultProps = {
  onFeatureChange: () => {},
};
export default AppRoutes;
