/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import { MemoryRouter } from 'react-router'; // see https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303
import App from '../App';

describe('App (router) tests', () => {
  test('Is accessible', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/version']}>
        <App />
      </MemoryRouter>
    );
    const results = await axe(`${wrapper.html()}`);
    expect(results).toHaveNoViolations();
  });

  test('Version component is shown for /version route', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/version']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find('Version')).toHaveLength(1);
    expect(wrapper.find('Home')).toHaveLength(0);
    expect(wrapper.find('ColorPage')).toHaveLength(0);
    expect(wrapper.find('DinoPage')).toHaveLength(0);
  });

  test('404 is shown for /cannnotFindPage', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/cannnotFindPage']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find('FourOhFour')).toHaveLength(1);
    expect(wrapper.find('Version')).toHaveLength(0);
    expect(wrapper.find('Home')).toHaveLength(0);
    expect(wrapper.find('ColorPage')).toHaveLength(0);
    expect(wrapper.find('DinoPage')).toHaveLength(0);
  });

  test('Dino Page is shown for /dinos', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/dinos']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find('FourOhFour')).toHaveLength(0);
    expect(wrapper.find('Version')).toHaveLength(0);
    expect(wrapper.find('Home')).toHaveLength(0);
    expect(wrapper.find('ColorPage')).toHaveLength(0);
    expect(wrapper.find('DinoPage')).toHaveLength(1);
  });

  test('Color page is shown for /color', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/color']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find('FourOhFour')).toHaveLength(0);
    expect(wrapper.find('Version')).toHaveLength(0);
    expect(wrapper.find('Home')).toHaveLength(0);
    expect(wrapper.find('ColorPage')).toHaveLength(1);
    expect(wrapper.find('DinoPage')).toHaveLength(0);
  });

  test('Color page is shown for /color/red', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/color/Red']}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find('FourOhFour')).toHaveLength(0);
    expect(wrapper.find('Version')).toHaveLength(0);
    expect(wrapper.find('Home')).toHaveLength(0);
    expect(wrapper.find('ColorPage')).toHaveLength(1);
    expect(wrapper.find('DinoPage')).toHaveLength(0);

    expect(wrapper.find('ColorPage').first().props().color).toEqual('Red');
  });
});
