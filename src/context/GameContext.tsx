import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';

type GameMode = 'PvP' | 'PvC';

interface GameContextType {
    game: Chess;
    board: any[][]; // chess.js board representation
    turn: 'w' | 'b';
    mode: GameMode;
    setMode: (mode: GameMode) => void;
    orientation: 'w' | 'b';
    setOrientation: (o: 'w' | 'b') => void;
    autoFlip: boolean;
    setAutoFlip: (b: boolean) => void;
    makeMove: (from: string, to: string, promotion?: string) => boolean;
    resetGame: () => void;
    undoMove: () => void;
    isGameOver: boolean;
    status: string;
    history: string[];
    resumeGame: () => void;
    hasSavedGame: boolean;
    fen: string;
    surrenderGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [game] = useState(new Chess());
    const [fen, setFen] = useState(game.fen());
    const [mode, setMode] = useState<GameMode>('PvP');
    const [orientation, setOrientation] = useState<'w' | 'b'>('w');
    const [autoFlip, setAutoFlip] = useState(false); // Pass & Play feature
    const [hasSavedGame, setHasSavedGame] = useState(false);
    const [status, setStatus] = useState('');
    const [manualGameOver, setManualGameOver] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('chess_saved_fen');
        if (saved) setHasSavedGame(true);
    }, []);

    const updateState = useCallback(() => {
        setFen(game.fen());

        let newStatus = '';
        if (game.isCheckmate()) {
            const winner = game.turn() === 'w' ? 'Black' : 'White';
            newStatus = `Checkmate - ${winner} Wins!`;
        } else if (game.isDraw()) {
            newStatus = 'Draw';
        } else if (game.isCheck()) {
            newStatus = 'Check';
        }
        setStatus(newStatus);

        localStorage.setItem('chess_saved_fen', game.fen());
        localStorage.setItem('chess_mode', mode);
    }, [game, mode]);

    const makeMove = useCallback((from: string, to: string, promotion: string = 'q') => {
        try {
            const move = game.move({ from, to, promotion });
            if (move) {
                updateState();

                // Auto Flip Logic for Local PvP
                if (mode === 'PvP' && autoFlip) {
                    // Wait a moment for visual clarity then flip
                    setTimeout(() => {
                        setOrientation(o => o === 'w' ? 'b' : 'w');
                    }, 300);
                }

                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    }, [game, updateState, mode, autoFlip]);



    const surrenderGame = useCallback(() => {
        let loser = game.turn() === 'w' ? 'White' : 'Black';
        let winner = game.turn() === 'w' ? 'Black' : 'White';

        // In PvC mode, if the human (orientation) clicks surrender, they lose.
        if (mode === 'PvC') {
            if (orientation === 'w') {
                loser = 'White';
                winner = 'Black';
            } else {
                loser = 'Black';
                winner = 'White';
            }
        }

        setStatus(`${loser} Resigned - ${winner} Wins!`);
        setManualGameOver(true);
    }, [game, mode, orientation]);

    const resetGame = useCallback(() => {
        game.reset();
        setManualGameOver(false);
        setStatus('');
        updateState();
    }, [game, updateState]);

    const undoMove = useCallback(() => {
        if (manualGameOver) return;
        game.undo();
        updateState();
    }, [game, updateState, manualGameOver]);

    const resumeGame = useCallback(() => {
        const savedFen = localStorage.getItem('chess_saved_fen');
        const savedMode = localStorage.getItem('chess_mode') as GameMode;
        if (savedFen) {
            try {
                game.load(savedFen);
                if (savedMode) setMode(savedMode);
                setManualGameOver(false);
                updateState();
            } catch (e) {
                console.error("Invalid saved game", e);
            }
        }
    }, [game, updateState]);

    const isGameOver = game.isGameOver() || manualGameOver;

    return (
        <GameContext.Provider value={{
            game,
            board: game.board(),
            turn: game.turn(),
            mode,
            setMode,
            orientation,
            setOrientation,
            autoFlip,
            setAutoFlip,
            makeMove,
            resetGame,
            undoMove,
            isGameOver,
            status,
            history: game.history(),
            resumeGame,
            hasSavedGame,
            fen,
            surrenderGame
        }}>
            {children}
        </GameContext.Provider>
    );
};
