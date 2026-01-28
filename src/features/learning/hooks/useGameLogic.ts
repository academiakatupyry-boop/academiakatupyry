import { useState, useEffect, useRef, useCallback } from 'react';
import { Chess } from 'chess.js';
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
    const [turn, setTurn] = useState<"white" | "black">('white');
    const [status, setStatus] = useState<'idle' | 'playing' | 'solved' | 'failed'>('idle');

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

    // Handle User Interaction
    const handleUserMove = useCallback((orig: string, dest: string) => {
        if (status !== 'playing') return false;

        // 1. Check if move is valid in chess rules
        const potentialMove = { from: orig, to: dest, promotion: 'q' }; // Always promote to queen for simplicity for now

        // We clone the game to test the move without modifying the actual game state yet
        // actually chess.js .move() returns null if invalid, so we can just try it.
        // But for "correctness" check, we need to convert to UCI (e2e4) and compare with solution string.

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
            currentMoveIndex.current++; // Advance index

            // Check if solved
            if (currentMoveIndex.current >= solutionMoves.current.length) {
                setStatus('solved');
            } else {
                // Play Opponent Response (if any)
                setTimeout(() => {
                    const responseMove = solutionMoves.current[currentMoveIndex.current];
                    if (responseMove) {
                        makeMoveInEngine(responseMove); // UCI string works directly usually? No, chess.js move() takes string or object.
                        // chess.js .move('e2e4', {loose: true}) doesn't accept UCI directly easily in strict mode sometimes.
                        // Ideally we parse UCI: from=e2, to=e4, promo=...
                        const from = responseMove.substring(0, 2);
                        const to = responseMove.substring(2, 4);
                        const promotion = responseMove.length > 4 ? responseMove[4] : undefined;

                        makeMoveInEngine({ from, to, promotion });
                        currentMoveIndex.current++;
                        updateGameState();
                    } else {
                        setStatus('solved'); // No response left, solved?
                    }
                }, 500);
            }
            return true;
        } else {
            // INCORRECT MOVE
            // Do not apply to game.
            // Maybe handle failed state or just let user retry?
            // User requested: "Devuelve la pieza a su lugar y muestra mensaje"
            // So we return false (chessground will snapback often if we control fen)
            // or we just don't update state.
            console.log("Incorrect move. Expected:", expectedMove, "Got:", uciMove);
            return false;
        }

    }, [status]);

    return {
        fen,
        turn,
        dests,
        status,
        handleUserMove
    };
};
