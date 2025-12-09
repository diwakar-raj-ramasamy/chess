import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { RefreshCw } from 'lucide-react';

export const GameOverModal: React.FC = () => {
    const { isGameOver, status, turn, resetGame, game } = useGame();

    if (!isGameOver) return null;

    // Determine winner/result details
    let title = "Game Over";
    let subtitle = "";
    let winnerColor = "";

    // Sound effect using AudioContext
    React.useEffect(() => {
        const playSound = () => {
            try {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                if (!AudioContext) return;

                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.connect(gain);
                gain.connect(ctx.destination);

                // Simple "Ta-da" or "Game Over" sound
                const now = ctx.currentTime;

                if (game.isCheckmate() && (game.turn() === 'b' ? 'White' : 'Black') === 'White') { // Assuming player is white in single player or just general win
                    // Victory sound (Major arpeggio)
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(523.25, now); // C5
                    osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
                    osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
                    osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6

                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

                    osc.start(now);
                    osc.stop(now + 0.8);
                } else {
                    // Generic Game Over / Loss / Draw (Descending tones)
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(440, now); // A4
                    osc.frequency.setValueAtTime(392, now + 0.2); // G4
                    osc.frequency.setValueAtTime(349.23, now + 0.4); // F4

                    gain.gain.setValueAtTime(0.1, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

                    osc.start(now);
                    osc.stop(now + 0.8);
                }
            } catch (e) {
                console.error("Audio play failed", e);
            }
        };

        playSound();
    }, [game]);

    if (game.isCheckmate()) {
        title = "CHECKMATE";
        // If it's White's turn and they are in checkmate, Black won.
        const winner = game.turn() === 'w' ? 'Black' : 'White';
        subtitle = `${winner} Wins!`;
        winnerColor = winner === 'White' ? '#fff' : '#aaa';
    } else if (game.isDraw()) {
        title = "DRAW";
        subtitle = "Stalemate / Insufficient Material";
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'auto' // capture clicks
                }}
            >
                <motion.div
                    initial={{ scale: 0.5, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                    style={{
                        background: 'rgba(30, 41, 59, 0.9)',
                        padding: '3rem',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        textAlign: 'center',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <motion.h1
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1.1 }}
                        transition={{
                            repeat: Infinity,
                            repeatType: 'reverse',
                            duration: 1
                        }}
                        style={{
                            color: '#ef4444',
                            fontSize: '4rem',
                            margin: '0 0 1rem 0',
                            fontWeight: 900,
                            letterSpacing: '2px',
                            textShadow: '0 4px 12px rgba(239, 68, 68, 0.5)'
                        }}
                    >
                        {title}
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            color: winnerColor || '#e2e8f0',
                            fontSize: '2.5rem',
                            margin: '0 0 2rem 0',
                            fontWeight: 700
                        }}
                    >
                        {subtitle}
                    </motion.h2>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetGame}
                        style={{
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            padding: '1rem 2rem',
                            fontSize: '1.2rem',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            margin: '0 auto',
                            fontWeight: 600,
                            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)'
                        }}
                    >
                        <RefreshCw size={24} /> New Game
                    </motion.button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
