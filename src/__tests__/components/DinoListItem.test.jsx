/* eslint-disable react/react-in-jsx-scope */
import { shallow } from 'enzyme';
import { axe } from 'jest-axe';
import DinoListItem from '../../components/DinoListItem';

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
  test('When checkbox is clicked, changeCheckBix is called', () => {
    wrapper
      .find('Input')
      .first()
      .simulate('click', { target: { checked: true } });
    expect(mockChangeCheckbox).toHaveBeenCalledTimes(1);
    expect(mockChangeCheckbox.mock.calls[0][0]).toBe('4');
    expect(mockChangeCheckbox.mock.calls[0][1]).toBe(true); // second attribute sent
  });

  test('When checkbox is unchecked, changeCheckBix is called', () => {
    wrapper
      .find('Input')
      .first()
      .simulate('click', { target: { checked: false } });
    expect(mockChangeCheckbox).toHaveBeenCalledTimes(1);
    expect(mockChangeCheckbox.mock.calls[0][0]).toBe('4');
    expect(mockChangeCheckbox.mock.calls[0][1]).toBe(false); // second attribute sent
  });
});
