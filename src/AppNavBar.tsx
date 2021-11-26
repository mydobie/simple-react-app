// Main navigation bar

import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import ROUTES from './AppRouteNames';

const activeClass = (isActive: boolean) =>
  `nav-link ${isActive ? 'active' : ''}`;

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
