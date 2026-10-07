import { expect, it, test } from 'vitest'
import {createBoard, getWinner, isDraw, isGameOver, nextPlayer, makeMove, getStatus, addResult } from '../src/game.js'

it('TC-02: createBoard returns an empty board', () => {
  const board = createBoard();
  expect(board).toEqual(['', '', '', '', '', '', '', '', '']);
});
it('TC-08: placing a symbol on an occupied field is rejected', () => {
  const board = makeMove(createBoard(), 0, 'X');          // X occupies field 0
  const result = makeMove(board, 0, 'O');                 // O tries the same field

  expect(result).toBe(board);                             // same board returned
  expect(result).toEqual(['X', '', '', '', '', '', '', '', '']);
  expect(result[0]).toBe('X');                            // original symbol kept
});

it('TC-09: symbols can be placed at index 0 and 8, but not at -1 and 9', () => {
  const empty = createBoard();

  // valid boundaries
  const first = makeMove(empty, 0, 'X');
  expect(first[0]).toBe('X');
  expect(first).not.toBe(empty);

  const last = makeMove(empty, 8, 'O');
  expect(last[8]).toBe('O');
  expect(last).not.toBe(empty);

  // invalid indices: board is returned unchanged
  expect(makeMove(empty, -1, 'X')).toBe(empty);
  expect(makeMove(empty, 9, 'X')).toBe(empty);
  expect(empty).toEqual(['', '', '', '', '', '', '', '', '']);
});

it('TC-10: X fills a row (fields 1, 2, 3) and is detected as winner', () => {
  // fields 1-3 (as labelled in the UI) = indices 0, 1, 2
  const board = ['X', 'X', 'X', 'O', 'O', '', '', '', ''];

  expect(getWinner(board)).toBe('X');
  expect(isDraw(board)).toBe(false);
  expect(isGameOver(board)).toBe(true);
});

it('TC-11: O fills a column (fields 2, 5, 8) and is detected as winner', () => {
  // fields 2, 5, 8 (as labelled in the UI) = indices 1, 4, 7
  const board = ['X', 'O', 'X', '', 'O', 'X', '', 'O', ''];

  expect(getWinner(board)).toBe('O');
  expect(isDraw(board)).toBe(false);
  expect(isGameOver(board)).toBe(true);
});

it('TC-18: 8 of 9 fields filled and no winner is not yet over', () => {
  // 4 X, 4 O, field 9 (index 8) still empty
  const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', ''];

  expect(getWinner(board)).toBeNull();
  expect(isDraw(board)).toBe(false);
  expect(isGameOver(board)).toBe(false);

  // the last move completes the draw
  const finished = makeMove(board, 8, 'X');
  expect(isDraw(finished)).toBe(true);
  expect(isGameOver(finished)).toBe(true);
});

it('TC-19: placing a symbol after X has won is rejected', () => {
  // X has won with the top row; O would otherwise be on turn
  const board = ['X', 'X', 'X', 'O', 'O', '', '', '', ''];
  expect(getWinner(board)).toBe('X');

  const result = makeMove(board, 8, 'O');             // empty field, but game is over

  expect(result).toBe(board);                         // same board returned
  expect(result[8]).toBe('');                         // nothing was placed
  expect(getWinner(result)).toBe('X');                // X is still the winner
});