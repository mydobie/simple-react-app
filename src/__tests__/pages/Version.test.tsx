/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';

import fs from 'fs';

import Version from '../../pages/Version';

describe('Version tests', () => {
  test('Is accessible', async () => {
    const { container } = render(<Version />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Displays version and app name from package.json', async () => {
    const packageData = fs.readFileSync('package.json');
    const packageJson = JSON.parse(packageData.toString());
    const { version, name } = packageJson;

    render(<Version />);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(version)).toBeInTheDocument();
    expect(screen.getByText('foo')).toBeInTheDocument();
  });
});
