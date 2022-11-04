/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SetAxios from '../../components/SetAxios';

const mock = new MockAdapter(axios);

const SampleComponent = ({
  url,
  clearError,
  setError,
  testResponse,
}: {
  url: string;
  clearError: () => void;
  setError: (error?: string) => void;
  testResponse: (response: string) => void;
}) => {
  const [haveResponse, setResponse] = React.useState(false);

  React.useEffect(() => {
    axios.get(url).then((/* response */) => {
      setResponse(true);
    });
  }, [url]);

  return (
    <>
      <SetAxios
        clearError={clearError}
        setError={setError}
        testResponse={testResponse}
        testMode
      />
      {haveResponse ? <div data-testid='done' /> : null}
    </>
  );
};

describe('SetAxios tests', () => {
  mock
    .onGet('/good')
    .reply(200, 'myResponse')
    .onGet('/bad')
    .reply(500, new Error('This is an error'))
    .onAny()
    .networkError();

  test('Bad ajax call', async () => {
    const clearError = jest.fn();
    const setError = jest.fn();
    const testResponse = jest.fn();
    render(
      <SampleComponent
        url='/bad'
        clearError={clearError}
        setError={setError}
        testResponse={testResponse}
      />
    );
    await waitFor(() => expect(setError).toHaveBeenCalledTimes(1));

    expect(clearError).toHaveBeenCalledTimes(1);
    expect(testResponse).toHaveBeenCalledTimes(0);
  });

  test('Good ajax call', async () => {
    const clearError = jest.fn();
    const setError = jest.fn();
    const testResponse = jest.fn();
    render(
      <SampleComponent
        url='/good'
        clearError={clearError}
        setError={setError}
        testResponse={testResponse}
      />
    );
    await waitFor(() => expect(testResponse).toHaveBeenCalledTimes(1));

    expect(clearError).toHaveBeenCalledTimes(1);
    expect(setError).toHaveBeenCalledTimes(0);
  });
});
