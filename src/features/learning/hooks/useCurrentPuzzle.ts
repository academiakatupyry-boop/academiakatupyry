import { useState, useEffect } from 'react';
import { puzzleService, Puzzle } from '../services/puzzleService';

export const useCurrentPuzzle = () => {
    const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const loadPuzzle = async () => {
            setLoading(true);
            const data = await puzzleService.getFirstPuzzle();

            if (mounted) {
                if (data) {
                    setPuzzle(data);
                    setError(null);
                } else {
                    setError('No se pudo cargar el ejercicio.');
                }
                setLoading(false);
            }
        };

        loadPuzzle();

        return () => {
            mounted = false;
        };
    }, []);

    return { puzzle, loading, error };
};
