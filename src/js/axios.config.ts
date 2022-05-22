// AJAX CONFIGS.  Add a separate export for each ajax call
import { Method } from 'axios';

/* ************ API CALLS ************* */
export const sampleAPI = {
  method: (): Method => 'get',
  url: (): string =>
    process.env.REACT_APP_USE_MOCKS === 'true'
      ? `/__fixtures__/SAMPLE_FIXTURE.json` // NOTE: `__fixtures__` is the  `/public/__fixtures__` directory.
      : `http://the_real_url_for_the_api.com`,
};

/* ***************** AJAX Finally Helper ***************/
// When set in "mock mode" the application will pause simulating a real ajax call

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const ajaxFinally = async (
  func: () => void = () => {},
  timeout = 3000,
  envVariable = 'REACT_APP_USE_MOCKS'
): Promise<void> => {
  if (process.env[envVariable] === 'true') {
    // eslint-disable-next-line no-console
    console.info(
      'Artificially waiting to implement the results of an ajax call. Note: This may cause a "Warning: Can\'t perform a React state update on an unmounted component." error if you navigate too quickly. '
    );
    await sleep(timeout);
  }

  func();
};
