// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FeatureFlagsUI } from 'feature-flags/react';
import { isProd } from './js/whichEnv';

import ROUTES from './AppRouteNames';

import Home from './pages/Home';
import Version from './pages/Version';
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

      <Route path={ROUTES.VERSION}>
        <Version />
      </Route>

      {!isProd() ? (
        <Route path={ROUTES.FEATURE_FLAGS}>
          <FeatureFlagsUI
            onFeatureChange={() => {
              onFeatureChange(); // this is passed to AppRoutes to force an app rerender
            }}
          />
        </Route>
      ) : null}

      <Route path='/'>
        <FourOhFour />
      </Route>
    </Switch>
  </>
);

export default AppRoutes;
