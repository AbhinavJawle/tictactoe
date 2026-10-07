import { expect, it, test } from 'vitest'
import {createBoard, getWinner, isDraw, isGameOver, nextPlayer, makeMove, getStatus, addResult } from '../src/game.js'

it('TC-02: createBoard returns an empty board', () => {
  const board = createBoard();
  expect(board).toEqual(['', '', '', '', '', '', '', '', '']);
});