
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
const LIMIT = 50; // Upload 50 puzzles

async function main() {
    console.log(`🚀 Starting upload job for theme: ${TARGET_THEME}`);

    // Clear existing? Maybe not.

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

    // CSV Columns expected: PuzzleId,FEN,Moves,Rating,RatingDeviation,Popularity,NbPlays,Themes,GameUrl,OpeningTags

    for await (const line of rl) {
        if (!headerSkipped) {
            headerSkipped = true;
            continue;
        }

        if (puzzlesToUpload.length >= LIMIT) break;

        const cols = line.split(','); // Simple split, assuming no commas in fields for these columns
        // Moves might have spaces, but usually comma separated fields.
        // Wait, standard CSV might have quotes. Lichess CSV is usually simple.
        // Cols: 0:Id, 1:FEN, 2:Moves, 3:Rating, 4:RD, 5:Pop, 6:Nb, 7:Themes, 8:Url, 9:Tags

        if (cols.length < 8) continue;

        const id = cols[0];
        const fen = cols[1];
        const moves = cols[2];
        const rating = parseInt(cols[3]);
        const themes = cols[7];

        if (themes && themes.includes(TARGET_THEME)) {
            puzzlesToUpload.push({
                id: id,
                fen: fen,
                moves: moves,
                rating: rating,
                temas: themes.split(' ') // Themes are space separated in Lichess DB
            });
            count++;
        }
    }

    console.log(`✅ Found ${puzzlesToUpload.length} puzzles matching '${TARGET_THEME}'. Uploading...`);

    if (puzzlesToUpload.length > 0) {
        const { error } = await supabase
            .from('puzzles')
            .upsert(puzzlesToUpload, { onConflict: 'id' });

        if (error) {
            console.error('❌ Upload failed:', error);
        } else {
            console.log(`🎉 Successfully uploaded ${puzzlesToUpload.length} puzzles!`);
        }
    } else {
        console.log("⚠️ No puzzles found to upload.");
    }
}

main();
