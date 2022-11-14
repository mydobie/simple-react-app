/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';

import Home from '../Home';

describe('Home component tests', () => {
  test('Home component is accessible', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
