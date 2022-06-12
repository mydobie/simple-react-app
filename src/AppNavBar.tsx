// Main navigation bar

import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import ROUTES from './AppRouteNames';
import { isProd } from './js/whichEnv';

const activeClass = (isActive: boolean) =>
  `nav-link ${isActive ? 'active' : ''}`;

// EXAMPLE: Navigation bar
const AppNavBar = (): ReactElement => (
  <nav>
    <Nav>
      <Nav.Item>
        <NavLink
          className={({ isActive }) => activeClass(isActive)}
          to={ROUTES.HOME}
        >
          Home
        </NavLink>
      </Nav.Item>

      {!isProd() ? (
        <Nav.Item>
          <NavLink
            className={({ isActive }) => activeClass(isActive)}
            to={ROUTES.FEATURE_FLAGS}
          >
            Feature flags
          </NavLink>
        </Nav.Item>
      ) : null}

      <Nav.Item>
        <NavLink
          className={({ isActive }) => activeClass(isActive)}
          to={ROUTES.VERSION}
        >
          Version
        </NavLink>
      </Nav.Item>
    </Nav>
  </nav>
);

export default AppNavBar;
