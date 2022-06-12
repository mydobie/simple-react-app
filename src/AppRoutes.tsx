// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path='/home' element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.VERSION} element={<Version />} />
      {/* // START FEATURE FLAGS */}
      {!isProd() ? (
        <Route
          path={ROUTES.FEATURE_FLAGS}
          element={
            <FeatureFlagsUI
              onFeatureChange={() => {
                onFeatureChange(); // this is passed to AppRoutes to force an app rerender
              }}
            />
          }
        />
      ) : null}
      {/* // END FEATURE FLAGS */}
      <Route path='*' element={<FourOhFour />} />
    </Routes>
  </>
);

export default AppRoutes;
