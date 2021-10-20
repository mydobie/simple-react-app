/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import { MemoryRouter as Router } from 'react-router';
import ColorPage from '../../pages/ColorPage';

const isValidMessage = (container) =>
  container.querySelector("[data-testid='validMessage'][data-valid='true']");

const isInvalidMessage = (container) =>
  container.querySelector(
    "[data-testid='invalidMessage'][data-invalid='true']"
  );

describe('Sample Color Page component tests', () => {
  test('Component is accessible onload', async () => {
    const { container } = render(
      <Router>
        <ColorPage startingColor='' />
      </Router>
    );

    expect(isValidMessage(container)).not.toBeInTheDocument();
    expect(isInvalidMessage(container)).not.toBeInTheDocument();
    expect(screen.getByTestId('homeButton')).toBeDisabled();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Component is accessible after invalid color entry', async () => {
    const { container } = render(
      <Router>
        <ColorPage startingColor='' />
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
    const { container } = render(
      <Router>
        <ColorPage startingColor='' />
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
    const { container } = render(
      <Router>
        <ColorPage startingColor='notAColor' />
      </Router>
    );

    expect(screen.getByTestId('colorTextInput')).toHaveValue('notAColor');
    expect(isValidMessage(container)).not.toBeInTheDocument();
    expect(isInvalidMessage(container)).toBeInTheDocument();
    expect(screen.getByTestId('homeButton')).toBeDisabled();
  });

  test('Valid message is shown after valid entry in url', () => {
    const { container } = render(
      <Router>
        <ColorPage startingColor='RED' />
      </Router>
    );

    expect(screen.getByTestId('colorTextInput')).toHaveValue('RED');
    expect(isValidMessage(container)).toBeInTheDocument();
    expect(isInvalidMessage(container)).not.toBeInTheDocument();
    expect(screen.getByTestId('homeButton')).toBeEnabled();
  });
});
