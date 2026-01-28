
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

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Error: Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
    console.log('🧹 Starting cleanup...');

    // Fetch all puzzles
    const { data: puzzles, error } = await supabase
        .from('puzzles')
        .select('id, temas');

    if (error) {
        console.error('❌ Error fetching puzzles:', error);
        return;
    }

    // Identify outliers (puzzles NOT containing 'mateIn1')
    const outliers = puzzles.filter(p => !p.temas || !p.temas.includes('mateIn1'));

    if (outliers.length === 0) {
        console.log('✅ No outliers found. All puzzles seem to be correct.');
        return;
    }

    console.log(`⚠️ Found ${outliers.length} outlier(s). Deleting...`);

    const outlierIds = outliers.map(p => p.id);

    const { error: deleteError } = await supabase
        .from('puzzles')
        .delete()
        .in('id', outlierIds);

    if (deleteError) {
        console.error('❌ Error deleting outliers:', deleteError);
    } else {
        console.log(`🗑️ Successfully deleted ${outliers.length} puzzles.`);
    }
}

main();
