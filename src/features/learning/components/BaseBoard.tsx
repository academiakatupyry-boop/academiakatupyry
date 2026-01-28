import React, { useEffect, useRef } from 'react';
import { Chessground } from 'chessground';
import '../../../assets/chessground.css';

interface BaseBoardProps {
    fen?: string;
    orientation?: 'white' | 'black';
    isLoading?: boolean;
    dests?: Map<string, string[]>;
    onMove?: (orig: string, dest: string) => void;
}

export const BaseBoard: React.FC<BaseBoardProps> = ({
    fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    orientation = 'white',
    isLoading = false,
    dests,
    onMove
}) => {
    const boardRef = useRef<HTMLDivElement>(null);
    const apiRef = useRef<any>(null);

    // Initialize & Update Board
    useEffect(() => {
        if (boardRef.current && !isLoading) {

            // If API exists, update it
            if (apiRef.current) {
                apiRef.current.set({
                    apiRef.current.set({
                        fen: fen,
                        dests: dests,
                        orientation: orientation, // Fix: Explicitly update board rotation
                        turnColor: orientation === 'white' ? 'white' : 'black',
                        movable: {
                            fen: fen,
                            dests: dests,
                            orientation: orientation,
                            turnColor: orientation === 'white' ? 'white' : 'black',
                            movable: {
                                color: orientation === 'white' ? 'white' : 'black',
                                showDests: true
                            },
                            events: {
                                move: (orig, dest) => {
                                    if (onMove) onMove(orig, dest);
                                }
                            }
                        });
                } else {
                    // First initialization
                    const api = Chessground(boardRef.current, {
                        fen: fen,
                        dests: dests,
                        orientation: orientation,
                        turnColor: orientation === 'white' ? 'white' : 'black',
                        movable: {
                            color: orientation === 'white' ? 'white' : 'black',
                            showDests: true
                        },
                        events: {
                            move: (orig, dest) => {
                                if (onMove) onMove(orig, dest);
                            }
                        }
                    });
                    apiRef.current = api;
                }
        }
        }, [fen, orientation, isLoading, dests]);

    // Clean up on unmount ONLY
    useEffect(() => {
        return () => {
            if (apiRef.current) apiRef.current.destroy();
        };
    }, []);

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
