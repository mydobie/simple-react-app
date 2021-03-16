/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import DinoList from '../../components/DinoList';

describe('DinoList tests', () => {
  let wrapper = '';

  const dinos = [
    { key: '1', text: 'Dino 1' },
    { key: '2', text: 'Dino 2' },
  ];

  beforeEach(() => {
    wrapper = mount(<DinoList selectedDinos={dinos} />);
  });

  test('Is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE ul is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
  test('Expected number of dinos are displayed', () => {
    expect(wrapper.find('ul').first().find('li')).toHaveLength(2);
    expect(wrapper.find('ul').first().find('li').first().text()).toEqual(
      dinos[0].text
    );
  });

  // EXAMPLE: A todo/pending test
  test.todo('This a place holder to remind you to write a test later');
});
