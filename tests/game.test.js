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

it('TC-13a: does not detect a win with only two matching symbols in a line', () => {
  const board = ['X', 'X', '', '', '', '', '', '', ''];
  expect(getWinner(board)).toBe(null);
});

it('TC-13b: does not detect a win when a full line has mixed symbols', () => {
  const board = ['X', 'O', 'X', '', '', '', '', '', ''];
  expect(getWinner(board)).toBe(null);
});

it('TC-14: detects a win when X wins on the last free field', () => {
  let board = createBoard();
  const moves = [
    [0, 'X'], [1, 'O'], [2, 'X'], [3, 'O'],
    [5, 'X'], [4, 'O'], [7, 'X'], [6, 'O'],
  ];

  for (const [index, player] of moves) {
    board = makeMove(board, index, player);
  }

  expect(board.filter((cell) => cell === '').length).toBe(1);
  expect(getWinner(board)).toBe(null);

  board = makeMove(board, 8, 'X');

  expect(board).not.toContain('');
  expect(getWinner(board)).toBe('X');
});

it('TC-15a: returns the status text for a won game', () => {
  const board = ['X', 'X', 'X', 'O', '', '', '', '', ''];
  expect(getStatus(board, 'O')).toBe('X gewinnt!');
});

it('TC-15b: returns the status text for a running game', () => {
  const board = ['X', 'O', '', '', 'X', '', '', '', ''];
  expect(getStatus(board, 'O')).toBe('O ist am Zug');
});