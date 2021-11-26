/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import { MemoryRouter as Router } from 'react-router';
import ReactRouter from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import ColorPage from '../../pages/ColorPage';

const isValidMessage = (container) =>
  container.querySelector("[data-testid='validMessage'][data-valid='true']");

const isInvalidMessage = (container) =>
  container.querySelector(
    "[data-testid='invalidMessage'][data-invalid='true']"
  );

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

    expect(isValidMessage(container)).not.toBeInTheDocument();
    expect(isInvalidMessage(container)).not.toBeInTheDocument();
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

    expect(isValidMessage(container)).not.toBeInTheDocument();
    expect(isInvalidMessage(container)).toBeInTheDocument();
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

    expect(isValidMessage(container)).toBeInTheDocument();
    expect(isInvalidMessage(container)).not.toBeInTheDocument();
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
    expect(isValidMessage(container)).not.toBeInTheDocument();
    expect(isInvalidMessage(container)).toBeInTheDocument();
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
    expect(isValidMessage(container)).toBeInTheDocument();
    expect(isInvalidMessage(container)).not.toBeInTheDocument();
    expect(screen.getByTestId('homeButton')).toBeEnabled();
  });
});
