// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { FeatureFlagsUI } from 'feature-flags/react';
import { isProd } from './js/whichEnv';

import ROUTES from './AppRouteNames';

import Home from './pages/Home';
import Version from './pages/Version';
import Color from './pages/ColorPage';
import RedirectPage from './pages/RedirectPage';
import University from './pages/UniversityPages';
import FourOhFour from './pages/FourOhFour';

interface Props {
  onFeatureChange?: (flagId?: string, isActive?: boolean) => void;
}

const AppRoutes = ({ onFeatureChange = () => {} }: Props): ReactElement => (
  <>
    <Switch>
      <Route path={ROUTES.HOME} exact>
        <Home />
      </Route>
      {/* EXAMPLE: Route with a redirect */}
      <Route path='/home' exact>
        <Redirect to={ROUTES.HOME} />
      </Route>

      <Route
        path={ROUTES.COLOR('colorName')}
        render={(colorprops) => (
          <Color startingColor={colorprops.match.params.colorName || ''} />
        )}
      />

      <Route path={ROUTES.REDIRECT}>
        <RedirectPage />
      </Route>

      {/* EXAMPLE: Route to a component without props */}
      <Route path={ROUTES.UNIVERSITIES}>
        <University />
      </Route>

      <Route path={ROUTES.VERSION}>
        <Version />
      </Route>

      {/* // START FEATURE FLAGS */}
      {!isProd() ? (
        <Route path={ROUTES.FEATURE_FLAGS}>
          <FeatureFlagsUI
            onFeatureChange={() => {
              onFeatureChange(); // this is passed to AppRoutes to force an app rerender
            }}
          />
        </Route>
      ) : null}
      {/* // END FEATURE FLAGS */}
      <Route path='/'>
        <FourOhFour />
      </Route>
    </Switch>
  </>
);

export default AppRoutes;
