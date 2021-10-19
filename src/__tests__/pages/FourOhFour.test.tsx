/* eslint-disable react/react-in-jsx-scope */

import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import FourOhFour from '../../pages/FourOhFour';

describe('404 tests', () => {
  test('Is accessible', async () => {
    const { container } = render(<FourOhFour />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Snapshot test on initial load', () => {
    const { container } = render(<FourOhFour />);
    expect(container).toMatchSnapshot();
  });
});
