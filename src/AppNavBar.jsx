// Main navigation bar

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';

// START FEATURE FLAGS
import { isProd } from './js/whichEnv';
// END FEATURE FLAGS

const AppNavBar = () => (
  <nav>
    <Nav>
      <NavItem>
        <NavLink activeClassName='active' className='nav-link' to='/'>
          Home
        </NavLink>
      </NavItem>

      {/* // START FEATURE FLAGS */}
      {/* Only show feature flags UI for non production */}
      {!isProd() ? (
        <NavItem>
          <NavLink
            activeClassName='active'
            className='nav-link'
            to='/featureflags'
          >
            Feature flags
          </NavLink>
        </NavItem>
      ) : null}
      {/* // END FEATURE FLAGS */}

      <NavItem>
        <NavLink activeClassName='active' className='nav-link' to='/version'>
          Version
        </NavLink>
      </NavItem>
    </Nav>
  </nav>
);

export default AppNavBar;
