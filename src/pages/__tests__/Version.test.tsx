/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import fs from 'fs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Version from '../Version';

let mock: MockAdapter;

describe('Version tests', () => {
  const packageData = fs.readFileSync('package.json');
  const packageJson = JSON.parse(packageData.toString());

  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet('/versions.json').reply(200, {
      bootstrap: '5.1.3',
      hello: 'world',
      featureFlags: 'mydobie/featureFlags#npmbuild2.3.0',
    });
  });
  test('Is accessible', async () => {
    const { container } = render(<Version />);
    await waitFor(() => expect(screen.getByText('5.1.3')).toBeInTheDocument());

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Displays version and app name from package.json', async () => {
    const { version, name } = packageJson;

    render(<Version />);

    await waitFor(() => expect(screen.getByText('5.1.3')).toBeInTheDocument());
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(version)).toBeInTheDocument();
    expect(screen.getByText('foo')).toBeInTheDocument();
  });
});
