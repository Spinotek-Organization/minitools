import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Waves, CloudRain, CloudLightning, Wind, Volume2, StopCircle, Fan, Moon, Plane, Droplets } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

// Audio Context Helper
const getAudioContext = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
};

const NoiseCard = ({ id, label, icon: Icon, color, isPlaying, volume, config, onToggle, onVolumeChange, ctxRef }) => {
    const nodeRef = useRef(null);
    const gainRef = useRef(null);

    // Initialize or cleanup audio nodes based on isPlaying
    useEffect(() => {
        if (isPlaying && !nodeRef.current && ctxRef.current) {
            const ctx = ctxRef.current;
            const bufferSize = 2 * ctx.sampleRate;
            try {
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const output = buffer.getChannelData(0);
                const type = config.noise;

                // Generate Noise with proper algorithms
                let lastOut = 0;
                let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    
                    if (type === 'white') {
                        output[i] = white;
                    } else if (type === 'brown') {
                        // Brown (Red) Noise: -6dB/octave
                        lastOut = (lastOut + (0.02 * white)) / 1.02;
                        output[i] = lastOut * 3.5; // Scale output, NOT the accumulator
                    } else if (type === 'pink') {
                        // Pink Noise: -3dB/octave (Paul Kellet's refined method)
                        b0 = 0.99886 * b0 + white * 0.0555179;
                        b1 = 0.99332 * b1 + white * 0.0750759;
                        b2 = 0.96900 * b2 + white * 0.1538520;
                        b3 = 0.86650 * b3 + white * 0.3104856;
                        b4 = 0.55000 * b4 + white * 0.5329522;
                        b5 = -0.7616 * b5 - white * 0.0168980;
                        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                        output[i] *= 0.11; 
                        b6 = white * 0.115926;
                    } else {
                        output[i] = white;
                    }
                }

                // Create Source
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                noise.loop = true;
                
                // Apply configuring Filters
                const filter = ctx.createBiquadFilter();
                filter.type = config.filter || 'allpass';
                if (config.freq) filter.frequency.value = config.freq;
                if (config.Q) filter.Q.value = config.Q;

                // Gain
                const gainNode = ctx.createGain();
                gainNode.gain.value = volume;

                noise.connect(filter);
                filter.connect(gainNode);
                gainNode.connect(ctx.destination);
                
                noise.start();
                
                nodeRef.current = noise;
                gainRef.current = gainNode;
            } catch (e) {
                console.error("Audio generation failed:", e);
                onToggle(id); // Reset state if failed
            }
        } else if (!isPlaying && nodeRef.current) {
            try {
                nodeRef.current.stop();
                nodeRef.current.disconnect();
            } catch (e) {}
            nodeRef.current = null;
            gainRef.current = null;
        }

        return () => {
            if (nodeRef.current) {
                try {
                    nodeRef.current.stop();
                    nodeRef.current.disconnect(); 
                } catch(e) {}
                nodeRef.current = null;
            }
        };
    }, [isPlaying, config, ctxRef.current]);

    // Update volume
    useEffect(() => {
        if (gainRef.current && ctxRef.current) {
            gainRef.current.gain.setTargetAtTime(volume, ctxRef.current.currentTime, 0.1);
        }
    }, [volume]);

    return (
        <div className={`p-6 rounded-3xl border transition-all ${isPlaying ? `bg-${color}-50 border-${color}-200` : 'bg-white border-slate-100 hover:border-slate-200'}`}>
            <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isPlaying ? `bg-${color}-500 text-white shadow-lg shadow-${color}-200` : 'bg-slate-100 text-slate-400'}`}>
                    <Icon size={24} />
                </div>
                <button 
                    onClick={() => onToggle(id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${isPlaying ? `bg-${color}-100 text-${color}-700` : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                    {isPlaying ? 'Playing' : 'Play'}
                </button>
            </div>
            
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                    <span>Volume</span>
                    <span>{Math.round(volume * 100)}%</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume}
                    disabled={!isPlaying}
                    onChange={(e) => onVolumeChange(id, parseFloat(e.target.value))}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isPlaying ? `bg-${color}-200 accent-${color}-600` : 'bg-slate-100 accent-slate-400'}`}
                />
            </div>
            
            <h3 className="mt-4 font-bold text-slate-900">{label}</h3>
        </div>
    );
};

