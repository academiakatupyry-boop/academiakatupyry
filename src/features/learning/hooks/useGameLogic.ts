import { useState, useEffect, useRef, useCallback } from 'react';
import { Chess, Color } from 'chess.js';
import { Puzzle } from '../../../hooks/usePuzzles';

// Helper to convert chess.js moves to Chessground dests
const toDests = (chess: Chess) => {
    const dests = new Map();
    chess.moves({ verbose: true }).forEach((m: any) => {
        if (!dests.has(m.from)) dests.set(m.from, []);
        dests.get(m.from).push(m.to);
    });
    return dests;
};



export const useGameLogic = (puzzle: Puzzle | null) => {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState('start');
    const [dests, setDests] = useState(new Map());
    const [turn, setTurn] = useState<Color>('w'); // 'w' | 'b'
    const [status, setStatus] = useState<'idle' | 'playing' | 'solved' | 'failed'>('idle');

    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string; hint?: string } | null>(null);

    // Refs for mutable state not needing re-renders (loop control)
    const solutionMoves = useRef<string[]>([]);
    const currentMoveIndex = useRef(0);
    const gameRef = useRef(new Chess());

    // Initialize Puzzle
    useEffect(() => {
        if (!puzzle) return;

        const newGame = new Chess(puzzle.fen);
        gameRef.current = newGame;

        setFen(newGame.fen());
        setTurn(newGame.turn());
        setStatus('idle');
        setFeedback(null); // Reset feedback

        solutionMoves.current = puzzle.moves.split(' ');
        currentMoveIndex.current = 0;

        // Auto-play opponent's first move (the setup move)
        const opponentInitialMove = solutionMoves.current[0];

        if (opponentInitialMove) {
            setTimeout(() => {
                const result = makeMoveInEngine(opponentInitialMove);
                if (result) {
                    currentMoveIndex.current = 1; // Advance to user's turn
                    updateGameState();
                    setStatus('playing');
                }
            }, 800); // Small delay for visual effect
        }

    }, [puzzle]);

    // Core State Update (syncs Ref -> State)
    const updateGameState = () => {
        const g = gameRef.current;
        setFen(g.fen());
        setTurn(g.turn());
        setDests(toDests(g));
    };

    // Low-level Move Execution (Engine only)
    const makeMoveInEngine = (moveSanOrObj: string | { from: string, to: string, promotion?: string }) => {
        try {
            const move = gameRef.current.move(moveSanOrObj);
            return move;
        } catch (e) {
            return null;
        }
    };

    // Generate Contextual Hint
    const generateHint = (tempGame: Chess): string => {
        if (tempGame.isCheck()) return "¡Cuidado! Eso da jaque, pero no es mate en 1.";
        if (tempGame.isStalemate()) return "¡Ahogado! Has dejado al rey sin movimientos legales.";
        if (tempGame.isDraw()) return "Esa jugada forzaría tablas.";
        // Generic hints
        return "Esa pieza no da mate en 1. Busca ataques directos al Rey.";
    };

    // Handle User Interaction
    const handleUserMove = useCallback((orig: string, dest: string) => {
        if (status !== 'playing') return false;

        // 1. Check if move is valid in chess rules
        const potentialMove = { from: orig, to: dest, promotion: 'q' };

        // Test move validity without modifying main game
        const tempGame = new Chess(gameRef.current.fen());
        const moveObject = tempGame.move(potentialMove);

        if (!moveObject) {
            return false; // Illegal chess move
        }

        const uciMove = moveObject.from + moveObject.to + (moveObject.promotion || '');
        const expectedMove = solutionMoves.current[currentMoveIndex.current];

        // 2. Check if move matches solution
        if (uciMove === expectedMove) {
            // CORRECT MOVE
            makeMoveInEngine(potentialMove); // Apply to real game
            updateGameState();
            setFeedback({ type: 'success', message: '¡Excelente!' }); // Immediate positive feedback
            currentMoveIndex.current++; // Advance index

            // Check if solved
            if (currentMoveIndex.current >= solutionMoves.current.length) {
                setStatus('solved');
            } else {
                // Play Opponent Response
                setTimeout(() => {
                    const responseMove = solutionMoves.current[currentMoveIndex.current];
                    if (responseMove) {
                        makeMoveInEngine({ from: responseMove.substring(0, 2), to: responseMove.substring(2, 4), promotion: responseMove[4] });
                        currentMoveIndex.current++;
                        updateGameState();
                    } else {
                        setStatus('solved');
                    }
                }, 500);
            }
            return true;
        } else {
            // INCORRECT MOVE (but legal chess move)
            // Generate hint based on the resulting board state if that move *were* played (using tempGame)
            const hint = generateHint(tempGame);

            setFeedback({
                type: 'error',
                message: 'Jugada incorrecta',
                hint: hint
            });

            // Clear feedback after a few seconds? Or keep it until next attempt?
            // Let's keep it until next attempt or make it transient in LessonPage.

            // Return false ensures Chessground snaps back the piece (visual reset)
            return false;
        }

    }, [status]);

    const clearFeedback = () => setFeedback(null);

    return {
        fen,
        turn,
        dests,
        status,
        feedback,
        clearFeedback,
        handleUserMove
    };
};
