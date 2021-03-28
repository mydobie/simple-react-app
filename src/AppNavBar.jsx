// Main navigation bar

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import {
  HOME_ROUTE,
  VERSION_ROUTE,
  FEATURE_FLAGS_ROUTE,
} from './AppRouteNames';

// START FEATURE FLAGS
import { isProd } from './js/whichEnv';
// END FEATURE FLAGS

const AppNavBar = () => (
  <nav>
    <Nav>
      <Nav.Item>
        <NavLink activeClassName='active' className='nav-link' to={HOME_ROUTE}>
          Home
        </NavLink>
      </Nav.Item>

      {/* // START FEATURE FLAGS */}
      {/* Only show feature flags UI for non production */}
      {!isProd() ? (
        <Nav.Item>
          <NavLink
            activeClassName='active'
            className='nav-link'
            to={FEATURE_FLAGS_ROUTE}
          >
            Feature flags
          </NavLink>
        </Nav.Item>
      ) : null}
      {/* // END FEATURE FLAGS */}

      <Nav.Item>
        <NavLink
          activeClassName='active'
          className='nav-link'
          to={VERSION_ROUTE}
        >
          Version
        </NavLink>
      </Nav.Item>
    </Nav>
  </nav>
);

export default AppNavBar;
