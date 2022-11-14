// Main navigation bar

import React, { ReactElement, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { isProd } from './js/whichEnv';
import ROUTES from './AppRouteNames';

const NavItem: React.FC<PropsWithChildren<{ to: string; end?: boolean }>> = ({
  to,
  end,
  children,
}) => (
  <Nav.Item>
    <NavLink
      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      to={to}
      end={end}
    >
      {children}
    </NavLink>
  </Nav.Item>
);

const AppNavBar = (): ReactElement => (
  <nav>
    <Nav>
      <NavItem to={ROUTES.HOME} end>
        Home
      </NavItem>
      {!isProd() ? (
        <NavItem to={ROUTES.FEATURE_FLAGS}>Feature flags</NavItem>
      ) : null}
      <NavItem to={ROUTES.VERSION}>Version</NavItem>
    </Nav>
  </nav>
);

export default AppNavBar;
