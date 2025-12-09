import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Square } from './Square';
import styles from './Board.module.css';
import { getBestMove } from '../engine/ai';

export const Board: React.FC = () => {
    const { game, board, makeMove, turn, mode, history, isGameOver, orientation } = useGame();
    const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
    const [lastMoveSquares, setLastMoveSquares] = useState<[string, string] | null>(null);

    // AI Logic Trigger
    useEffect(() => {
        if (mode === 'PvC' && !isGameOver) {
            const aiTurn = orientation === 'w' ? 'b' : 'w';
            if (turn === aiTurn) {
                const timer = setTimeout(() => {
                    const bestMove = getBestMove(game);
                    if (bestMove) {
                        makeMove(bestMove.from, bestMove.to, bestMove.promotion);
                    }
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [turn, mode, isGameOver, game, makeMove, orientation]);

    // Track Last Move for highlighting
    useEffect(() => {
        if (history.length > 0) {
            // Need verbose history to get from/to. 
            // chess.js history({verbose: true}) gives us this.
            const last = game.history({ verbose: true }).pop();
            if (last) {
                setLastMoveSquares([last.from, last.to]);
            }
        } else {
            setLastMoveSquares(null);
        }
    }, [history, game]);


    const handleSquareClick = (square: string) => {
        const aiTurn = orientation === 'w' ? 'b' : 'w';

        // Prevent moving if Game Over or AI's turn
        if (isGameOver || (mode === 'PvC' && turn === aiTurn)) return;

        // If I click the same square, deselect
        if (selectedSquare === square) {
            setSelectedSquare(null);
            setPossibleMoves([]);
            return;
        }

        // Check if valid move for currently selected piece
        if (selectedSquare) {
            const moveSuccessful = makeMove(selectedSquare, square);
            if (moveSuccessful) {
                setSelectedSquare(null);
                setPossibleMoves([]);
                return;
            }
        }

        // Select new piece
        const piece = game.get(square as any);
        if (piece && piece.color === turn) {
            setSelectedSquare(square);
            const moves = game.moves({ square: square as any, verbose: true });
            setPossibleMoves(moves.map(m => m.to));
        } else {
            setSelectedSquare(null);
            setPossibleMoves([]);
        }
    };

    const renderedRows = orientation === 'w' ? board : [...board].reverse().map(row => [...row].reverse());

    return (
        <div className={styles.boardContainer}>
            <div className={styles.board}>
                {renderedRows.map((row, rowIndex) => (
                    row.map((piece, colIndex) => {
                        let file, rank;
                        if (orientation === 'w') {
                            file = String.fromCharCode(97 + colIndex);
                            rank = 8 - rowIndex;
                        } else {
                            file = String.fromCharCode(104 - colIndex);
                            rank = rowIndex + 1;
                        }
                        const square = `${file}${rank}`;

                        const isLight = (rowIndex + colIndex) % 2 === 0;
                        const isSelected = selectedSquare === square;
                        const isPotential = possibleMoves.includes(square);
                        const isLastMove = lastMoveSquares ? lastMoveSquares.includes(square) : false;

                        // Check logic: Find King. If in check, highlight.
                        const isCheck = piece?.type === 'k' && piece?.color === turn && game.isCheck();

                        return (
                            <Square
                                key={square}
                                square={square}
                                isLight={isLight}
                                piece={piece}
                                isSelected={isSelected}
                                isPotentialMove={isPotential}
                                isLastMove={isLastMove}
                                isCheck={isCheck}
                                onClick={() => handleSquareClick(square)}
                            />
                        );
                    })
                ))}
            </div>
        </div>
    );
};
