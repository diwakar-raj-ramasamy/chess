import { Chess, Move } from 'chess.js';

// Simple Piece Values
const PIECE_VALUES: Record<string, number> = {
    p: 10,
    n: 30,
    b: 30,
    r: 50,
    q: 90,
    k: 900
};

// Evaluate board position
const evaluateBoard = (game: Chess): number => {
    let totalEvaluation = 0;
    const board = game.board();

    board.forEach(row => {
        row.forEach(piece => {
            if (piece) {
                const value = PIECE_VALUES[piece.type] || 0;
                totalEvaluation += piece.color === 'w' ? value : -value;
            }
        });
    });

    return totalEvaluation;
};

// Minimax with Alpha-Beta Pruning
const minimax = (game: Chess, depth: number, alpha: number, beta: number, isMaximizingPlayer: boolean): number => {
    if (depth === 0 || game.isGameOver()) {
        return evaluateBoard(game);
    }

    // Use verbose moves for internal logic too if needed, but moves() string is fine for loop
    const possibleMoves = game.moves();

    if (isMaximizingPlayer) {
        let maxEval = -Infinity;
        for (const move of possibleMoves) {
            game.move(move);
            const evalValue = minimax(game, depth - 1, alpha, beta, false);
            game.undo();
            maxEval = Math.max(maxEval, evalValue);
            alpha = Math.max(alpha, evalValue);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of possibleMoves) {
            game.move(move);
            const evalValue = minimax(game, depth - 1, alpha, beta, true);
            game.undo();
            minEval = Math.min(minEval, evalValue);
            beta = Math.min(beta, evalValue);
            if (beta <= alpha) break;
        }
        return minEval;
    }
};

export const getBestMove = (game: Chess, difficulty: number = 2): Move | null => {
    // Get verbose moves to return full object
    const possibleMoves = game.moves({ verbose: true });
    if (possibleMoves.length === 0) return null;

    let bestMove: Move | null = null;
    let bestValue = game.turn() === 'w' ? -Infinity : Infinity;

    // Shuffle moves to add randomness if evaluations are equal
    const shuffledMoves = possibleMoves.sort(() => 0.5 - Math.random());

    for (const move of shuffledMoves) {
        game.move(move);
        const boardValue = minimax(game, difficulty, -Infinity, Infinity, game.turn() === 'w');
        game.undo();

        if (game.turn() === 'w') {
            if (boardValue > bestValue) {
                bestValue = boardValue;
                bestMove = move;
            }
        } else {
            if (boardValue < bestValue) {
                bestValue = boardValue;
                bestMove = move;
            }
        }
    }

    return bestMove || possibleMoves[0];
};
