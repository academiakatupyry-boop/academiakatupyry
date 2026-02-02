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
    const { data, error } = await supabase
        .from('puzzles')
        .select('*')
        .limit(1);

    if (error) {
        console.error("Error:", error);
    } else {
        console.log("First Puzzle Data:");
        console.log(JSON.stringify(data[0], null, 2));
    }
}

main();
