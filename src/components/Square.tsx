import React from 'react';
import clsx from 'clsx';
import type { Piece as PieceType } from 'chess.js';
import { Piece } from './Piece';
import styles from './Board.module.css';

interface SquareProps {
    square: string;
    isLight: boolean;
    piece: PieceType | null;
    isSelected: boolean;
    isPotentialMove: boolean;
    isLastMove: boolean;
    isCheck: boolean;
    onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({
    isLight, piece, isSelected, isPotentialMove, isLastMove, isCheck, onClick
}) => {
    return (
        <div
            onClick={onClick}
            className={clsx(
                styles.square,
                isLight ? styles.light : styles.dark,
                isSelected && styles.selected,
                isPotentialMove && styles.potential,
                isLastMove && styles.lastMove,
                isCheck && styles.check
            )}
        >
            {piece && <Piece type={piece.type} color={piece.color} />}
            {isPotentialMove && !piece && <div className={styles.potentialMarker} />}
            {isPotentialMove && piece && <div className={styles.captureMarker} />}
        </div>
    );
};
