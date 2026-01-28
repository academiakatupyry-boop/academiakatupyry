import { supabase } from '../../../lib/supabase';

export interface Puzzle {
    id: string;
    fen: string;
    moves: string;
    rating: number;
    temas: string[];
}

export const puzzleService = {
    /**
     * Fetches a single puzzle to start with.
     * Uses a simple query to ensure connectivity.
     */
    async getFirstPuzzle(): Promise<Puzzle | null> {
        try {
            const { data, error } = await supabase
                .from('puzzles')
                .select('*')
                .limit(1)
                .single();

            if (error) {
                console.error('[PuzzleService] Error fetching puzzle:', error);
                return null;
            }

            return data as Puzzle;
        } catch (err) {
            console.error('[PuzzleService] Unexpected error:', err);
            return null;
        }
    }
};
