import React from 'react';

// "Alpha" / Classic Style - Sharp Knight, Traditional King
export const PIECE_SVGS: Record<string, React.ReactNode> = {
    // White Pawn
    wP: <svg viewBox="0 0 45 45"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" stroke="#000" strokeWidth="1.5" fill="#fff" /></svg>,

    // White Knight - Alpha Style (Sharper, Horse-like)
    wN: <svg viewBox="0 0 45 45"><g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" fill="#ffffff" /><path d="M 24,18 C 24.38,20.91 18.45,16.91 16,21 C 20,23.5 24,21 24,18" fill="#ffffff" /><path d="M 9.5 25.5 A 4.5 4.5 0 1 1 18.5 25.5 A 4.5 4.5 0 1 1 9.5 25.5 z" fill="#ffffff" stroke="#000" strokeWidth="1.5" /><path d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" fill="#000" /></g></svg>,

    // White Bishop
    wB: <svg viewBox="0 0 45 45"><g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><g fill="#fff" strokeLinecap="butt"><path d="M9 36c3.39-.97 9.11-1.45 13.5-1.45 4.38 0 10.11.48 13.5 1.45H9z" /><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" /><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" /></g><path d="M17.5 26h10M15 30h15M22.5 15.5v5M20 18h5" /></g></svg>,

    // White Rook
    wR: <svg viewBox="0 0 45 45"><g fill="#fff" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt" /><path d="M34 14l-3 3H14l-3-3" /><path d="M31 17v12.5H14V17" strokeLinecap="butt" strokeLinejoin="miter" /><path d="M31 29.5l1.5 2.5h-20l1.5-2.5" /><path d="M11 14h23" fill="none" strokeLinejoin="miter" /></g></svg>,

    // White Queen
    wQ: <svg viewBox="0 0 45 45"><g fill="#fff" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM10.5 20.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM38.5 20.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" /><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11z" strokeLinecap="butt" /><path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 1 1 .5 4.5M36 26c0 2-1.5 2-2.5 4-1 2.5-1 1-.5 4.5" /><path d="M9 36c8.5-1.5 21-1.5 27 0l2 2H7l2-2z" strokeLinecap="butt" /><path d="M12 30c5-1 15-1 20 0" fill="none" /></g></svg>,

    // White King - Alpha Style (Traditional Cross)
    wK: <svg viewBox="0 0 45 45"><g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 11.63V6M20 8h5" strokeLinejoin="miter" /><path d="M22.5 25s4.5-7.5 3-13.5c-3-1.5-6-1.5-9 0-1.5 6 3 13.5 3 13.5z" fill="#fff" strokeLinecap="butt" strokeLinejoin="miter" /><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 2-8 2s-4-1-9-1-5 2-8 2-4-2-8-2-1.5 4.5-1.5 4.5l6 10.5v2.5z" fill="#fff" strokeLinecap="butt" strokeLinejoin="miter" /><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" strokeLinejoin="miter" /></g></svg>,

    // Black Pawn
    bP: <svg viewBox="0 0 45 45"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" stroke="#fff" strokeWidth="1.5" fill="#000" /></svg>,

    // Black Knight - Alpha Style
    bN: <svg viewBox="0 0 45 45"><g fill="none" fillRule="evenodd" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" fill="#000" /><path d="M 24,18 C 24.38,20.91 18.45,16.91 16,21 C 20,23.5 24,21 24,18" fill="#000" /><path d="M 9.5 25.5 A 4.5 4.5 0 1 1 18.5 25.5 A 4.5 4.5 0 1 1 9.5 25.5 z" fill="#000" stroke="#fff" strokeWidth="1.5" /><path d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" fill="#fff" /></g></svg>,

    // Black Bishop
    bB: <svg viewBox="0 0 45 45"><g fill="none" fillRule="evenodd" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><g fill="#000" strokeLinecap="butt"><path d="M9 36c3.39-.97 9.11-1.45 13.5-1.45 4.38 0 10.11.48 13.5 1.45H9z" /><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" /><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" /></g><path d="M17.5 26h10M15 30h15M22.5 15.5v5M20 18h5" stroke="#fff" /></g></svg>,

    // Black Rook
    bR: <svg viewBox="0 0 45 45"><g fill="#000" fillRule="evenodd" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt" /><path d="M34 14l-3 3H14l-3-3" /><path d="M31 17v12.5H14V17" strokeLinecap="butt" strokeLinejoin="miter" /><path d="M31 29.5l1.5 2.5h-20l1.5-2.5" /><path d="M11 14h23" fill="none" strokeLinejoin="miter" /></g></svg>,

    // Black Queen
    bQ: <svg viewBox="0 0 45 45"><g fill="#000" fillRule="evenodd" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM10.5 20.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM38.5 20.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" /><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11z" strokeLinecap="butt" /><path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 1 1 .5 4.5M36 26c0 2-1.5 2-2.5 4-1 2.5-1 1-.5 4.5" /><path d="M9 36c8.5-1.5 21-1.5 27 0l2 2H7l2-2z" strokeLinecap="butt" /><path d="M12 30c5-1 15-1 20 0" fill="none" /></g></svg>,

    // Black King - Alpha Style
    bK: <svg viewBox="0 0 45 45"><g fill="none" fillRule="evenodd" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 11.63V6M20 8h5" strokeLinejoin="miter" /><path d="M22.5 25s4.5-7.5 3-13.5c-3-1.5-6-1.5-9 0-1.5 6 3 13.5 3 13.5z" fill="#000" strokeLinecap="butt" strokeLinejoin="miter" /><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 2-8 2s-4-1-9-1-5 2-8 2-4-2-8-2-1.5 4.5-1.5 4.5l6 10.5v2.5z" fill="#000" strokeLinecap="butt" strokeLinejoin="miter" /><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" strokeLinejoin="miter" /></g></svg>,
};
