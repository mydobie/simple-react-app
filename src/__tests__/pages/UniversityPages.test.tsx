/* eslint-disable react/react-in-jsx-scope */

import { axe } from 'jest-axe';
import { act, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { universitiesAPI } from '../../js/axios.config';

import mockUniversities from '../../__test_fixtures__/universities.json';
import UniversitiesPage from '../../pages/UniversityPages';

let mock: MockAdapter;

describe('Sample Universities Page component tests', () => {
  beforeEach(() => {
    process.env.REACT_APP_USE_MOCKS = 'false';
    mock = new MockAdapter(axios);
  });

  test('Component is accessible when loading', async () => {
    process.env.REACT_APP_USE_MOCKS = 'true';
    // EXAMPLE: Mocking an ajax call
    mock.onGet(universitiesAPI.url()).reply(200, mockUniversities);
    const { container } = render(<UniversitiesPage />);
    const results = await axe(container);
    expect(screen.queryByTestId('Loading')).toBeInTheDocument();

    expect(results).toHaveNoViolations();
  });

  test('Component is accessible after loading', async () => {
    mock.onGet(universitiesAPI.url()).replyOnce(200, mockUniversities);
    await act(async () => {
      const { container } = render(<UniversitiesPage />);
      const results = await axe(container);
      expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();
      expect(results).toHaveNoViolations();
    });
  });

  test('Error is shown if there is an error getting universities', async () => {
    mock.reset();
    mock.onGet(universitiesAPI.url()).networkErrorOnce();
    render(<UniversitiesPage />);

    await waitFor(() => screen.getByRole('alert'));
    expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();
  });

  test('Expected number of universities are shown and error is not shown', async () => {
    mock.onGet(universitiesAPI.url()).replyOnce(200, mockUniversities);
    render(<UniversitiesPage />);
    await waitFor(() => screen.queryByTestId('dinoSelectList'));
    const uniListItems = screen.getAllByTestId('uniListItem');
    expect(uniListItems).toHaveLength(mockUniversities.length);

    uniListItems.forEach((uni: HTMLElement, index: number) => {
      expect(uni.textContent).toEqual(mockUniversities[index].name);
    });

    expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();
  });
});
