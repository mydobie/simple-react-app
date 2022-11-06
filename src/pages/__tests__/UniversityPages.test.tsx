/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */

import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { universitiesAPI } from '../../js/axios.config';
import mockUniversities from './fixtures/universities.json';
import UniversitiesPage from '../../pages/UniversityPages';

let mock: MockAdapter;

const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {}, // Prevents networking error from logging to console.
  },
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('Sample Universities Page component tests', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    queryClient.clear();
  });
  afterEach(async () => {
    mock.reset();
  });

  // This test throws the "not wrapped in act" error
  // test('Component is accessible when loading', async () => {
  //   mock.onGet(universitiesAPI.url()).reply(200, mockUniversities);

  //   const { container } = render(
  //     <QueryClientProvider client={queryClient}>
  //       <UniversitiesPage />
  //     </QueryClientProvider>
  //   );
  //   await waitFor(() =>
  //     expect(screen.queryByTestId('Loading')).toBeInTheDocument()
  //   );
  //   const results = await axe(container);
  //   expect(results).toHaveNoViolations();
  // });

  test('Component is accessible after loading', async () => {
    mock.onGet(universitiesAPI.url()).replyOnce(200, mockUniversities);
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <UniversitiesPage />
      </QueryClientProvider>
    );
    await waitFor(() =>
      expect(screen.getAllByTestId('uniListItem')).not.toHaveLength(0)
    );
    expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Error is shown if there is an error getting universities', async () => {
    mock.onGet(universitiesAPI.url()).networkErrorOnce();
    render(
      <QueryClientProvider client={queryClient}>
        <UniversitiesPage />
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByRole('alert'));
    expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();
  });

  test('Expected number of universities are shown and error is not shown', async () => {
    mock.onGet(universitiesAPI.url()).replyOnce(200, mockUniversities);
    render(
      <QueryClientProvider client={queryClient}>
        <UniversitiesPage />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.getAllByTestId('uniListItem')).not.toHaveLength(0)
    );

    const uniListItems = screen.getAllByTestId('uniListItem');
    expect(uniListItems).toHaveLength(mockUniversities.length - 1); //  There is one set of duplicates

    mockUniversities.forEach((university) => {
      expect(screen.getByText(university.name)).toBeInTheDocument();
    });

    expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();
  });
});
