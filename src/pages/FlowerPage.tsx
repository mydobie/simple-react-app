import React, { ReactElement } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import ROUTES from '../AppRouteNames';

// passing pathname ensure that the wanted tab is active if route is to only this page ('flowers')
const activeClass = (isActive: boolean, pathname = '') =>
  `nav-link ${isActive || pathname === ROUTES.FLOWERS ? 'active' : ''}`;

const FlowerPage = (): ReactElement => {
  const here = useLocation().pathname?.replaceAll('/', '');

  return (
    <>
      <Row>
        <Col>
          <h1>Flowers</h1>
          <p data-testid='pagecontent'>
            Cupcake ipsum dolor sit amet lollipop pie cake. Tiramisu donut lemon
            drops cake halvah marshmallow I love cotton candy. Cookie icing
            tootsie roll macaroon halvah jelly-o. Tart cookie gummi bears
            chocolate bar toffee pudding liquorice. Danish tart gummi bears
            chocolate cake icing. Cake I love caramels caramels chupa chups
            fruitcake. Dessert I love shortbread I love toffee jelly beans.
            Chocolate fruitcake gingerbread biscuit sugar plum shortbread.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Nav variant='tabs' defaultActiveKey='/home'>
            <Nav.Item>
              <NavLink
                data-testid='tuliptab'
                className={({ isActive }) => activeClass(isActive, here)}
                to={ROUTES.FLOWER_TABS.TULIPS}
              >
                Tulips
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                data-testid='dasiestab'
                className={({ isActive }) => activeClass(isActive)}
                to={ROUTES.FLOWER_TABS.DAISIES}
              >
                Daisies
              </NavLink>
            </Nav.Item>
          </Nav>
          {/* EXAMPLE: Bootstrap utility classes */}
          {/* See: https://getbootstrap.com/docs/5.1/utilities/api/ */}
          <div className='p-4 border-end border-bottom border-start'>
            {/* EXAMPLE: Nested routes */}
            <Outlet />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FlowerPage;
