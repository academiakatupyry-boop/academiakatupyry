
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import readline from 'readline';
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

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Error: Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CSV_FILE = 'lichess_db_puzzle.csv';
const TARGET_THEME = 'mateIn1';
const LIMIT = 50;

async function main() {
    console.log('🔥 Starting Full Replacement Job (White to Move Only)...');

    // 1. Wipe Database
    console.log('🗑️ Clearing existing puzzles...');
    const { error: deleteError } = await supabase
        .from('puzzles')
        .delete()
        .neq('id', 'placeholder_for_all'); // Hack to delete all rows (neq something impossible)

    // Better way to delete all is usually without filter, but supabase-js might require one. 
    // Using .neq('id', '0') usually works if IDs are strings.

    if (deleteError) {
        console.error('❌ Error clearing table:', deleteError);
        // Continue anyway? Maybe.
    } else {
        console.log('✅ Table cleared.');
    }

    if (!fs.existsSync(CSV_FILE)) {
        console.error(`❌ Error: File ${CSV_FILE} not found.`);
        process.exit(1);
    }

    const fileStream = fs.createReadStream(CSV_FILE);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const puzzlesToUpload = [];
    let count = 0;
    let headerSkipped = false;

    console.log('🔍 Scanning CSV for matching puzzles...');

    for await (const line of rl) {
        if (!headerSkipped) {
            headerSkipped = true;
            continue;
        }

        if (puzzlesToUpload.length >= LIMIT) break;

        const cols = line.split(',');

        if (cols.length < 8) continue;

        const id = cols[0];
        const fen = cols[1];
        const moves = cols[2];
        const rating = parseInt(cols[3]);
        const themes = cols[7];

        // CHECK 1: Theme
        if (!themes || !themes.includes(TARGET_THEME)) continue;

        // CHECK 2: User wants to PLAY as White.
        // In Lichess DB, FEN is the state BEFORE the setup move.
        // The first move in 'moves' is the Opponent's setup move.
        // So:
        // If FEN is 'w', White plays setup -> Turn becomes Black -> User plays Black.
        // If FEN is 'b', Black plays setup -> Turn becomes White -> User plays White.
        // Therefore, we must search for 'b' to let the user play 'w'.

        const parts = fen.split(' ');
        if (parts.length < 2) continue; // Invalid FEN
        const activeColor = parts[1];

        if (activeColor === 'b') { // CHANGED: 'w' -> 'b'
            puzzlesToUpload.push({
                id: id,
                fen: fen,
                moves: moves,
                rating: rating,
                temas: themes.split(' ')
            });
            count++;
        }
    }

    console.log(`✅ Found ${puzzlesToUpload.length} White-to-move puzzles. Uploading...`);

    if (puzzlesToUpload.length > 0) {
        const { error } = await supabase
            .from('puzzles')
            .upsert(puzzlesToUpload, { onConflict: 'id' });

        if (error) {
            console.error('❌ Upload failed:', error);
        } else {
            console.log(`🎉 Successfully replaced DB with ${puzzlesToUpload.length} White-only puzzles!`);
        }
    } else {
        console.log("⚠️ No matching puzzles found.");
    }
}

main();
