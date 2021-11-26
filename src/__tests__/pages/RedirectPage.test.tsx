/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RedirectPage from '../../pages/RedirectPage';
import ROUTES from '../../AppRouteNames';

jest.setTimeout(6000);

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Redirect Page tests', () => {
  test('Is accessible', async () => {
    const { container } = render(
      <MemoryRouter>
        <RedirectPage />
      </MemoryRouter>
    );
    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
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

  test('User is forwarded to homepage after 5 seconds', async () => {
    render(
      <MemoryRouter>
        <RedirectPage />
      </MemoryRouter>
    );
    await act(async () => {
      await new Promise((r) => setTimeout(r, 5500));
      expect(mockedUsedNavigate).toHaveBeenCalledWith(ROUTES.HOME);
    });
  });
});
