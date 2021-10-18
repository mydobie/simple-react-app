/* eslint-disable react/react-in-jsx-scope */

import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Alert from '../../components/Alert';

describe('Alert tests', () => {
  test('Is accessible with errorArray', async () => {
    const { container } = render(
      <Alert title='I have an error' errorArray={['This is an error']} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Title is not shown by default', () => {
    const { container } = render(<Alert errorArray={['This is an error']} />);

    expect(container.querySelector('.alertTitle')).not.toBeInTheDocument();
  });

  test('Title is shown if sent', () => {
    const { container } = render(
      <Alert title='I have an error' errorArray={['This is an error']} />
    );
    expect(container.querySelector('.alertTitle')).toBeInTheDocument();
    expect(container.querySelector('.alertTitle')).toHaveTextContent(
      'I have an error'
    );
    expect(screen.getByText('I have an error')).toBeInTheDocument();
  });

  test('Error array elements are shown as list items', () => {
    const errorArray = ['This is an error', 'This is another error'];
    render(<Alert title='I have an error' errorArray={errorArray} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(errorArray.length);

    screen
      .getAllByRole('listitem')
      .forEach((listItem: HTMLElement, index: number) => {
        expect(listItem).toHaveTextContent(errorArray[index]);
      });
  });

  test('Children are shown', () => {
    const { container } = render(
      <Alert title='I have an error'>
        <div className='sampleError'>I am an error</div>
      </Alert>
    );
    expect(screen.getByRole('alert')).toHaveTextContent('I am an error');
    expect(container.querySelector('.sampleError')).toBeInTheDocument();
    expect(container.querySelector('.sampleError')).toHaveTextContent(
      'I am an error'
    );
  });

  test('Items in errorArray are not shown as html', () => {
    render(
      <Alert
        title='I have an error'
        errorArray={[
          'This is an error -  <a href="https://github.com">GitHub</a>',
        ]}
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('This is an error');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  test('Items in errorArray are shown as html', () => {
    render(
      <Alert
        title='I have an error'
        displayAsHTML
        errorArray={[
          'This is an error -  <a href="https://github.com">GitHub</a>',
        ]}
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('This is an error');
    expect(screen.queryByRole('link')).toBeInTheDocument();
  });
});
