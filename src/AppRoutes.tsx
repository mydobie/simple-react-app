// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      {/* EXAMPLE: Route with a redirect*/}
      <Route path='/home' element={<Navigate to={ROUTES.HOME} />} />
      {/* EXAMPLE: Route with values in url */}
      <Route path={ROUTES.COLOR} element={<Color />}>
        <Route
          path={`:${ROUTES.COLOR_PARAMS.COLOR_NAME}`}
          element={<Color />}
        />
      </Route>
      <Route path={ROUTES.REDIRECT} element={<RedirectPage />} />
      {/* EXAMPLE: Route to a component without props */}
      <Route path={ROUTES.UNIVERSITIES} element={<University />} />
      <Route path={ROUTES.VERSION} element={<Version />} />
      {/* EXAMPLE: Use which env methods to determine what is displayed */}
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
      FeatureFlagsUI
      {/* EXAMPLE: Route to 404 page
              NOTE: this needs to be the last in the switch */}
      <Route path='*' element={<FourOhFour />} />
    </Routes>
  </>
);

export default AppRoutes;
