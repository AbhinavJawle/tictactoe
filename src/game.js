// Die Spielregeln. Kein React hier drin – deshalb kann Vitest alles direkt testen.

export const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Reihen
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
  [0, 4, 8], [2, 4, 6],            // Diagonalen
];

// Leeres 3×3-Spielfeld (9 Felder, Index 0–8).
export function createBoard() {
  return Array(9).fill('');
}

// 'X' oder 'O', wenn jemand drei in einer Linie hat, sonst null.
export function getWinner(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Unentschieden: alle Felder voll und kein Gewinner.
export function isDraw(board) {
  return board.every((cell) => cell !== '') && getWinner(board) === null;
}

export function isGameOver(board) {
  return getWinner(board) !== null || isDraw(board);
}

export function nextPlayer(player) {
  return player === 'X' ? 'O' : 'X';
}

// Setzt das Zeichen von player auf Feld index.
// Ungültiger Zug (Feld belegt, Spiel vorbei, Index nicht 0–8) → altes Spielfeld unverändert zurück.
export function makeMove(board, index, player) {
  if (isGameOver(board)) return board;
  if (index < 0 || index > 8 || board[index] !== '') return board;
  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
}

// Text für die Statuszeile.
export function getStatus(board, player) {
  const winner = getWinner(board);
  if (winner) return `${winner} gewinnt!`;
  if (isDraw(board)) return 'Unentschieden!';
  return `${player} ist am Zug`;
}

// Zählt das Ergebnis eines beendeten Spiels zum Punktestand dazu.
export function addResult(scores, board) {
  const winner = getWinner(board);
  if (winner) return { ...scores, [winner]: scores[winner] + 1 };
  if (isDraw(board)) return { ...scores, draw: scores.draw + 1 };
  return scores;
}
