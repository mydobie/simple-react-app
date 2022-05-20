/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RedirectPage from '../../pages/RedirectPage';

// NOTE: The accessibility checks seem to be negatively impacted by
// jest.useFakeTimers();
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
});
