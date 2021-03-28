/* eslint-disable import/prefer-default-export */

// AJAX CONFIGS.  Add a separate export for each ajax call

// export const sampleAPI = {
//   method: () => 'get',
//   url: () =>
//     process.env.REACT_APP_USE_MOCKS === 'true'
//       ? `/__fixtures__/MY_FIXTURE.json` // NOTE: `__fixtures__` is the  `/public/__fixtures__` directory.
//       : `REAL_API_URL`,
// };

// Function that will mock the time delay of a real ajax call when using mocks
export const ajaxFinally = async (
  func,
  timeout = 3000,
  envVariable = 'REACT_APP_USE_MOCKS'
) => {
  if (process.env[envVariable] === 'true') {
    // eslint-disable-next-line no-console
    console.info(
      'Artificially waiting to implement the results of an ajax call. Note: This may cause a "Warning: Can\'t perform a React state update on an unmounted component." error if you navigate too quickly. '
    );
    await sleep(timeout);
  }
  return func();
};

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
