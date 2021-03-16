// *********************** GET ENVIRONMENT BASED ON URL ************************* //
// Add non-prod environments here:
const environments = [
  { urlpattern: 'localhost', env: 'dev' },
  { urlpattern: 'dev.', env: 'dev' },
  { urlpattern: 'development.', env: 'dev' },
  { urlpattern: 'test.', env: 'test' },
  { urlpattern: 'qat.', env: 'qa' },
  { urlpattern: 'qa.', env: 'qa' },
];

const { hostname } = window.location;

export const isProd = (url = null) => {
  const host = url === null ? hostname : url;
  // eslint-disable-next-line arrow-body-style
  const found = environments.find((env) => {
    return host.includes(env.urlpattern);
  });
  return found === undefined; // found is undefined if there isn't a match found
};

export const whichEnv = (url = null) => {
  const host = url === null ? hostname : url;
  const found = environments.find((env) => host.includes(env.urlpattern));
  return `Hostname: ${host}, Environment: ${
    found === undefined ? 'production' : found.env
  }`;
};

const isEnv = (envType, url = null) => {
  const host = url === null ? hostname : url;
  const found = environments.find(
    (env) => host.includes(env.urlpattern) && env.env === envType
  );
  return found !== undefined;
};

export const isDev = (url = null) => isEnv('dev', url);
export const isTest = (url = null) => isEnv('test', url);
export const isQa = (url = null) => isEnv('qa', url);

export const isLocalHost = (url = null) => {
  const host = url === null ? hostname : url;
  return host.includes('localhost') || host.includes('127.0.0.1');
};
