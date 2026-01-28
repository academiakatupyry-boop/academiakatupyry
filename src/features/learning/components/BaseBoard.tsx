import React, { useEffect, useRef } from 'react';
import { Chessground } from 'chessground';
import '../../../assets/chessground.css';

interface BaseBoardProps {
    fen?: string;
    orientation?: 'white' | 'black';
    isLoading?: boolean;
}

export const BaseBoard: React.FC<BaseBoardProps> = ({
    fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    orientation = 'white',
    isLoading = false
}) => {
    const boardRef = useRef<HTMLDivElement>(null);
    const apiRef = useRef<any>(null);

    useEffect(() => {
        if (boardRef.current && !isLoading) { // Only initialize if not loading
            console.log("Initialize BaseBoard");
            const api = Chessground(boardRef.current, {
                fen: fen,
                orientation: orientation,
                coordinates: true, // Requested feature
                movable: {
                    free: true,
                    color: 'both' as any, // Force 'both' to allow moving any piece
                    dests: undefined // Allow all destinations
                },
                viewOnly: false, // Explicitly enable interaction
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
        <div className="relative w-full h-full aspect-square">
            <div
                ref={boardRef}
                className="cg-wrap shadow-lg rounded-sm bg-white ring-4 ring-white"
                style={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1/1'
                }}
            />
            {isLoading && (
                <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center rounded-sm backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-island mb-3"></div>
                    <span className="text-slate-600 font-bold text-sm tracking-wide">Cargando tablero...</span>
                </div>
            )}
        </div>
    );
};
