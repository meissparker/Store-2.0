import { render, fireEvent, screen } from '@testing-library/react';
import Greeting from '../Greeting';
import { describe, it, expect } from 'vitest';

describe('Greeting component', () => {
    it('shows default greeting', () => {
      render(<Greeting />);
      expect(screen.getByTestId('greeting').textContent).toBe('Hello!');
    });
  
    it('updates greeting based on input', () => {
      render(<Greeting />);
      fireEvent.change(screen.getByPlaceholderText('Enter name'), {
        target: { value: 'Parker' },
      });
      expect(screen.getByTestId('greeting').textContent).toBe('Hello, Parker!');
    });
  });
  