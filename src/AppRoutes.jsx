// Contains routing for entire application

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'; // HashRouter as Router // Good for when you can't control the URL ... like GitHub pages
import PropTypes from 'prop-types';

// FEATURE FLAGS
import { FeatureFlagsUI } from 'feature_flags';
import { isProd } from './js/whichEnv';
// END FEATURE FLAGS

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
        <Route path='/' exact>
          <Home />
        </Route>

        {/* EXAMPLE: Route with a redirect */}
        <Route path='/home' exact>
          <Redirect to='/' />
        </Route>

        {/* EXAMPLE Route with values in url 
              NOTE: the ? marks an optional value */}
        <Route
          path='/color/:colorName?'
          render={(colorprops) => (
            <ColorPage color={colorprops.match.params.colorName || ''} />
          )}
        />

        <Route path='/dinos'>
          <DinoPage />
        </Route>

        <Route path='/redirect'>
          <RedirectPage />
        </Route>

        {/* EXAMPLE: Route to a component without props */}
        <Route path='/version'>
          <Version />
        </Route>

        {/* EXAMPLE: Feature flag UI */}
        {/* // START FEATURE FLAGS */}
        {/* Only show feature flags UI for non production */}
        {!isProd() ? (
          <Route path='/featureflags'>
            <FeatureFlagsUI onFeatureChange={onFeatureChange} />
          </Route>
        ) : null}
        {/* // END FEATURE FLAGS */}

        <Route path='/samplefeatureflags'>
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
