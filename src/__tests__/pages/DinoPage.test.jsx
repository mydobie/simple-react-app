/* eslint-disable react/react-in-jsx-scope */
import { shallow } from 'enzyme';
import { axe } from 'jest-axe';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import fs from 'fs';

import DinoPage from '../../pages/DinoPage';

const mockAxios = new MockAdapter(axios);
// import SampleDinoListItem from '../../components/sample/SampleDinoListItem';

describe('Sample Dino Page component tests', () => {
  let wrapper = '';
  const dinos = JSON.parse(
    fs.readFileSync('./src/__tests__/__fixtures__/dinoipsum.json')
  );

  let axiosCalls = [];
  beforeEach(() => {
    // EXAMPLE: Mocking an ajax call
    mockAxios.onAny().reply((config) => {
      axiosCalls.push(config.url);
      return [200, dinos];
    });

    wrapper = shallow(<DinoPage />);
  });
  afterEach(() => {
    mockAxios.reset();
    axiosCalls = [];
  });

  test('Component is accessible while loading', async () => {
    wrapper.setState({ loading: true });
    wrapper.update();
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Dinos api called on component load', () => {
    expect(axiosCalls).toHaveLength(1);
  });

  test('Expected number of dinos are shown and error is not shown', () => {
    expect(wrapper.state().loading).toEqual(false);
    expect(wrapper.find('DinoListItem')).toHaveLength(dinos[0].length);
    expect(wrapper.find('Errors')).toHaveLength(0);
  });

  test('Component is accessible after displaying dino list', async () => {
    expect(wrapper.state().loading).toEqual(false);
    wrapper.update();
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Error is displayed when there is an error with the ajax call', (done) => {
    mockAxios.reset();
    mockAxios.onAny().networkError();

    wrapper = shallow(<DinoPage />);
    wrapper.update();
    setTimeout(() => {
      // set timeout is needed to ensure we are in the catch block
      expect(wrapper.find('Errors')).toHaveLength(1);
      expect(wrapper.find('#dinoLists')).toHaveLength(0);
      done();
    }, 10);
  });

  test('Component is accessible when displaying an error', async () => {
    wrapper.setState({ error: 'There was an error' });
    wrapper.update();
    expect(wrapper.find('Errors')).toHaveLength(1);
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('State is changed when a dino is checked', () => {
    expect(wrapper.state().dinos[0].checked).toEqual(false);
    expect(wrapper.find('DinoList').props().selectedDinos).toHaveLength(0);

    wrapper.instance().handleSelectDinoToggle('0', true);
    wrapper.update();

    expect(wrapper.state().dinos[0].checked).toEqual(true);
    expect(wrapper.find('DinoList').props().selectedDinos).toHaveLength(1);
  });

  test('State is changed when a dino is unchecked', () => {
    const newDinos = [...wrapper.state().dinos];
    newDinos[0].checked = true;
    wrapper.setState({ dinos: newDinos });
    wrapper.update();

    expect(wrapper.state().dinos[0].checked).toEqual(true);
    expect(wrapper.find('DinoList').props().selectedDinos).toHaveLength(1);

    wrapper.instance().handleSelectDinoToggle('0', false);
    wrapper.update();

    expect(wrapper.state().dinos[0].checked).toEqual(false);
    expect(wrapper.find('DinoList').props().selectedDinos).toHaveLength(0);
  });
});
