/* eslint-disable react/react-in-jsx-scope */
import { shallow } from 'enzyme';
import { axe } from 'jest-axe';
import DinoListItem from '../../components/DinoListItem';

// EXAMPLE: Mocking a function sent in as a prop
const mockChangeCheckbox = jest.fn();

describe('Loading icon tests', () => {
  let wrapper = '';
  afterEach(() => {
    mockChangeCheckbox.mockClear();
  });

  beforeEach(() => {
    wrapper = shallow(
      <DinoListItem
        dinoName='tRex'
        dinoId='4'
        checked={false}
        changeCheckBox={mockChangeCheckbox}
      />
    );
    wrapper.update();
  });

  test('Is accessible', async () => {
    const results = await axe(`<main><ul>${wrapper.html()}</ul></main>`); // NOTE ul is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
  test('When checkbox is clicked, changeCheckBox is called', () => {
    // EXAMPLE: Checking for a React Bootstrap element.
    // In the component it is listed as Form.Check
    // If you are unsure what an element is really called, then look at the snapshot
    expect(wrapper).toMatchSnapshot();
    wrapper
      .find('FormCheck')
      .first()
      .simulate('click', { target: { checked: true } });
    expect(mockChangeCheckbox).toHaveBeenCalledTimes(1);
    expect(mockChangeCheckbox.mock.calls[0][0]).toBe('4');
    expect(mockChangeCheckbox.mock.calls[0][1]).toBe(true); // second attribute sent
  });

  test('When checkbox is unchecked, changeCheckBox is called', () => {
    // EXAMPLE: Simulate a checkbox click
    wrapper
      .find('FormCheck')
      .first()
      .simulate('click', { target: { checked: false } });
    expect(mockChangeCheckbox).toHaveBeenCalledTimes(1);
    expect(mockChangeCheckbox.mock.calls[0][0]).toBe('4');
    expect(mockChangeCheckbox.mock.calls[0][1]).toBe(false); // second attribute sent
  });
});
