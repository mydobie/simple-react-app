/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RedirectPage from '../../pages/RedirectPage';
import ROUTES from '../../AppRouteNames';

jest.useFakeTimers();

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Redirect Page tests', () => {
  test('User is forwarded to homepage after button click', () => {
    render(
      <MemoryRouter>
        <RedirectPage />
      </MemoryRouter>
    );
    act(() => {
      fireEvent.click(screen.getByTestId('goToHomeButton'));
      expect(mockedUsedNavigate).toHaveBeenCalledWith(ROUTES.HOME);
    });
  });

  test('User is forwarded to homepage after 5 seconds', () => {
    render(
      <MemoryRouter>
        <RedirectPage />
      </MemoryRouter>
    );
    act(() => {
      // EXAMPLE: Use of run timers
      jest.runAllTimers();
      expect(mockedUsedNavigate).toHaveBeenCalledWith(ROUTES.HOME);
    });
  });
});
