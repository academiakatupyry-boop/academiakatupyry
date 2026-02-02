import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env manually if available
let env = {};
if (fs.existsSync('.env')) {
    const envContent = fs.readFileSync('.env', 'utf8');
    envContent.split('\n').forEach(line => {
        const [k, v] = line.split('=');
        if (k && v) env[k.trim()] = v.trim();
    });
}

const supabaseUrl = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: Missing Supabase Credentials in .env or process.env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function subirDatos() {
    try {
        console.log("📂 Buscando archivo puzzles_academia.json...");
        if (!fs.existsSync('puzzles_academia.json')) {
            console.error("❌ El archivo 'puzzles_academia.json' no se encuentra en el directorio.");
            return;
        }

        const rawData = fs.readFileSync('puzzles_academia.json', 'utf8');
        const data = JSON.parse(rawData);
        const tamañoBloque = 1000;

        console.log(`🚀 Iniciando subida de ${data.length} puzzles...`);

        // Validación básica de la estructura
        if (data.length > 0 && (!data[0].fen || !data[0].moves)) {
            console.warn("⚠️ Los datos no parecen tener la estructura esperada (id, fen, moves, rating, temas).");
        }

        for (let i = 0; i < data.length; i += tamañoBloque) {
            const bloque = data.slice(i, i + tamañoBloque);

            const { error } = await supabase
                .from('puzzles')
                .insert(bloque.map(p => ({
                    id: p.id,
                    fen: p.fen,
                    moves: p.moves,
                    rating: p.rating,
                    temas: p.temas // Asegúrate de que esto sea un array de strings en el JSON
                })));

            if (error) {
                console.error(`❌ Error en bloque ${i}:`, error.message);
            } else {
                console.log(`✅ Subidos ${i + bloque.length} / ${data.length}`);
            }
        }
        console.log("🏁 ¡Todos los puzzles están en la nube!");
    } catch (err) {
        console.error("❌ Error inesperado:", err);
    }
}

subirDatos();
