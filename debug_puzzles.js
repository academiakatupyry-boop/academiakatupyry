
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env manually
const envPath = path.resolve(__dirname, '.env')
let envContent = ''

try {
    envContent = fs.readFileSync(envPath, 'utf8')
} catch (e) {
    console.error('Could not read .env file')
    process.exit(1)
}

const env = {}
envContent.split('\n').forEach(line => {
    // Handle KEY=VALUE format where VALUE might contain =
    const minDiff = line.indexOf('=');
    if (minDiff > 0) {
        const key = line.substring(0, minDiff).trim();
        const value = line.substring(minDiff + 1).trim();
        env[key] = value;
    }
})

const supabaseUrl = env['VITE_SUPABASE_URL']
const supabaseKey = env['VITE_SUPABASE_ANON_KEY']

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkPuzzles() {
    console.log('Fetching puzzles with tag "mate"...');

    // Fetch a broad set
    const { data, error } = await supabase
        .from('puzzles')
        .select('*')
        .contains('temas', ['mate'])
        .limit(50);

    if (error) {
        console.error('Error fetching puzzles:', error);
        return;
    }

    console.log(`Found ${data.length} puzzles.`);

    data.forEach((p, index) => {
        const moves = p.moves.trim().split(/\s+/);
        console.log(`\n--- Puzzle ${index} (ID: ${p.id}) ---`);
        console.log(`Moves: "${p.moves}"`);
        console.log(`Move Count: ${moves.length}`);

        if (p.temas.includes('mateIn1') && moves.length !== 2) {
            console.log(`[ALERT] MateIn1 mismatch: Expected 2 tokens, got ${moves.length}`);
        }
    });
}

checkPuzzles();
