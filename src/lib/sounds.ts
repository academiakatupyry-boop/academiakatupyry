// Synthesized Sounds using Web Audio API
// Helps avoid dependency on external files or CDNs that might be blocked.

class AudioSynthesizer {
    private ctx: AudioContext | null = null;
    private masterGain: GainNode | null = null;

    constructor() {
        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = 0.3; // Global volume
                this.masterGain.connect(this.ctx.destination);
            }
        } catch (e) {
            console.warn("Web Audio API not supported", e);
        }
    }

    private getContext(): AudioContext | null {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        return this.ctx;
    }

    play(type: 'move' | 'capture' | 'success' | 'failure') {
        const ctx = this.getContext();
        if (!ctx || !this.masterGain) return;

        const t = ctx.currentTime;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        if (type === 'move') {
            // Soft wood-like thud
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(180, t);
            oscillator.frequency.exponentialRampToValueAtTime(100, t + 0.1);

            gainNode.gain.setValueAtTime(0.5, t);
            gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

            oscillator.start(t);
            oscillator.stop(t + 0.1);
        }
        else if (type === 'capture') {
            // Sharp snap
            oscillator.type = 'square'; // More harmonic content
            oscillator.frequency.setValueAtTime(400, t);
            oscillator.frequency.exponentialRampToValueAtTime(100, t + 0.15);

            gainNode.gain.setValueAtTime(0.4, t);
            gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

            oscillator.start(t);
            oscillator.stop(t + 0.15);
        }
        else if (type === 'success') {
            // Uplifting major chord arpeggio
            this.playNote(523.25, t, 0.2); // C5
            this.playNote(659.25, t + 0.1, 0.2); // E5
            this.playNote(783.99, t + 0.2, 0.4); // G5
        }
        else if (type === 'failure') {
            // Low error buzz
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(150, t);
            oscillator.frequency.linearRampToValueAtTime(100, t + 0.3);

            gainNode.gain.setValueAtTime(0.5, t);
            gainNode.gain.linearRampToValueAtTime(0.01, t + 0.3);

            oscillator.start(t);
            oscillator.stop(t + 0.3);
        }
    }

    private playNote(freq: number, time: number, duration: number) {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

        osc.start(time);
        osc.stop(time + duration);
    }
}

// Singleton instance
const synth = new AudioSynthesizer();

export const playAudio = (type: 'move' | 'capture' | 'success' | 'failure') => {
    synth.play(type);
};
