import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load env vars if locally available, otherwise user might need to set them
// Im assuming we can read them from the environment or hardcode placeholders
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'YOUR_URL';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function cleanTags() {
    console.log("🧹 Iniciando limpieza de etiquetas en base de datos...");

    // 1. Clean Mate in 1
    console.log("🔍 Verificando Mate en 1 (Debe tener 2 movimientos)...");
    const { data: m1, error: e1 } = await supabase
        .from('puzzles')
        .select('*')
        .contains('temas', ['mateIn1']);

    if (e1) console.error("Error fetching m1:", e1);
    else if (m1) {
        let fixed = 0;
        for (const p of m1) {
            const moves = p.moves.trim().split(' ');
            if (moves.length !== 2) {
                // Remove tag
                const newTags = p.temas.filter(t => t !== 'mateIn1');
                const { error: updateErr } = await supabase
                    .from('puzzles')
                    .update({ temas: newTags })
                    .eq('id', p.id);

                if (!updateErr) {
                    process.stdout.write('.');
                    fixed++;
                } else {
                    console.error(`Failed to update ${p.id}:`, updateErr.message);
                }
            }
        }
        console.log(`\n✨ Mate en 1: ${fixed} ejercicios corregidos de ${m1.length} revisados.`);
    }

    // 2. Clean Mate in 2
    console.log("🔍 Verificando Mate en 2 (Debe tener 4 movimientos)...");
    const { data: m2, error: e2 } = await supabase
        .from('puzzles')
        .select('*')
        .contains('temas', ['mateIn2']);

    if (e2) console.error("Error fetching m2:", e2);
    else if (m2) {
        let fixed = 0;
        for (const p of m2) {
            const moves = p.moves.trim().split(' ');
            if (moves.length !== 4) {
                const newTags = p.temas.filter(t => t !== 'mateIn2');
                const { error: updateErr } = await supabase
                    .from('puzzles')
                    .update({ temas: newTags })
                    .eq('id', p.id);
                if (!updateErr) {
                    process.stdout.write('.');
                    fixed++;
                }
            }
        }
        console.log(`\n✨ Mate en 2: ${fixed} ejercicios corregidos de ${m2.length} revisados.`);
    }
}

cleanTags();
