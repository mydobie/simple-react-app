/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RedirectPage from '../../pages/RedirectPage';
import ROUTES from '../../AppRouteNames';

jest.setTimeout(6000);

function renderWithRouter(
  // @ts-ignore
  ui,
  {
    // @ts-ignore
    route = ROUTES.REDIRECT,
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Redirect Page tests', () => {
  test('Is accessible', async () => {
    const { container, history } = renderWithRouter(<RedirectPage />);
    await act(async () => {
      const results = await axe(container);
      expect(history.location.pathname).toEqual(ROUTES.REDIRECT);
      expect(results).toHaveNoViolations();
    });
  });

  test('User is forwarded to homepage after button click', () => {
    const { history } = renderWithRouter(<RedirectPage />);
    act(() => {
      expect(history.location.pathname).toEqual(ROUTES.REDIRECT);
      fireEvent.click(screen.getByTestId('goToHomeButton'));
      expect(history.location.pathname).toEqual(ROUTES.HOME);
    });
  });

  test('User is forwarded to homepage after 5 seconds', async () => {
    const { history } = renderWithRouter(<RedirectPage />);
    await act(async () => {
      expect(history.location.pathname).toEqual(ROUTES.REDIRECT);
      await new Promise((r) => setTimeout(r, 5500));
      expect(history.location.pathname).toEqual(ROUTES.HOME);
    });
  });
});

// https://www.rockyourcode.com/test-redirect-with-jest-react-router-and-react-testing-library/
