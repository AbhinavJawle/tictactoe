import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';

describe('App', () => {
  it('TC-03: shows 9 empty, clickable fields and "X ist am Zug" at the start', () => {
    render(<App />);

    for (let n = 1; n <= 9; n++) {
      const field = screen.getByLabelText(`Feld ${n}`);
      expect(field.textContent).toBe('');
      expect(field.disabled).toBe(false);
    }

    expect(screen.getByText('X ist am Zug')).toBeTruthy();
  });

  it('TC-05: Click fields 1, 2, 3', () => {
   
  });

});