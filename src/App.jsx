import { useState } from 'react';
import { createBoard, makeMove, isGameOver, nextPlayer, getStatus, addResult } from './game.js';
import './App.css';

const EMPTY_SCORES = { X: 0, O: 0, draw: 0 };

export default function App() {
  const [board, setBoard] = useState(createBoard());
  const [player, setPlayer] = useState('X');
  const [scores, setScores] = useState(EMPTY_SCORES);

  const gameOver = isGameOver(board);

  function handleClick(index) {
    const newBoard = makeMove(board, index, player);
    if (newBoard === board) return; // ungültiger Zug

    setBoard(newBoard);
    if (isGameOver(newBoard)) {
      setScores(addResult(scores, newBoard));
    } else {
      setPlayer(nextPlayer(player));
    }
  }

  function newRound() {
    setBoard(createBoard());
    setPlayer('X');
  }

  function resetScores() {
    setScores(EMPTY_SCORES);
    newRound();
  }

  return (
    <main>
      <h1>Tic Tac Toe</h1>
      <p aria-live="polite">{getStatus(board, player)}</p>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="cell"
            aria-label={`Feld ${index + 1}`}
            disabled={gameOver}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <p>
        Punkte: X {scores.X} | Remis {scores.draw} | O {scores.O}
      </p>
      <button onClick={newRound}>Neue Runde</button>
      <button onClick={resetScores}>Punkte löschen</button>
    </main>
  );
}
