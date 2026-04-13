import { createContext, useContext, useEffect } from 'react';

type SoundContextType = {
    playHover: () => void;
    playClick: () => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Ideally these would be local files, but for now we use short base64 or performant CDNs
        // Using simple oscillator beeps for reliability without external assets if needed, 
        // but here I'll use a placeholder logic that would normally load real files.
        // For this demo, I will implementation a synthetic sound generator using Web Audio API to avoid external dependencies.
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        // We'll use the Web Audio API on demand instead of pre-loading hefty files
    }, []);

    const playSynthesizedSound = (type: 'hover' | 'click') => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'hover') {
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.1);
        } else {
            // Click - lower, punchier
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.15);
        }
    };

    const playHover = () => playSynthesizedSound('hover');
    const playClick = () => playSynthesizedSound('click');

    return (
        <SoundContext.Provider value={{ playHover, playClick }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) throw new Error("useSound must be used within SoundProvider");
    return context;
}
