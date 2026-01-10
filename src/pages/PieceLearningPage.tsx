import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Chessground } from 'chessground';

// Data for the pieces
const PIECE_DATA: any = {
    pawn: {
        name: "El Peón",
        description: "El soldado valiente. Avanza paso a paso hacia adelante, pero captura en diagonal. ¡Si llega al final, se transforma!",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
        startPos: "8/8/8/8/4P3/8/8/8 w - - 0 1",
        shapes: [
            { orig: 'e4', brush: 'green' }, // Current
            { orig: 'e5', brush: 'blue' },  // Move
            { orig: 'd5', brush: 'red' },   // Capture
            { orig: 'f5', brush: 'red' }    // Capture
        ]
    },
    rook: {
        name: "La Torre",
        description: "Una fortaleza móvil. Se mueve tantas casillas como quiera, pero siempre en línea recta: horizontal o vertical.",
        icon: "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
        startPos: "8/8/8/8/4R3/8/8/8 w - - 0 1",
        shapes: [
             { orig: 'e4', brush: 'green' },
             { orig: 'e5', brush: 'blue' }, { orig: 'e6', brush: 'blue' }, { orig: 'e7', brush: 'blue' }, { orig: 'e8', brush: 'blue' },
             { orig: 'e3', brush: 'blue' }, { orig: 'e2', brush: 'blue' }, { orig: 'e1', brush: 'blue' },
             { orig: 'a4', brush: 'blue' }, { orig: 'b4', brush: 'blue' }, { orig: 'c4', brush: 'blue' }, { orig: 'd4', brush: 'blue' },
             { orig: 'f4', brush: 'blue' }, { orig: 'g4', brush: 'blue' }, { orig: 'h4', brush: 'blue' },
        ]
    },
    knight: {
        name: "El Caballo",
        description: "El saltador astuto. Es la única pieza que puede saltar sobre otras. Se mueve en forma de 'L'.",
        icon: "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
        startPos: "8/8/8/8/4N3/8/8/8 w - - 0 1",
        shapes: [
            { orig: 'e4', brush: 'green' },
            { orig: 'd6', brush: 'blue' }, { orig: 'f6', brush: 'blue' },
            { orig: 'c5', brush: 'blue' }, { orig: 'g5', brush: 'blue' },
            { orig: 'c3', brush: 'blue' }, { orig: 'g3', brush: 'blue' },
            { orig: 'd2', brush: 'blue' }, { orig: 'f2', brush: 'blue' }
        ]
    },
    bishop: {
        name: "El Alfil",
        description: "El consejero real. Se mueve en diagonales. Un alfil siempre se queda en las casillas de su mismo color.",
        icon: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
        startPos: "8/8/8/8/4B3/8/8/8 w - - 0 1",
        shapes: [
            { orig: 'e4', brush: 'green' },
            { orig: 'd5', brush: 'blue' }, { orig: 'c6', brush: 'blue' }, { orig: 'b7', brush: 'blue' }, { orig: 'a8', brush: 'blue' },
            { orig: 'f5', brush: 'blue' }, { orig: 'g6', brush: 'blue' }, { orig: 'h7', brush: 'blue' },
            { orig: 'd3', brush: 'blue' }, { orig: 'c2', brush: 'blue' }, { orig: 'b1', brush: 'blue' },
            { orig: 'f3', brush: 'blue' }, { orig: 'g2', brush: 'blue' }, { orig: 'h1', brush: 'blue' }
        ]
    },
    queen: {
        name: "La Dama",
        description: "La pieza más poderosa. Combina los movimientos de la Torre y el Alfil. Puede ir a todas partes.",
        icon: "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
        startPos: "8/8/8/8/4Q3/8/8/8 w - - 0 1",
        shapes: [
            { orig: 'e4', brush: 'green' },
            // Rook moves
            { orig: 'e5', brush: 'blue' }, { orig: 'e6', brush: 'blue' }, { orig: 'e7', brush: 'blue' }, { orig: 'e8', brush: 'blue' },
             { orig: 'e3', brush: 'blue' }, { orig: 'e2', brush: 'blue' }, { orig: 'e1', brush: 'blue' },
             { orig: 'a4', brush: 'blue' }, { orig: 'b4', brush: 'blue' }, { orig: 'c4', brush: 'blue' }, { orig: 'd4', brush: 'blue' },
             { orig: 'f4', brush: 'blue' }, { orig: 'g4', brush: 'blue' }, { orig: 'h4', brush: 'blue' },
             // Bishop moves
            { orig: 'd5', brush: 'blue' }, { orig: 'c6', brush: 'blue' }, { orig: 'b7', brush: 'blue' }, { orig: 'a8', brush: 'blue' },
            { orig: 'f5', brush: 'blue' }, { orig: 'g6', brush: 'blue' }, { orig: 'h7', brush: 'blue' },
            { orig: 'd3', brush: 'blue' }, { orig: 'c2', brush: 'blue' }, { orig: 'b1', brush: 'blue' },
            { orig: 'f3', brush: 'blue' }, { orig: 'g2', brush: 'blue' }, { orig: 'h1', brush: 'blue' }
        ]
    },
    king: {
        name: "El Rey",
        description: "El líder. Es la pieza más importante, pero es lento. Se mueve solo un paso a la vez en cualquier dirección.",
        icon: "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
        startPos: "8/8/8/8/4K3/8/8/8 w - - 0 1",
        shapes: [
            { orig: 'e4', brush: 'green' },
            { orig: 'd3', brush: 'blue' }, { orig: 'e3', brush: 'blue' }, { orig: 'f3', brush: 'blue' },
            { orig: 'd4', brush: 'blue' }, { orig: 'f4', brush: 'blue' },
            { orig: 'd5', brush: 'blue' }, { orig: 'e5', brush: 'blue' }, { orig: 'f5', brush: 'blue' }
        ]
    }
};

