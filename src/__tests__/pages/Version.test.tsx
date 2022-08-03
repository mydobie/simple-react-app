/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, screen, act, waitFor } from '@testing-library/react';
import fs from 'fs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Version from '../../pages/Version';

let mock: MockAdapter;

describe('Version tests', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet('/versions.json').reply(200, {
      bootstrap: '5.1.3',
      hello: 'world',
      featureFlags: 'mydobie/featureFlags#npmbuild2.3.0',
    });
  });
  test('Is accessible', async () => {
    let container: string | Element;
    await act(() => {
      container = render(<Version />).container;
    });
    await waitFor(async () =>
      expect(screen.getByTestId('versionPageContainer')).toBeInTheDocument()
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Displays version and app name from package.json', async () => {
    const packageData = fs.readFileSync('package.json');
    const packageJson = JSON.parse(packageData.toString());
    const { version, name } = packageJson;

    await act(() => {
      render(<Version />);
    });
    await waitFor(async () =>
      expect(screen.getByTestId('versionPageContainer')).toBeInTheDocument()
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(version)).toBeInTheDocument();
    expect(screen.getByText('foo')).toBeInTheDocument();
  });
});
