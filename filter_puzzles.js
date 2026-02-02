import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
const THEMES_TO_FIND = [
    'mateIn1',
    'mateIn2',
    'anastasiaMate',
    'arabianMate',
    'backRankMate',
    'smotheredMate',
    'bodenMate'
];
const LIMIT_PER_THEME = 7;
const MIN_RATING = 600;
const MAX_RATING = 1200;

const results = {};
THEMES_TO_FIND.forEach(t => results[t] = []);

const csvPath = 'lichess_db_puzzle.csv';

if (!fs.existsSync(csvPath)) {
    console.error(`❌ Error: File '${csvPath}' not found in ${process.cwd()}`);
    console.log("Please ensure you have downloaded the Lichess puzzle database CSV.");
    process.exit(1);
}

const rl = readline.createInterface({
    input: fs.createReadStream(csvPath),
    terminal: false
});

let count = 0;

console.log("🔍 Scanning CSV for puzzles...");

rl.on('line', (line) => {
    count++;
    if (count % 100000 === 0) process.stdout.write('.');

    // Lichess CSV format: PuzzleId,FEN,Moves,Rating,RatingDeviation,Popularity,NbPlays,Themes,GameUrl,OpeningTags
    const columns = line.split(',');
    const id = columns[0];
    const fen = columns[1];
    const moves = columns[2];
    const rating = parseInt(columns[3], 10);
    const themesStr = columns[7] || '';

    if (isNaN(rating)) return;

    // Filter by Rating
    if (rating < MIN_RATING || rating > MAX_RATING) return;

    // Filter by Themes
    const themesList = themesStr.split(' ');

    for (const targetTheme of THEMES_TO_FIND) {
        // Only add if we haven't reached the limit for this theme
        if (results[targetTheme].length < LIMIT_PER_THEME) {
            if (themesList.includes(targetTheme)) {

                // Ensure 'mate' tag is present for compatibility if needed, 
                // but primarily keep the original themes or construct a clean list.
                // The app checks for: .contains('temas', ['mate', 'mateIn1'])
                // So we MUST ensure 'mate' is in the list if it's a mate puzzle.
                // Lichess 'mateIn1' usually comes with 'mate'. Let's be safe.

                let finalThemes = [targetTheme];
                if (targetTheme.includes('Mate') || targetTheme.includes('mate')) {
                    if (!finalThemes.includes('mate')) finalThemes.push('mate');
                }

                // Check uniqueness before adding (a puzzle might match multiple target themes, 
                // but here we are iterating themes. ONE puzzle could be added to multiple lists?
                // The user wants "7 of each". It's okay if they overlap or are distinct.
                // We will store them in the map.

                results[targetTheme].push({
                    id,
                    fen,
                    moves,
                    rating,
                    temas: finalThemes // Storing as array for Supabase
                });
            }
        }
    }
});

rl.on('close', () => {
    console.log('\n✅ Scan complete.');

    // Flatten and Deduplicate by ID
    const allPuzzles = [];
    const seenIds = new Set();

    THEMES_TO_FIND.forEach(theme => {
        console.log(`Theme ${theme}: Found ${results[theme].length}/${LIMIT_PER_THEME}`);
        results[theme].forEach(p => {
            if (!seenIds.has(p.id)) {
                seenIds.add(p.id);
                allPuzzles.push(p);
            }
        });
    });

    fs.writeFileSync('puzzles_academia.json', JSON.stringify(allPuzzles, null, 2));
    console.log(`\n💾 Saved ${allPuzzles.length} unique puzzles to 'puzzles_academia.json'.`);
    console.log('Now run: node subir_puzzles.js');
});
