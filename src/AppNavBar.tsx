// Main navigation bar

import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import ROUTES from './AppRouteNames';

const AppNavBar = (): ReactElement => (
  <nav>
    <Nav>
      <Nav.Item>
        <NavLink activeClassName='active' className='nav-link' to={ROUTES.HOME}>
          Home
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink
          activeClassName='active'
          className='nav-link'
          to={ROUTES.VERSION}
        >
          Version
        </NavLink>
      </Nav.Item>
    </Nav>
  </nav>
);

export default AppNavBar;
