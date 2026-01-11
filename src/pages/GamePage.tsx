import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chessground } from 'chessground';

// Helper to get piece images for the palette
const getPieceUrl = (role: string, color: 'white' | 'black') => {
    const map: any = {
        white: {
            pawn: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
            bishop: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
            knight: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
            rook: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
            queen: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
            king: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg'
        },
        black: {
            pawn: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
            bishop: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
            knight: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
            rook: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
            queen: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
            king: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg'
        }
    };
    return map[color][role];
};

const GamePage: React.FC = () => {
    const boardRef = useRef<HTMLDivElement>(null);
    const [api, setApi] = useState<any>(null);
    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    const [orientation, setOrientation] = useState<'white' | 'black'>('white');

    useEffect(() => {
        if (boardRef.current && !api) {
            const config = {
                fen: fen,
                orientation: orientation,
                coordinates: false, // Usamos nuestras coordenadas personalizadas
                movable: {
                    free: true, // Modo Editor: permite movimientos ilegales
                    color: 'both',
                    dests: undefined // Permite mover a cualquier sitio
                },
                draggable: {
                    enabled: true,
                },
                drawable: {
                    enabled: true,
                    visible: true,
                    eraseOnClick: true,
                    brushes: {
                        green: { key: 'G', color: '#15781B', opacity: 0.5, lineWidth: 10 },
                        red: { key: 'R', color: '#882020', opacity: 0.5, lineWidth: 10 },
                        blue: { key: 'B', color: '#003088', opacity: 0.5, lineWidth: 10 },
                        yellow: { key: 'Y', color: '#e68000', opacity: 0.5, lineWidth: 10 },
                    }
                },
                events: {
                    change: () => {
                        // Actualizar FEN en UI cuando cambie el tablero (opcional, requiere lógica adicional para generar FEN válido desde config)
                        // Por ahora solo mantenemos el editor visual
                    }
                }
            };
            const cg = Chessground(boardRef.current, config);
            setApi(cg);
        }
    }, [api]);

    // Función para manejar el inicio del arrastre desde la paleta
    const handleDragStart = (e: React.MouseEvent, role: string, color: 'white' | 'black') => {
        e.preventDefault();
        if (api) {
            // Utilizamos la API de chessground para iniciar un arrastre de una pieza nueva
            api.dragNewPiece({ color, role }, e, true);
        }
    };

    const toggleOrientation = () => {
        const newOr = orientation === 'white' ? 'black' : 'white';
        setOrientation(newOr);
        api?.set({ orientation: newOr });
    };

    const clearBoard = () => {
        const emptyFen = "8/8/8/8/8/8/8/8 w - - 0 1";
        api?.set({ fen: emptyFen });
        setFen(emptyFen);
    };

    const resetBoard = () => {
        const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        api?.set({ fen: startFen });
        setFen(startFen);
    };

    const copyFen = () => {
        if (api) {
            const currentFen = api.getFen();
            navigator.clipboard.writeText(currentFen + " w - - 0 1");
            alert("FEN copiado al portapapeles");
        }
    }

    const pieces = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];

    return (
        <div className="flex flex-col items-center justify-center p-4 relative overflow-hidden h-[85vh]">

            {/* Header / Navigation Controls */}
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50 pointer-events-none">
                <Link to="/map" className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 font-bold text-sm pointer-events-auto bg-white/50 px-3 py-1.5 rounded-lg backdrop-blur-sm border-2 border-slate-200">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Salir
                </Link>

                <div className="flex gap-2 pointer-events-auto">
                    <button onClick={resetBoard} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white/50 rounded-lg transition-all border-2 border-transparent hover:border-slate-200" title="Posición Inicial">
                        <span className="material-symbols-outlined">restart_alt</span>
                    </button>
                    <button onClick={clearBoard} className="p-2 text-slate-500 hover:text-red-500 hover:bg-white/50 rounded-lg transition-all border-2 border-transparent hover:border-slate-200" title="Limpiar Tablero">
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                    <button onClick={toggleOrientation} className="p-2 text-slate-500 hover:text-slate-800 hover:bg-white/50 rounded-lg transition-all border-2 border-transparent hover:border-slate-200" title="Rotar Tablero">
                        <span className="material-symbols-outlined">rotate_right</span>
                    </button>
                    <button onClick={copyFen} className="p-2 text-slate-500 hover:text-green-600 hover:bg-white/50 rounded-lg transition-all border-2 border-transparent hover:border-slate-200" title="Copiar FEN">
                        <span className="material-symbols-outlined">content_copy</span>
                    </button>
                </div>
            </div>

            {/* Layout Container */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">

                {/* Palette: White Pieces */}
                <div className="flex md:flex-col gap-2 bg-[#262421] p-2 rounded-xl border border-white/5 shadow-xl order-2 md:order-1">
                    {pieces.map((role) => (
                        <div
                            key={`white-${role}`}
                            onMouseDown={(e) => handleDragStart(e, role, 'white')}
                            className="w-10 h-10 md:w-12 md:h-12 hover:bg-white/10 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center transition-colors"
                        >
                            <img src={getPieceUrl(role, 'white')} alt={role} className="w-full h-full pointer-events-none select-none" />
                        </div>
                    ))}
                </div>

                {/* The Board Container */}
                <div className="relative order-1 md:order-2">
                    <div className="w-[85vw] h-[85vw] max-w-[80vh] max-h-[80vh] aspect-square rounded-md shadow-2xl overflow-hidden bg-[#ebecd0] select-none relative ring-8 ring-[#262421]">
                        {/* Chessground Render Root */}
                        <div ref={boardRef} className="w-full h-full"></div>

                        {/* Custom Coordinates Overlay (Pointer events none allows clicking through to board) */}
                        <div className="absolute inset-0 pointer-events-none z-10 w-full h-full grid grid-cols-8 grid-rows-8">
                            {[...Array(64)].map((_, i) => {
                                const row = Math.floor(i / 8);
                                const col = i % 8;
                                // Invert coordinates logic based on orientation
                                const isFlipped = orientation === 'black';

                                const rank = isFlipped ? row + 1 : 8 - row;
                                const file = isFlipped ? 7 - col : col; // 0-7

                                const showRank = col === 0;
                                const showFile = row === 7;
                                const isLight = (row + col) % 2 === 0;
                                // Text color logic: Dark text on light square (White), White text on dark square (Blue)
                                const textColor = isLight ? 'text-[#60A5FA]' : 'text-white';

                                return (
                                    <div key={i} className="relative w-full h-full">
                                        {showRank && <span className={`absolute top-0.5 left-1 text-[10px] md:text-sm font-bold ${textColor}`}>{rank}</span>}
                                        {showFile && <span className={`absolute bottom-0 right-1 text-[10px] md:text-sm font-bold ${textColor}`}>{String.fromCharCode(97 + file)}</span>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="text-white/20 text-xs font-mono text-center mt-2 flex justify-center gap-4">
                        <span><b className="text-emerald-500">Click Der.</b> Verde</span>
                        <span><b className="text-red-500">Shift</b> Rojo</span>
                        <span><b className="text-blue-500">Alt</b> Azul</span>
                    </div>
                </div>

                {/* Palette: Black Pieces */}
                <div className="flex md:flex-col gap-2 bg-[#262421] p-2 rounded-xl border border-white/5 shadow-xl order-3">
                    {pieces.map((role) => (
                        <div
                            key={`black-${role}`}
                            onMouseDown={(e) => handleDragStart(e, role, 'black')}
                            className="w-10 h-10 md:w-12 md:h-12 hover:bg-white/10 rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center transition-colors"
                        >
                            <img src={getPieceUrl(role, 'black')} alt={role} className="w-full h-full pointer-events-none select-none" />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default GamePage;