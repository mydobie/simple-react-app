/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */

import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import ROUTES from '../../AppRouteNames';
import AppRoutes from '../../AppRoutes';

describe('Flower Page tests', () => {
  test('On page load - the tulips tab is active', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/${ROUTES.FLOWERS}`]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(screen.queryByTestId('pagecontent')).toBeInTheDocument();
    expect(screen.queryByTestId('tulipimage')).toBeInTheDocument();
    expect(screen.queryByTestId('daisiesimage')).not.toBeInTheDocument();

    const tabs = container.querySelectorAll('.nav-link');
    expect(tabs).toHaveLength(2);
    expect(tabs[0].classList.contains('active')).toBe(true);
    expect(tabs[1].classList.contains('active')).toBe(false);
  });

  test('On /tulips route - the tulips tab is active', () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/${ROUTES.FLOWERS}/tulips`]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('pagecontent')).toBeInTheDocument();
    expect(screen.queryByTestId('tulipimage')).toBeInTheDocument();
    expect(screen.queryByTestId('daisiesimage')).not.toBeInTheDocument();

    const tabs = container.querySelectorAll('.nav-link');
    expect(tabs).toHaveLength(2);
    expect(tabs[0].classList.contains('active')).toBe(true);
    expect(tabs[1].classList.contains('active')).toBe(false);
  });

  test('On /daisies route - the daisies tab is active', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/${ROUTES.FLOWERS}/daisies`]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(screen.queryByTestId('pagecontent')).toBeInTheDocument();
    expect(screen.queryByTestId('tulipimage')).not.toBeInTheDocument();
    expect(screen.queryByTestId('daisiesimage')).toBeInTheDocument();

    const tabs = container.querySelectorAll('.nav-link');
    expect(tabs).toHaveLength(2);
    expect(tabs[0].classList.contains('active')).toBe(false);
    expect(tabs[1].classList.contains('active')).toBe(true);
  });
});
