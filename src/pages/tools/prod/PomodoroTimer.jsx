import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Timer, Play, Pause, RotateCcw, Coffee, Zap, Settings, Volume2, VolumeX, BellRing } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PomodoroTimer() {
    const [mode, setMode] = useState('work'); // 'work', 'short', 'long'
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [isAlarming, setIsAlarming] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    
    // Settings state
    const [workTime, setWorkTime] = useState({ m: 25, s: 0 });
    const [shortBreakTime, setShortBreakTime] = useState({ m: 5, s: 0 });
    const [longBreakTime, setLongBreakTime] = useState({ m: 15, s: 0 });
    const [showSettings, setShowSettings] = useState(false);

    const timerRef = useRef(null);
    const alarmLoopRef = useRef(null);

    // Audio beep function
    const playBeep = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            
            const t = ctx.currentTime;
            
            const osc1 = ctx.createOscillator();
            osc1.type = 'square';
            osc1.frequency.setValueAtTime(880, t);
            osc1.frequency.linearRampToValueAtTime(1760, t + 0.1);
            
            const osc2 = ctx.createOscillator();
            osc2.type = 'sawtooth';
            osc2.frequency.setValueAtTime(440, t);
            osc2.frequency.linearRampToValueAtTime(880, t + 0.1);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.8, t); // Very loud volume
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(t);
            osc2.start(t);
            osc1.stop(t + 0.5);
            osc2.stop(t + 0.5);

        } catch (e) {
            console.error("Audio play failed", e);
        }
    };

    const MODES = {
        work: {
            label: 'Work Time',
            time: (workTime.m * 60) + workTime.s,
            color: 'text-red-600',
            bg: 'bg-red-50',
            button: 'bg-red-600 hover:bg-red-700',
            icon: Zap
        },
        short: {
            label: 'Short Break',
            time: (shortBreakTime.m * 60) + shortBreakTime.s,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            button: 'bg-emerald-600 hover:bg-emerald-700',
            icon: Coffee
        },
        long: {
            label: 'Long Break',
            time: (longBreakTime.m * 60) + longBreakTime.s,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            button: 'bg-blue-600 hover:bg-blue-700',
            icon: Coffee
        }
    };

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            startAlarmLoop();
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    // Loop logic
    useEffect(() => {
        if (isAlarming && soundEnabled) {
            playBeep(); // Immediate
            alarmLoopRef.current = setInterval(() => {
                playBeep();
            }, 1000); // Repeat every 1s
        } else {
            clearInterval(alarmLoopRef.current);
        }
        return () => clearInterval(alarmLoopRef.current);
    }, [isAlarming, soundEnabled]);


    useEffect(() => {
        // Update document title
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60; 
        if (isAlarming) {
            document.title = "🔔 TIME IS UP! - Pomodoro";
        } else {
            document.title = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} - ${MODES[mode].label}`;
        }
        
        return () => {
             document.title = 'Pomodoro Timer | MiniTools by Spinotek';
        }
    }, [timeLeft, mode, isAlarming]);

    const stopAlarm = () => {
        setIsAlarming(false);
        clearInterval(alarmLoopRef.current);
    };

    const startAlarmLoop = () => {
        setIsAlarming(true);
    };

    const toggleTimer = () => {
        if(isAlarming) stopAlarm();
        setIsActive(!isActive);
    };
    
    const resetTimer = () => {
        stopAlarm();
        setIsActive(false);
        const settings = mode === 'work' ? workTime : mode === 'short' ? shortBreakTime : longBreakTime;
        setTimeLeft((settings.m * 60) + settings.s);
    };

    const changeMode = (newMode) => {
        stopAlarm();
        setMode(newMode);
        setIsActive(false);
        
        let settings;
        if (newMode === 'work') settings = workTime;
        else if (newMode === 'short') settings = shortBreakTime;
        else settings = longBreakTime;
        
        setTimeLeft((settings.m * 60) + settings.s);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSaveSettings = () => {
        setShowSettings(false);
        resetTimer();
    };

    const CurrentIcon = MODES[mode].icon;

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Pomodoro Timer | MiniTools by Spinotek</title>
                <meta name="description" content="Stay focused with customizable work and break intervals." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Timer size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Pomodoro Timer</h1>
                        <p className="text-slate-500 text-sm">Stay focused with customizable work and break intervals.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                        title={soundEnabled ? "Mute" : "Unmute"}
                    >
                        {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                    </button>
                    <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                        title="Settings"
                    >
                        <Settings size={24} />
                    </button>
                </div>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div className="mb-8 bg-white rounded-3xl border border-slate-200 p-6 animate-fade-in-down">
                     <h3 className="font-bold text-lg mb-4 text-slate-800">Timer Settings</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Work Settings */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <label className="block text-sm font-bold text-red-600 mb-2 uppercase tracking-wide">Work Time</label>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <span className="text-xs text-slate-400 font-bold ml-1">MIN</span>
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={workTime.m} 
                                        onChange={(e) => setWorkTime({...workTime, m: Number(e.target.value)})}
                                        className="w-full p-2 border border-slate-200 rounded-lg font-bold text-slate-700 bg-white focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="text-xs text-slate-400 font-bold ml-1">SEC</span>
                                    <input 
                                        type="number" 
                                        min="0"
                                        max="59"
                                        value={workTime.s} 
                                        onChange={(e) => setWorkTime({...workTime, s: Number(e.target.value)})}
                                        className="w-full p-2 border border-slate-200 rounded-lg font-bold text-slate-700 bg-white focus:ring-2 focus:ring-red-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Short Break Settings */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <label className="block text-sm font-bold text-emerald-600 mb-2 uppercase tracking-wide">Short Break</label>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <span className="text-xs text-slate-400 font-bold ml-1">MIN</span>
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={shortBreakTime.m} 
                                        onChange={(e) => setShortBreakTime({...shortBreakTime, m: Number(e.target.value)})}
                                        className="w-full p-2 border border-slate-200 rounded-lg font-bold text-slate-700 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="text-xs text-slate-400 font-bold ml-1">SEC</span>
                                    <input 
                                        type="number" 
                                        min="0"
                                        max="59"
                                        value={shortBreakTime.s} 
                                        onChange={(e) => setShortBreakTime({...shortBreakTime, s: Number(e.target.value)})}
                                        className="w-full p-2 border border-slate-200 rounded-lg font-bold text-slate-700 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Long Break Settings */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <label className="block text-sm font-bold text-blue-600 mb-2 uppercase tracking-wide">Long Break</label>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <span className="text-xs text-slate-400 font-bold ml-1">MIN</span>
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={longBreakTime.m} 
                                        onChange={(e) => setLongBreakTime({...longBreakTime, m: Number(e.target.value)})}
                                        className="w-full p-2 border border-slate-200 rounded-lg font-bold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="text-xs text-slate-400 font-bold ml-1">SEC</span>
                                    <input 
                                        type="number" 
                                        min="0"
                                        max="59"
                                        value={longBreakTime.s} 
                                        onChange={(e) => setLongBreakTime({...longBreakTime, s: Number(e.target.value)})}
                                        className="w-full p-2 border border-slate-200 rounded-lg font-bold text-slate-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                     </div>
                     <div className="flex justify-end">
                        <button 
                            onClick={handleSaveSettings}
                            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-slate-300 hover:bg-slate-800 transition-all hover:scale-105"
                        >
                            Save Settings
                        </button>
                     </div>
                </div>
            )}

            <div className={`rounded-3xl border transition-all p-8 md:p-12 text-center ${isAlarming ? 'bg-red-50 border-red-200 shadow-xl shadow-red-100' : 'bg-white border-slate-100'}`}>
                {/* Mode Switcher */}
                {!isAlarming && (
                    <div className="flex justify-center flex-wrap gap-2 mb-12">
                        <button 
                            onClick={() => changeMode('work')}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${
                                mode === 'work' ? 'bg-red-100 text-red-700 ring-2 ring-red-500 ring-offset-2' : 'hover:bg-slate-50 text-slate-600'
                            }`}
                        >
                            Work
                        </button>
                        <button 
                            onClick={() => changeMode('short')}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${
                                mode === 'short' ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500 ring-offset-2' : 'hover:bg-slate-50 text-slate-600'
                            }`}
                        >
                            Short Break
                        </button>
                        <button 
                            onClick={() => changeMode('long')}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${
                                mode === 'long' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-2' : 'hover:bg-slate-50 text-slate-600'
                            }`}
                        >
                            Long Break
                        </button>
                    </div>
                )}

                {/* Timer Display */}
                <div 
                    onClick={() => !isActive && setShowSettings(true)}
                    className={`relative w-80 h-80 mx-auto rounded-full flex items-center justify-center mb-12 transition-colors ${MODES[mode].bg} ${isAlarming ? 'animate-pulse' : 'cursor-pointer hover:bg-opacity-80'}`}
                    title="Click to Edit Time"
                >
                    <div className={`absolute inset-0 rounded-full border-8 opacity-20 ${MODES[mode].color.replace('text', 'border')}`}></div>
                    <div className="text-center z-10">
                        <div className={`text-8xl font-black mb-2 tabular-nums tracking-tight ${MODES[mode].color}`}>
                            {formatTime(timeLeft)}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-slate-500 uppercase tracking-widest font-semibold text-sm">
                            <CurrentIcon size={16} />
                            {isAlarming ? "TIME IS UP!" : MODES[mode].label}
                        </div>
                        {!isActive && !isAlarming && (
                            <div className="text-xs text-slate-400 font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                Click to Edit
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls */}
                {isAlarming ? (
                    <button 
                        onClick={stopAlarm}
                        className="w-full max-w-sm mx-auto py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xl shadow-lg shadow-red-200 animate-bounce flex items-center justify-center gap-2"
                    >
                        <BellRing size={28} />
                        STOP ALARM
                    </button>
                ) : (
                    <div className="flex items-center justify-center gap-4">
                        <button 
                            onClick={toggleTimer}
                            className={`w-24 h-24 rounded-3xl flex items-center justify-center text-white transition-all transform active:scale-95 shadow-lg shadow-slate-200 ${MODES[mode].button}`}
                        >
                            {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                        </button>
                        
                        <button 
                            onClick={resetTimer}
                            className="w-24 h-24 rounded-3xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-all transform active:scale-95"
                        >
                            <RotateCcw size={28} />
                        </button>
                    </div>
                )}
            </div>

            <RelatedTools currentToolId="pomodoro" categoryId="productivity" />
        </ToolPageLayout>
    );
}
