import { expect, it, test } from 'vitest'
import {createBoard, getWinner, isDraw, isGameOver, nextPlayer, makeMove, getStatus, addResult } from '../src/game.js'

it('TC-02: createBoard returns an empty board', () => {
  const board = createBoard();
  expect(board).toEqual(['', '', '', '', '', '', '', '', '']);
});
it('TC-12a: detects a win on the top-left to bottom-right diagonal', () => {
  const board = ['X', '', '', '', 'X', '', '', '', 'X'];
  expect(getWinner(board)).toBe('X');
});

it('TC-12b: detects a win on the top-right to bottom-left diagonal', () => {
  const board = ['', '', 'X', '', 'X', '', 'X', '', ''];
  expect(getWinner(board)).toBe('X');
});