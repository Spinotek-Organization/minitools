import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Eye, Play, Pause, RotateCcw, Monitor } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function EyeBreak() {
    const [isActive, setIsActive] = useState(false);
    const [isWorkMode, setIsWorkMode] = useState(true);
    const [timeLeft, setTimeLeft] = useState(20 * 60);
    const timerRef = useRef(null);
    const audioRef = useRef(null);

    const WORK_TIME = 20 * 60;
    const BREAK_TIME = 20;

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Timer finished
            playNotificationSound();
            if (isWorkMode) {
                // Switch to break
                setIsWorkMode(false);
                setTimeLeft(BREAK_TIME);
                // Keep it active
            } else {
                // Back to work
                setIsWorkMode(true);
                setTimeLeft(WORK_TIME);
                setIsActive(false); // Auto pause after break end or auto-continue? Often better to pause to let user reset.
            }
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft, isWorkMode]);

    useEffect(() => {
        // Title update
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        const modeLabel = isWorkMode ? 'Work' : 'Look Away!';
        document.title = `${mins}:${secs.toString().padStart(2, '0')} - ${modeLabel}`;
        
        return () => { document.title = 'Eye Break Timer | MiniTools by Spinotek'; }
    }, [timeLeft, isWorkMode]);

    const toggleTimer = () => setIsActive(!isActive);
    
    const resetTimer = () => {
        setIsActive(false);
        setIsWorkMode(true);
        setTimeLeft(WORK_TIME);
    };

    const playNotificationSound = () => {
        // Simple beep using AudioContext or just rely on visual if no asset
        // Re-using the beep logic from Pomodoro for consistency
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(isWorkMode ? 880 : 500, ctx.currentTime); // High pitch for break start
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            osc.start();
            osc.stop(ctx.currentTime + 0.5);
        } catch(e) {
            console.error(e);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Eye Break Timer | MiniTools by Spinotek</title>
                <meta name="description" content="Protect your eyes using the 20-20-20 break rule." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Eye size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Eye Break Timer</h1>
                        <p className="text-slate-500 text-sm">Follow the 20-20-20 rule: Every 20 mins, look 20 feet away for 20 seconds.</p>
                    </div>
                </div>
            </div>

            <div className={`relative overflow-hidden rounded-3xl border transition-all duration-500 ${isWorkMode ? 'bg-white border-slate-100' : 'bg-emerald-900 border-emerald-900 text-white'}`}>
                
                {/* Visual Overlay for Break Mode */}
                {!isWorkMode && (
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <Eye size={400} />
                    </div>
                )}

                <div className="relative z-10 p-12 text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm mb-8 ${isWorkMode ? 'bg-violet-50 text-violet-600' : 'bg-emerald-800 text-emerald-100'}`}>
                        {isWorkMode ? <Monitor size={16} /> : <Eye size={16} />}
                        {isWorkMode ? 'Screen Time' : 'Look Away Now!'}
                    </div>

                    <div className={`text-9xl font-black mb-4 tabular-nums tracking-tighter ${isWorkMode ? 'text-slate-900' : 'text-emerald-50'}`}>
                        {formatTime(timeLeft)}
                    </div>

                    <p className={`text-xl mb-12 ${isWorkMode ? 'text-slate-500' : 'text-emerald-200'}`}>
                        {isWorkMode 
                            ? "Focus on your work. We'll remind you when to rest." 
                            : "Look at something 20 feet away to relax your eyes."}
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <button 
                            onClick={toggleTimer}
                            className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white transition-all transform active:scale-95 shadow-lg ${
                                isWorkMode ? 'bg-violet-600 hover:bg-violet-700 shadow-violet-200' : 'bg-emerald-500 hover:bg-emerald-400 text-emerald-900'
                            }`}
                        >
                            {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                        </button>
                        
                        <button 
                            onClick={resetTimer}
                            className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all transform active:scale-95 ${
                                isWorkMode ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' : 'bg-emerald-800 text-emerald-300 hover:bg-emerald-700'
                            }`}
                        >
                            <RotateCcw size={28} />
                        </button>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="eye-break" categoryId="productivity" />
        </ToolPageLayout>
    );
}
