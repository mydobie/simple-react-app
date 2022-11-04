/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AppRoutes from './AppRoutes';
import App from './App';

let mock: MockAdapter;

describe('App (router) tests', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet('/versions.json').reply(200, {
      bootstrap: '5.1.3',
      hello: 'world',
      featureFlags: 'mydobie/featureFlags#npmbuild2.3.0',
    });
  });
  test('Is accessible', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('404 is shown for /cannnotFindPage', () => {
    render(
      <MemoryRouter initialEntries={['/cannnotFindPage']}>
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

    await waitFor(() => expect(screen.getByRole('banner')).toBeInTheDocument());

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
