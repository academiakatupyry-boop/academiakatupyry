
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Manual Env Loading ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

let SUPABASE_URL = process.env.VITE_SUPABASE_URL;
let SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            if (key.trim() === 'VITE_SUPABASE_URL') SUPABASE_URL = value.trim();
            if (key.trim() === 'VITE_SUPABASE_ANON_KEY') SUPABASE_KEY = value.trim();
        }
    });
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
    console.log('🕵️ Analyzing Puzzles Table...');

    const { data: puzzles, error } = await supabase
        .from('puzzles')
        .select('id, fen');

    if (error) {
        console.error('❌ Error fetching:', error);
        return;
    }

    let whiteToMove = 0;
    let blackToMove = 0;

    puzzles.forEach(p => {
        const parts = p.fen.split(' ');
        if (parts.length > 1) {
            if (parts[1] === 'w') whiteToMove++;
            else if (parts[1] === 'b') blackToMove++;
        }
    });

    console.log(`📊 Report:\n  - Total Puzzles: ${puzzles.length}\n  - White to Move: ${whiteToMove}\n  - Black to Move: ${blackToMove}`);

    if (blackToMove > 0) {
        console.log('⚠️ ALERT: Found Black-to-move puzzles! The wipe failed.');
    } else {
        console.log('✅ Clean: No Black-to-move puzzles found.');
    }
}

main();
