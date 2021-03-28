// Main navigation bar

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import {
  HOME_ROUTE,
  VERSION_ROUTE,
  FEATURE_FLAGS_ROUTE,
  COLOR_ROUTE,
  DINO_ROUTE,
  REDIRECT_ROUTE,
  SAMPLE_FEATURES_ROUTE,
} from './AppRouteNames';

// START FEATURE FLAGS
import { isProd } from './js/whichEnv';
// END FEATURE FLAGS

// EXAMPLE: Navigation bar
const AppNavBar = () => (
  <nav>
    <Nav>
      <Nav.Item>
        <NavLink activeClassName='active' className='nav-link' to={HOME_ROUTE}>
          Home
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink activeClassName='active' className='nav-link' to={COLOR_ROUTE}>
          Color Page (Simple form)
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink activeClassName='active' className='nav-link' to={DINO_ROUTE}>
          Dino Page (Ajax call)
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink
          activeClassName='active'
          className='nav-link'
          to={REDIRECT_ROUTE}
        >
          Redirect to homepage
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink
          activeClassName='active'
          className='nav-link'
          to={SAMPLE_FEATURES_ROUTE}
        >
          Feature flags in use
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
