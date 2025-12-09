import React from 'react';
import { useGame } from '../context/GameContext';
import { RotateCcw, Play, User, Cpu, Flag } from 'lucide-react';
import styles from './Controls.module.css';

export const Controls: React.FC = () => {
    const {
        turn,
        mode,
        setMode,
        resetGame,
        undoMove,
        status,
        isGameOver,
        resumeGame,
        hasSavedGame,
        orientation,
        setOrientation,
        autoFlip,
        setAutoFlip,
        surrenderGame
    } = useGame();

    return (
        <div className={styles.panel}>
            <h1 className={styles.title}>CHESS MASTER</h1>

            <div className={styles.statusBox}>
                <div className={styles.turnIndicator}>
                    <span className={turn === 'w' ? styles.activeTurn : ''}>White</span>
                    <span className={styles.vs}>VS</span>
                    <span className={turn === 'b' ? styles.activeTurn : ''}>Black</span>
                </div>
                {status && <div className={styles.gameStatus}>{status}</div>}
                {isGameOver && <div className={styles.gameOver}>GAME OVER</div>}
            </div>

            <div className={styles.modeSelect}>
                <button
                    className={mode === 'PvP' ? styles.activeMode : ''}
                    onClick={() => setMode('PvP')}
                >
                    <User size={18} /> PvP
                </button>
                <button
                    className={mode === 'PvC' ? styles.activeMode : ''}
                    onClick={() => setMode('PvC')}
                >
                    <Cpu size={18} /> PvComputer
                </button>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                <button
                    className={styles.secondaryBtn}
                    style={{ flex: 1 }}
                    onClick={() => setOrientation(orientation === 'w' ? 'b' : 'w')}
                >
                    Flip Board
                </button>
                <button
                    className={styles.secondaryBtn}
                    style={{ flex: 1, backgroundColor: autoFlip ? 'rgba(59, 130, 246, 0.2)' : 'transparent', borderColor: autoFlip ? '#3b82f6' : '' }}
                    onClick={() => setAutoFlip(!autoFlip)}
                >
                    Auto Flip {autoFlip ? '(On)' : '(Off)'}
                </button>
            </div>

            <div className={styles.actions}>
                <button onClick={resetGame} aria-label="New Game">
                    <RotateCcw size={20} /> New Game
                </button>
                <button onClick={undoMove} disabled={mode === 'PvC' && turn === 'b'}>
                    Undo
                </button>

                <button
                    onClick={surrenderGame}
                    className={styles.dangerBtn}
                    aria-label="Surrender"
                >
                    <Flag size={20} /> Surrender
                </button>

                {hasSavedGame && (
                    <button onClick={resumeGame} className={styles.resumeBtn}>
                        <Play size={20} /> Resume Saved
                    </button>
                )}
            </div>

            <div className={styles.info}>
                <p>Auto-saving enabled.</p>
                {mode === 'PvC' && <p>Computer plays Black.</p>}
            </div>
        </div>
    );
};
