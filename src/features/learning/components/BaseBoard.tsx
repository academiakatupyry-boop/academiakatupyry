import React, { useEffect, useRef } from 'react';
import { Chessground } from 'chessground';
import '../../../assets/chessground.css';

interface BaseBoardProps {
    fen?: string;
    orientation?: 'white' | 'black';
}

export const BaseBoard: React.FC<BaseBoardProps> = ({
    fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    orientation = 'white'
}) => {
    const boardRef = useRef<HTMLDivElement>(null);
    const apiRef = useRef<any>(null);

    useEffect(() => {
        if (boardRef.current) {
            console.log("Initialize BaseBoard");
            const api = Chessground(boardRef.current, {
                fen: fen,
                orientation: orientation,
                coordinates: true, // Requested feature
                movable: {
                    free: true, // Allow ANY move
                    color: undefined, // Allow moving pieces of both colors (undefined usually allows this in free mode)
                    dests: undefined // No specific destinations
                },
                events: {
                    move: (orig, dest) => {
                        console.log(`Pieza movida: ${orig} -> ${dest}`);
                    }
                }
            });
            apiRef.current = api;

            return () => {
                api.destroy();
            };
        }
    }, [fen, orientation]);

    return (
        <div
            ref={boardRef}
            className="cg-wrap shadow-lg rounded-sm bg-white ring-4 ring-white"
            style={{
                width: '100%',
                height: '100%',
                aspectRatio: '1/1'
            }}
        />
    );
};
