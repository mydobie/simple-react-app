/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router'; // see https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303
import AppRoutes from '../AppRoutes';
import App from '../App';

describe('App (router) tests', () => {
  test('Is accessible', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(screen.getByTestId('homePageContainer')).toBeInTheDocument();
  });

  test('Version component is shown for /version route', () => {
    render(
      <MemoryRouter initialEntries={['/version']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('homePageContainer')).not.toBeInTheDocument();
    expect(screen.getByTestId('versionPageContainer')).toBeInTheDocument();
  });

  test('404 is shown for /cannnotFindPage', () => {
    render(
      <MemoryRouter initialEntries={['/cannnotFindPage']} initialIndex={0}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('homePageContainer')).not.toBeInTheDocument();
    expect(screen.getByTestId('404PageContainer')).toBeInTheDocument();
  });
});

describe('App renders correctly', () => {
  test('App is accessible', async () => {
    const { container } = render(<App />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
