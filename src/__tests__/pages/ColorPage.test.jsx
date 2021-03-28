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
    // EXAMPLE: Find element by props/attribute
    const textBox = wrapper.find('[controlId="myColor"]').find('FormControl');
    expect(textBox.props().isInvalid).toEqual(false);
    expect(textBox.props().isValid).toEqual(false);
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Component is accessible after invalid color entry', async () => {
    // EXAMPLE: calling an internal method in a test
    wrapper.instance().onColorChange('gray');
    wrapper.update();
    const textBox = wrapper.find('[controlId="myColor"]').find('FormControl');
    expect(textBox.props().isInvalid).toEqual(true);
    expect(textBox.props().isValid).toEqual(false);
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
  test('Component is accessible after valid color entry', async () => {
    // EXAMPLE: Simulate entering text in a textbox

    let textBox = wrapper.find('[controlId="myColor"]').find('FormControl');
    textBox.simulate('change', { target: { value: 'red' } });

    wrapper.update();

    // eslint-disable-next-line no-console
    console.log(
      'This test will cause a " Warning: Each child in a list should have a unique "key" prop." warning.  This is due to how reactRouter is mocked.'
    );
    const wrapperWithRouter = shallow(<Router>{wrapper}</Router>);
    textBox = wrapperWithRouter
      .find('[controlId="myColor"]')
      .find('FormControl');
    expect(textBox.props().isInvalid).toEqual(false);
    expect(textBox.props().isValid).toEqual(true);
    const results = await axe(`<main>${wrapperWithRouter.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Empty color text box is not valid - on component load', () => {
    expect(
      wrapper.find('[controlId="myColor"]').find('FormControl').props().value
    ).toEqual('');
    // EXAMPLE: Checking value in the state
    expect(wrapper.state('isInvalid')).toEqual(false);
    expect(wrapper.state('isValid')).toEqual(false);
    expect(wrapper.find('Button').props().disabled).toEqual(true);
    expect(wrapper.find('Link')).toHaveLength(0);
  });

  test('Entered empty color text box is not valid', () => {
    wrapper.instance().onColorChange('gray');
    wrapper.update();
    wrapper.instance().onColorChange('');
    wrapper.update();
    expect(wrapper.state('isInvalid')).toEqual(false);
    expect(wrapper.state('isValid')).toEqual(false);
    expect(wrapper.find('Button').props().disabled).toEqual(true);
    expect(wrapper.find('Link')).toHaveLength(0);
  });

  test('Button is disabled with invalid color', () => {
    wrapper.instance().onColorChange('gray');
    wrapper.update();
    expect(wrapper.state('color')).toEqual('gray');
    expect(wrapper.state('isInvalid')).toEqual(true);
    expect(wrapper.state('isValid')).toEqual(false);
    expect(wrapper.find('Button').props().disabled).toEqual(true);
    expect(wrapper.find('Link')).toHaveLength(0);
  });

  test('Button is enabled with valid color', () => {
    wrapper.instance().onColorChange('red');
    wrapper.update();
    expect(wrapper.state('color')).toEqual('red');
    expect(wrapper.state('isInvalid')).toEqual(false);
    expect(wrapper.state('isValid')).toEqual(true);
    expect(wrapper.find('Button').props().disabled).toEqual(false);
    expect(wrapper.find('Link')).toHaveLength(1);
  });
});
