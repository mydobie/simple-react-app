/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, screen, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router'; // see https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AppRoutes from '../AppRoutes';
import App from '../App';

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
    expect(screen.getByTestId('homePageContainer')).toBeInTheDocument();
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
    let container;
    await act(async () => {
      container = render(<App />).container;
    });

    await waitFor(async () =>
      expect(screen.getByTestId('header')).toBeInTheDocument()
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
