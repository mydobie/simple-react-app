/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import { MemoryRouter as Router } from 'react-router';
import ReactRouter from 'react-router-dom';
import ColorPage from '../../pages/ColorPage';

const isValidMessageSelector =
  "[data-testid='validMessage'][data-valid='true']";
const isInvalidMessageSelector =
  "[data-testid='invalidMessage'][data-invalid='true']";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Sample Color Page component tests', () => {
  test('Component is accessible onload', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({});
    const { container } = render(
      <Router>
        <ColorPage />
      </Router>
    );

    expect(
      container.querySelector(isValidMessageSelector)
    ).not.toBeInTheDocument();

    expect(
      container.querySelector(isInvalidMessageSelector)
    ).not.toBeInTheDocument();

    expect(screen.getByTestId('homeButton')).toBeDisabled();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Component is accessible after invalid color entry', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({});
    const { container } = render(
      <Router>
        <ColorPage />
      </Router>
    );

    fireEvent.change(screen.getByTestId('colorTextInput'), {
      target: { value: 'notAColor' },
    });

    expect(
      container.querySelector(isValidMessageSelector)
    ).not.toBeInTheDocument();

    expect(
      container.querySelector(isInvalidMessageSelector)
    ).toBeInTheDocument();

    expect(screen.getByTestId('homeButton')).toBeDisabled();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Component is accessible after valid color entry', async () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({});
    const { container } = render(
      <Router>
        <ColorPage />
      </Router>
    );

    fireEvent.change(screen.getByTestId('colorTextInput'), {
      target: { value: 'Red' },
    });

    expect(container.querySelector(isValidMessageSelector)).toBeInTheDocument();
    expect(
      container.querySelector(isInvalidMessageSelector)
    ).not.toBeInTheDocument();

    expect(screen.getByTestId('homeButton')).toBeEnabled();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Invalid message is shown after invalid entry in url', () => {
    jest
      .spyOn(ReactRouter, 'useParams')
      .mockReturnValue({ colorName: 'notAColor' });

    const { container } = render(<ColorPage />);

    expect(screen.getByTestId('colorTextInput')).toHaveValue('notAColor');

    expect(
      container.querySelector(isValidMessageSelector)
    ).not.toBeInTheDocument();
    expect(
      container.querySelector(isInvalidMessageSelector)
    ).toBeInTheDocument();

    expect(screen.getByTestId('homeButton')).toBeDisabled();
  });

  test('Valid message is shown after valid entry in url', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ colorName: 'RED' });
    const { container } = render(
      <Router>
        <ColorPage />
      </Router>
    );

    expect(screen.getByTestId('colorTextInput')).toHaveValue('RED');
    expect(container.querySelector(isValidMessageSelector)).toBeInTheDocument();
    expect(
      container.querySelector(isInvalidMessageSelector)
    ).not.toBeInTheDocument();

    expect(screen.getByTestId('homeButton')).toBeEnabled();
  });
  // EXAMPLE: A todo/pending test
  test.todo('This is a sample to do test');
});