const PieceLearningPage: React.FC = () => {
    const navigate = useNavigate();
    const boardRef = useRef<HTMLDivElement>(null);
    const [api, setApi] = useState<any>(null);
    const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
    const [mode, setMode] = useState<'explore' | 'move'>('explore');
    
    // Ref to track mode inside closures
    const modeRef = useRef(mode);
    useEffect(() => { modeRef.current = mode; }, [mode]);

    // Init Board
    useEffect(() => {
        if (boardRef.current && !api) {
            const config = {
                fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                coordinates: false,
                movable: {
                    free: false, 
                    color: 'white',
                    dests: new Map() // Disable actual moving
                },
                selectable: {
                    enabled: true
                },
                drawable: {
                    enabled: true,
                    visible: true
                },
                // We do NOT bind events here to avoid stale closures. We do it in the next effect.
            };
            const cg = Chessground(boardRef.current, config);
            setApi(cg);
        }
    }, [api]);

    // Bind Events (runs when api is set)
    useEffect(() => {
        if (api) {
            api.set({
                events: {
                    select: (key: string) => {
                        handleSquareSelect(key);
                    }
                }
            });
        }
    }, [api]);

    // Handle "Select" logic
    const handleSquareSelect = (key: string) => {
        // We use modeRef to get the current mode, not the one from closure
        const currentMode = modeRef.current;
        
        // If in "Move" mode, ignore selection or reset
        if (currentMode === 'move') {
            resetToExplore();
            return;
        }

        // We need to access the API instance. Since this function is called by the effect 
        // that runs when `api` is ready, `api` should be defined in this scope.
        // However, if strict null checks fail, we can rely on `api` from state.
        if (!api) return;

        // Access internal state for pieces
        const pieces = api.state.pieces; 
        const piece = pieces.get(key);

        if (piece) {
            setSelectedPiece(piece.role);
            // Highlight the square
            api.setShapes([{ orig: key, brush: 'yellow' }]);
        } else {
            setSelectedPiece(null);
            api.setShapes([]);
        }
        
        // Clear selection visual immediately so it can be re-clicked
        setTimeout(() => api.set({ selected: undefined }), 50);
    };

    const handleLearnToMove = () => {
        if (!selectedPiece || !api) return;
        
        const data = PIECE_DATA[selectedPiece];
        if (!data) return;

        setMode('move');
        
        // Clear board and place piece in center
        api.set({ fen: data.startPos });
        
        // Draw arrows/shapes
        setTimeout(() => {
             api.setShapes(data.shapes);
        }, 100);
    };

    const resetToExplore = () => {
        setMode('explore');
        setSelectedPiece(null);
        if (api) {
            api.set({ fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' });
            api.setShapes([]);
        }
    };

    return (
        <div className="min-h-screen bg-[#302e2b] flex flex-col items-center justify-center p-4 relative overflow-hidden font-display">
            
            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50">
                <Link to="/map" className="text-white/50 hover:text-white transition-colors flex items-center gap-2 font-bold text-sm bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Salir
                </Link>
                <div className="bg-black/20 px-4 py-1.5 rounded-lg backdrop-blur-sm text-white font-bold flex items-center gap-2">
                   <span className="material-symbols-outlined text-yellow-400">extension</span>
                   Conociendo el Ejército
                </div>
            </div>

            {/* Instruction Title */}
            <div className="mb-6 text-center z-10 transition-all duration-500">
                {mode === 'explore' ? (
                    <>
                        <h2 className="text-white/60 text-sm font-bold uppercase tracking-widest mb-1">Modo Exploración</h2>
                        <h1 className="text-3xl md:text-4xl font-black text-white">Toca una pieza</h1>
                    </>
                ) : (
                    <>
                         <h2 className="text-white/60 text-sm font-bold uppercase tracking-widest mb-1">Modo Movimiento</h2>
                         <h1 className="text-3xl md:text-4xl font-black text-white">{PIECE_DATA[selectedPiece!]?.name}</h1>
                    </>
                )}
            </div>

            {/* Board */}
            <div className="relative">
                <div className={`w-[85vw] h-[85vw] max-w-[65vh] max-h-[65vh] aspect-square rounded-md shadow-2xl overflow-hidden bg-[#ebecd0] select-none relative ring-8 ring-[#262421] transition-all duration-500 ${mode === 'move' ? 'scale-105 ring-emerald-500/50' : ''}`}>
                    <div ref={boardRef} className="w-full h-full"></div>
                     {/* Blue/White Overlay */}
                     <div className="absolute inset-0 pointer-events-none z-10 w-full h-full grid grid-cols-8 grid-rows-8">
                            {[...Array(64)].map((_, i) => {
                            const row = Math.floor(i / 8);
                            const col = i % 8;
                            const isLight = (row + col) % 2 === 0;
                            const textColor = isLight ? 'text-[#60A5FA]' : 'text-white';
                            // Coordinates logic mostly for visual if needed, but we keep it clean here
                            return null; 
                        })}
                    </div>
                </div>

                {/* Back to Coordinates Button (Only in Explore mode) */}
                {mode === 'explore' && !selectedPiece && (
                     <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                        <button 
                            onClick={() => navigate('/learn/coordinates')}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all text-sm backdrop-blur-md"
                        >
                            <span className="material-symbols-outlined">grid_on</span>
                            Ir a Coordenadas
                        </button>
                    </div>
                )}
            </div>

            {/* Info Card Overlay */}
            {selectedPiece && mode === 'explore' && (
                <div className="absolute bottom-8 left-4 right-4 md:left-auto md:right-auto md:w-96 md:bottom-auto md:top-1/2 md:translate-y-[-50%] z-50 animate-float" style={{ animationDuration: '4s' }}>
                    <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-floating border-2 border-white/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-island/10 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
                        
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-island to-primary-light rounded-2xl flex items-center justify-center shrink-0 shadow-comic-primary">
                                <img src={PIECE_DATA[selectedPiece].icon} className="w-12 h-12 invert brightness-0 filter" alt="icon" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-text-dark-fun leading-none mb-1">{PIECE_DATA[selectedPiece].name}</h3>
                                <span className="text-xs font-bold text-primary-island uppercase tracking-wider">Pieza Clásica</span>
                            </div>
                        </div>
                        
                        <p className="mt-4 text-text-muted-light font-bold text-sm leading-relaxed">
                            {PIECE_DATA[selectedPiece].description}
                        </p>

                        <button 
                            onClick={handleLearnToMove}
                            className="mt-6 w-full bg-secondary-adventure hover:bg-yellow-400 text-primary-island font-black py-3 rounded-xl shadow-btn hover:shadow-btn-hover hover:translate-y-[1px] transition-all active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">school</span>
                            Aprender a Mover
                        </button>
                    </div>
                </div>
            )}

            {/* Move Mode Controls */}
            {mode === 'move' && (
                <div className="mt-8 z-10 animate-bounce-slow">
                     <button 
                        onClick={resetToExplore}
                        className="bg-white text-text-dark-fun font-black px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Volver a Explorar
                    </button>
                </div>
            )}

        </div>
    );
};

export default PieceLearningPage;