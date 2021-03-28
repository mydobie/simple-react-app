// Setting method and url here allows for the use of fixtures during development
export const dinoApi = {
  method: () => 'get',
  url: (number = 5) => {
    if (process.env.REACT_APP_USE_MOCKS === 'true') {
      return `/__fixtures__/dinoipsum.json?words=${number}`;
    }
    return `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=${number}`;
  },
};

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
