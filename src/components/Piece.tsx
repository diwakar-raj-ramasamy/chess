import React from 'react';
import { motion } from 'framer-motion';
import { PIECE_SVGS } from './PieceIcons';


interface PieceProps {
    type: string;
    color: 'w' | 'b';
}

export const Piece: React.FC<PieceProps> = ({ type, color }) => {
    const code = `${color}${type.toUpperCase()}`;

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="piece"
            style={{
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                pointerEvents: 'none', // Clicks handle on square
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {PIECE_SVGS[code]}
        </motion.div>
    );
};
