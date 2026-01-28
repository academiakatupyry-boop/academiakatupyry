import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Puzzle {
    id: string;
    fen: string;
    moves: string;
    rating: number;
    temas: string[];
}

export const usePuzzles = () => {
    const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPuzzles = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('puzzles')
                    .select('*');

                if (error) {
                    throw error;
                }

                if (data) {
                    setPuzzles(data);
                }
            } catch (err: any) {
                console.error('Error fetching puzzles:', err);
                setError(err.message || 'Error desconocido al cargar puzzles');
            } finally {
                setLoading(false);
            }
        };

        fetchPuzzles();
    }, []);

    return { puzzles, loading, error };
};