export default function AmbientNoise() {
    const [sounds, setSounds] = useState([
        { id: 1, label: 'Soft Rain', icon: CloudRain, color: 'sky', isPlaying: false, volume: 0.5, config: { noise: 'pink', filter: 'lowpass', freq: 600 } },
        { id: 2, label: 'Deep Thunder', icon: CloudLightning, color: 'indigo', isPlaying: false, volume: 0.6, config: { noise: 'brown', filter: 'lowpass', freq: 150 } },
        { id: 3, label: 'White Noise', icon: Waves, color: 'slate', isPlaying: false, volume: 0.3, config: { noise: 'white', filter: 'allpass' } },
        { id: 4, label: 'Windy Forest', icon: Wind, color: 'emerald', isPlaying: false, volume: 0.4, config: { noise: 'pink', filter: 'highpass', freq: 800 } },
        { id: 5, label: 'Box Fan', icon: Fan, color: 'orange', isPlaying: false, volume: 0.5, config: { noise: 'brown', filter: 'lowpass', freq: 300 } },
        { id: 6, label: 'Night Ambience', icon: Moon, color: 'violet', isPlaying: false, volume: 0.4, config: { noise: 'white', filter: 'highpass', freq: 2000 } },
        { id: 7, label: 'Running Stream', icon: Droplets, color: 'cyan', isPlaying: false, volume: 0.5, config: { noise: 'pink', filter: 'bandpass', freq: 600, Q: 0.5 } },
        { id: 8, label: 'Airplane Cabin', icon: Plane, color: 'zinc', isPlaying: false, volume: 0.6, config: { noise: 'brown', filter: 'lowpass', freq: 120 } }
    ]);
    
    const ctxRef = useRef(null);

    // Initialize AudioContext on first interaction
    const initAudio = useCallback(() => {
        if (!ctxRef.current) {
            ctxRef.current = getAudioContext();
        }
        if (ctxRef.current.state === 'suspended') {
            ctxRef.current.resume();
        }
    }, []);

    const toggleSound = (id) => {
        initAudio();
        setSounds(prev => prev.map(s => s.id === id ? { ...s, isPlaying: !s.isPlaying } : s));
    };

    const updateVolume = (id, vol) => {
        setSounds(prev => prev.map(s => s.id === id ? { ...s, volume: vol } : s));
    };

    const muteAll = () => {
        setSounds(prev => prev.map(s => ({ ...s, isPlaying: false })));
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Ambient Noise Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Focus with soothing sounds like rain, coffee shop, and more." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Waves size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Ambient Noise Generator</h1>
                        <p className="text-slate-500 text-sm">Focus with soothing sounds like rain, coffee shop, and more.</p>
                    </div>
                </div>
                
                {sounds.some(s => s.isPlaying) && (
                    <button 
                        onClick={muteAll}
                        className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors font-medium"
                    >
                        <StopCircle size={18} />
                        Stop All
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sounds.map(sound => (
                    <NoiseCard 
                        key={sound.id}
                        {...sound}
                        onToggle={toggleSound}
                        onVolumeChange={updateVolume}
                        ctxRef={ctxRef}
                    />
                ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-blue-800 text-sm">
                <h4 className="font-bold flex items-center gap-2 mb-2">
                    <Volume2 size={16} />
                    Pro Tip
                </h4>
                <p>You can mix multiple sounds together! Try combining <strong>Soft Rain</strong> and <strong>Deep Thunder</strong> for a cozy storm atmosphere.</p>
            </div>

            <RelatedTools currentToolId="ambient-noise" categoryId="productivity" />
        </ToolPageLayout>
    );
}
