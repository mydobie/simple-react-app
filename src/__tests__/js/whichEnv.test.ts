/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  whichEnvString,
  isDev,
  isTest,
  isStage,
  isCI,
  isLocalHost,
  isProd,
} from '../../js/whichEnv';

const helper = (currentEnv: string) => {
  // console.log(whichEnvString());

  currentEnv === 'dev'
    ? expect(isDev()).toBeTruthy()
    : expect(isDev()).toBeFalsy();

  currentEnv === 'ci'
    ? expect(isCI()).toBeTruthy()
    : expect(isCI()).toBeFalsy();

  currentEnv === 'test'
    ? expect(isTest()).toBeTruthy()
    : expect(isTest()).toBeFalsy();

  currentEnv === 'stage'
    ? expect(isStage()).toBeTruthy()
    : expect(isStage()).toBeFalsy();

  expect(isProd()).toBeFalsy();
};

describe('Alert tests', () => {
  beforeEach(() => {
    // @ts-ignore
    delete global.window.location;
    global.window = Object.create(window);
  });

  test('Display enviroment', () => {
    // @ts-ignore
    global.window.location = {
      hostname: 'my.test.com',
    };

    expect(whichEnvString()).toEqual(
      'Hostname: my.test.com, Environment: test'
    );
  });

  test('Is Dev environment', () => {
    // @ts-ignore
    global.window.location = {
      hostname: 'my.dev.com',
    };
    helper('dev');

    // @ts-ignore
    delete global.window.location;
    global.window = Object.create(window);
    // @ts-ignore
    global.window.location = { hostname: 'my.development.com' };
    helper('dev');
  });

  test('Is test environment', () => {
    // @ts-ignore
    global.window.location = {
      hostname: 'my.test.com',
    };
    helper('test');

    // @ts-ignore
    delete global.window.location;
    global.window = Object.create(window);
    // @ts-ignore
    global.window.location = { hostname: 'my.tst.com' };
    helper('test');
  });

  test('Is ci environment', () => {
    // @ts-ignore
    global.window.location = {
      hostname: 'my.ci.com',
    };
    helper('ci');
  });

  test('Is staging environment', () => {
    // @ts-ignore
    global.window.location = {
      hostname: 'my.qa.com',
    };
    helper('stage');

    // @ts-ignore
    delete global.window.location;
    global.window = Object.create(window);
    // @ts-ignore
    global.window.location = { hostname: 'my.qat.com' };
    helper('stage');

    // @ts-ignore
    delete global.window.location;
    global.window = Object.create(window);
    // @ts-ignore
    global.window.location = { hostname: 'my.stage.com' };
    helper('stage');

    // @ts-ignore
    delete global.window.location;
    global.window = Object.create(window);
    // @ts-ignore
    global.window.location = { hostname: 'my.staging.com' };
    helper('stage');
  });

  test('Is local host', () => {
    // @ts-ignore
    global.window.location = { hostname: 'localhost:1234' };
    helper('dev');
    expect(isLocalHost()).toBeTruthy();

    // @ts-ignore
    delete global.window.location;
    global.window = Object.create(window);
    // @ts-ignore
    global.window.location = { hostname: '127.0.0.1:1234' };
    helper('dev');
    expect(isLocalHost()).toBeTruthy();
  });

  test('Is prod', () => {
    // @ts-ignore
    global.window.location = { hostname: 'my.prod.env' };
    expect(isProd()).toBeTruthy();
  });
});
