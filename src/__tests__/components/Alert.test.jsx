/* eslint-disable react/react-in-jsx-scope */
import { mount, shallow } from 'enzyme';
import { axe } from 'jest-axe';
import Alert from '../../components/Alert';

describe('Alert tests', () => {
  test('Is accessible with errorArray', async () => {
    const wrapper = shallow(
      <Alert title='I have an error' errorArray={['This is an error']} />
    );
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
  test('Title is not shown by default', () => {
    const wrapper = shallow(<Alert errorArray={['This is an error']} />);
    expect(wrapper.find('.alertTitle')).toHaveLength(0);
  });
  test('Title is shown if sent', () => {
    const wrapper = shallow(
      <Alert title='I have an error' errorArray={['This is an error']} />
    );
    expect(wrapper.find('.alertTitle')).toHaveLength(1);
  });
  test('Children are shown', () => {
    const wrapper = shallow(
      <Alert title='I have an error'>
        <div className='sampleError'>I am an error</div>
      </Alert>
    );
    expect(wrapper.find('div.sampleError')).toHaveLength(1);
  });
  test('Items in errorArray are not shown as html', () => {
    const wrapper = mount(
      <Alert
        title='I have an error'
        errorArray={['This is an error -  <a href="https://umn.edu">UMN</a>']}
      />
    );
    expect(wrapper.html().includes('This is an error')).toEqual(true);
    expect(
      wrapper.html().includes('<a href="https://umn.edu">UMN</a>')
    ).toEqual(false);
  });

  test('Items in errorArray are shown as html', () => {
    const wrapper = mount(
      <Alert
        title='I have an error'
        displayAsHTML
        errorArray={['This is an error -  <a href="https://umn.edu">UMN</a>']}
      />
    );
    expect(wrapper.html().includes('This is an error')).toEqual(true);
    expect(
      wrapper.html().includes('<a href="https://umn.edu">UMN</a>')
    ).toEqual(true);
  });
});
