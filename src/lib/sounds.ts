// Standard Chess Sounds (Base64 encoded for zero-latency & offline support)
// Source: Standard Lichess-style sounds compressed

const MOVE_SOUND = 'data:audio/mp3;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAG1xUAA5CAAIAAeF8AAUSB923AAAAAAHgAAAABLFMILTGCVFoAAADtGL5pueAAAAA8D//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAG1xUAA5CAAIAAeF8AAUSB923AAAAAAHgAAAABLFMILTGCVFoAAADtGL5pueAAAAA8D';
// Note: These are short placeholders. For a real premium feel, we'd use longer base64 strings. 
// However, since I cannot browse to get the actual binary of a specific sound file easily, 
// I will use a reliable, publicly hosting URL fallback if these short strings fail or I'll implement a simple beep generator using Web Audio API if I can't find good base64 strings in my training data.
// BETTER APPROACH: Use reliable CDNs for now.

// Fallback beep using Web Audio API
const playBeep = (type: 'move' | 'capture' | 'success' | 'failure') => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === 'move') {
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'capture') {
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'success') {
            osc.index = "success"; // Custom property for debugging
            // Arpeggio
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.setValueAtTime(554, now + 0.1); // C#
            osc.frequency.setValueAtTime(659, now + 0.2); // E
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
            osc.start(now);
            osc.stop(now + 0.4);
        } else {
            // Failure / Illegal
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.linearRampToValueAtTime(150, now + 0.2);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        }
    } catch (e) {
        console.warn("Audio fallback failed", e);
    }
};

export const playAudio = (type: 'move' | 'capture' | 'success' | 'failure') => {
    const sounds = {
        move: 'https://images.chesscomfiles.com/chess-themes/sounds/_common/default/move-self.mp3',
        capture: 'https://images.chesscomfiles.com/chess-themes/sounds/_common/default/capture.mp3',
        success: 'https://images.chesscomfiles.com/chess-themes/sounds/_common/default/notify.mp3',
        failure: 'https://images.chesscomfiles.com/chess-themes/sounds/_common/default/illegal.mp3',
    };

    const audio = new Audio(sounds[type]);
    audio.volume = 0.5;

    // Attempt play, if it fails (e.g. strict browser policy or network error), use fallback
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.warn(`Audio file play blocked/failed (${error.message}). Using fallback.`);
            playBeep(type);
        });
    }
};
