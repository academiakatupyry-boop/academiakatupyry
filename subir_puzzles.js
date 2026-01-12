const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// REEMPLAZA ESTOS DATOS con los de tu proyecto en Supabase (Settings > API)
// Nota: Normalmente usaríamos variables de entorno, pero para este script manual
// puedes pegarlas aquí o asegurarte de tener un archivo .env que cargues.
// Por seguridad, intentaremos leer de process.env si usas 'dotenv' o puedes pegarlas directo.

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'TU_URL_DE_SUPABASE';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'TU_ANON_KEY';
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
