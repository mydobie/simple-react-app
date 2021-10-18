// *********************** GET ENVIRONMENT BASED ON URL ************************* //
// Add non-prod environments here:

const envTypes = {
  dev: 'dev',
  ci: 'ci',
  test: 'test',
  stage: 'stage',
  prod: 'prod',
};

const environments = [
  { urlpattern: 'localhost', env: envTypes.dev },
  { urlpattern: '127.0.0.1', env: envTypes.dev },
  { urlpattern: 'dev.', env: envTypes.dev },
  { urlpattern: 'development.', env: envTypes.dev },
  { urlpattern: 'test.', env: envTypes.test },
  { urlpattern: 'tst.', env: envTypes.test },
  { urlpattern: 'ci.', env: envTypes.ci },
  { urlpattern: 'qa.', env: envTypes.stage },
  { urlpattern: 'qat.', env: envTypes.stage },
  { urlpattern: 'stage.', env: envTypes.stage },
  { urlpattern: 'staging.', env: envTypes.stage },
];

export const isProd = (): boolean => {
  const host = window.location.hostname;
  return !environments.some((env) => host.includes(env.urlpattern));
};

export const whichEnvString = (): string => {
  // Handy for debugging and printing to console
  const host = window.location.hostname;
  const found = environments.find((env) => host.includes(env.urlpattern));
  return `Hostname: ${host}, Environment: ${
    found === undefined ? 'production' : found.env
  }`;
};

const isEnv = (envType: string): boolean => {
  const host = window.location.hostname;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!envTypes[envType]) {
    // eslint-disable-next-line no-console
    console.warn(
      `Environment ${envType} sent to "isEnv" helper function is unknown.`
    );
  }

  return environments.some(
    (env) => host.includes(env.urlpattern) && env.env === envType
  );
};

export const isDev = (): boolean => isEnv(envTypes.dev);

export const isCI = (): boolean => isEnv(envTypes.ci);

export const isTest = (): boolean => isEnv(envTypes.test);

export const isStage = (): boolean => isEnv(envTypes.stage);

export const isLocalHost = (): boolean => {
  const host = window.location.hostname;
  return host.includes('localhost') || host.includes('127.0.0.1');
};
