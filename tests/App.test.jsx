import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';
import userEvent from '@testing-library/user-event';

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

    it('TC-05: players take turns – clicking fields 1, 2, 3 places X, O, X', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByLabelText('Feld 1'));
    await user.click(screen.getByLabelText('Feld 2'));
    await user.click(screen.getByLabelText('Feld 3'));

    expect(screen.getByLabelText('Feld 1').textContent).toBe('X');
    expect(screen.getByLabelText('Feld 2').textContent).toBe('O');
    expect(screen.getByLabelText('Feld 3').textContent).toBe('X');
    expect(screen.getByText('O ist am Zug')).toBeTruthy();
  });

    it('TC-16: Click X 1, O 4, X 2, O 5, X 3', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByLabelText('Feld 1'));
    await user.click(screen.getByLabelText('Feld 4'));
    await user.click(screen.getByLabelText('Feld 2'));
    await user.click(screen.getByLabelText('Feld 5'));
    await user.click(screen.getByLabelText('Feld 3'));

    expect(screen.getByLabelText('Feld 1').textContent).toBe('X');
    expect(screen.getByLabelText('Feld 2').textContent).toBe('X');
    expect(screen.getByLabelText('Feld 3').textContent).toBe('X');
    expect(screen.getByLabelText('Feld 4').textContent).toBe('O');
    expect(screen.getByLabelText('Feld 5').textContent).toBe('O');



    // check that the winner text is shown
    expect(screen.getByText('X hat gewonnen!')).toBeTruthy();
  });

});