// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import ROUTES from './AppRouteNames';

import Home from './pages/Home';
import Version from './pages/Version';
import FourOhFour from './pages/FourOhFour';
import { FeatureFlagsUI } from 'feature-flags';
import { isProd } from './js/whichEnv';

const AppRoutes = (): ReactElement => (
  <>
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path='/home' element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.VERSION} element={<Version />} />
      {!isProd() ? (
        <Route path={ROUTES.FEATURE_FLAGS} element={<FeatureFlagsUI />} />
      ) : null}
      <Route path='*' element={<FourOhFour />} />
    </Routes>
  </>
);

export default AppRoutes;
