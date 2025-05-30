import { render, fireEvent, screen} from '@testing-library/react';
import Counter from '../components/Counter';
import { describe, it, expect } from 'vitest';


describe('Counter component', () => {
    it('renders initial count as 0', () => {
      render(<Counter />);
      expect(screen.getByTestId('count').textContent).toBe('0');
    });

    it('increments the count on button click', () => {
        render(<Counter />);
        fireEvent.click(screen.getByText('Increment'));
        expect(screen.getByTestId('count').textContent).toBe('1');
      });
    });

