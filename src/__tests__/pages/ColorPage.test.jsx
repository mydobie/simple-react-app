/* eslint-disable react/react-in-jsx-scope */
import { shallow } from 'enzyme';
import { axe } from 'jest-axe';

import { MemoryRouter as Router } from 'react-router';
import ColorPage from '../../pages/ColorPage';

describe('Sample Color Page component tests', () => {
  let wrapper = '';

  beforeEach(() => {
    wrapper = shallow(<ColorPage />);
    wrapper.update();
  });
  test('Component is accessible onload', async () => {
    expect(wrapper.find('#myColor').props().invalid).toEqual(false);
    expect(wrapper.find('#myColor').props().valid).toEqual(false);
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Component is accessible after invalid color entry', async () => {
    // EXAMPLE calling an internal method in a test
    wrapper.instance().handleColorChange({
      target: {
        value: 'gray',
      },
    });
    wrapper.update();
    expect(wrapper.find('#myColor').props().invalid).toEqual(true);
    expect(wrapper.find('#myColor').props().valid).toEqual(false);
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
  test('Component is accessible after valid color entry', async () => {
    // eslint-disable-next-line no-console
    console.log(
      'NOTE:  This test will cause an "Warning: Each child in a list should have a unique "key" prop." warning.  This is just an artifact of the react-router-dom mock'
    );
    wrapper.instance().handleColorChange({
      target: {
        value: 'red',
      },
    });
    wrapper.update();
    const wrapperWithRouter = shallow(<Router>{wrapper}</Router>);
    expect(wrapperWithRouter.find('#myColor').props().invalid).toEqual(false);
    expect(wrapperWithRouter.find('#myColor').props().valid).toEqual(true);
    const results = await axe(`<main>${wrapperWithRouter.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Empty color text box is not valid - on component load', () => {
    expect(wrapper.find('#myColor').first().props().value).toEqual('');
    expect(wrapper.state('isColorInvalid')).toEqual(false);
    expect(wrapper.state('isColorValid')).toEqual(false);
    expect(wrapper.find('Button').props().disabled).toEqual(true);
    expect(wrapper.find('Link')).toHaveLength(0);
  });

  test('Entered empty color text box is not valid', () => {
    wrapper.instance().handleColorChange({
      target: {
        value: 'gray',
      },
    });
    wrapper.update();
    wrapper.instance().handleColorChange({
      target: {
        value: '',
      },
    });
    wrapper.update();
    expect(wrapper.state('isColorInvalid')).toEqual(false);
    expect(wrapper.state('isColorValid')).toEqual(false);
    expect(wrapper.find('Button').props().disabled).toEqual(true);
    expect(wrapper.find('Link')).toHaveLength(0);
  });
  test('Partial color text box is not valid', () => {
    wrapper.instance().handleColorChange({
      target: {
        value: 'gray',
      },
    });
    wrapper.update();
    expect(wrapper.state('color')).toEqual('gray');
    expect(wrapper.state('isColorInvalid')).toEqual(true);
    expect(wrapper.state('isColorValid')).toEqual(false);
    expect(wrapper.find('Button').props().disabled).toEqual(true);
    expect(wrapper.find('Link')).toHaveLength(0);
  });
  test('Primary color text box is valid', () => {
    wrapper.instance().handleColorChange({
      target: {
        value: 'red',
      },
    });
    wrapper.update();
    expect(wrapper.state('color')).toEqual('red');
    expect(wrapper.state('isColorInvalid')).toEqual(false);
    expect(wrapper.state('isColorValid')).toEqual(true);
    expect(wrapper.find('Button').props().disabled).toEqual(false);
    expect(wrapper.find('Link')).toHaveLength(1);
  });
});
