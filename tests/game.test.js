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