import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Coffee, Play, Pause, RotateCcw, Volume2, VolumeX, BellRing } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function BreakTimer() {
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState(0);
    const [initialTime, setInitialTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isAlarming, setIsAlarming] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [selectedSound, setSelectedSound] = useState('chime');
    
    // Custom Input State
    const [customMin, setCustomMin] = useState('');
    const [customSec, setCustomSec] = useState('');

    const timerRef = useRef(null);
    const alarmLoopRef = useRef(null);

    const PRESETS = [5, 10, 15, 30];

    const SOUNDS = {
        chime: { labelKey: 'chime', duration: 2000 },
        digital: { labelKey: 'digital', duration: 1000 },
        bell: { labelKey: 'bell', duration: 1500 },
        gong: { labelKey: 'gong', duration: 3000 },
    };

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            startAlarmLoop();
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    // Handle Alarm Loop
    useEffect(() => {
        if (isAlarming && soundEnabled) {
            // Play immediately
            playAlarm(selectedSound);
            
            // Loop based on sound duration
            const duration = SOUNDS[selectedSound].duration;
            alarmLoopRef.current = setInterval(() => {
                playAlarm(selectedSound);
            }, duration + 500); // 500ms gap
        } else {
            clearInterval(alarmLoopRef.current);
        }

        return () => clearInterval(alarmLoopRef.current);
    }, [isAlarming, selectedSound, soundEnabled, SOUNDS]);

    useEffect(() => {
        if (timeLeft > 0) {
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            document.title = `${mins}:${secs.toString().padStart(2, '0')} - Break`;
        } else if (isAlarming) {
            document.title = t('tools.break-timer.timeUp');
        } else {
             document.title = t('tools.break-timer.documentTitle');
        }
    }, [timeLeft, isAlarming, t]);

    const playAlarm = (soundType = selectedSound) => {
        // Even if sound is disabled, we might want to respect that check here too, 
        // but the loop useEffect handles it. This function just plays audio.
         try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            // Increased Base Volume
            const BASE_VOL = 0.5; 

            if (soundType === 'chime') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2); // E5
                osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.4); // G5
                
                gain.gain.setValueAtTime(BASE_VOL, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
                osc.start();
                osc.stop(ctx.currentTime + 2);
            } 
            else if (soundType === 'digital') {
                osc.type = 'square';
                
                // Beep-Beep-Beep (1 second total)
                const now = ctx.currentTime;
                [0, 0.2, 0.4].forEach(offset => {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.type = 'square';
                    o.frequency.value = 880;
                    g.gain.value = BASE_VOL * 0.5;
                    o.start(now + offset);
                    o.stop(now + offset + 0.1);
                });
            }
            else if (soundType === 'bell') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                gain.gain.setValueAtTime(BASE_VOL, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
                osc.start();
                osc.stop(ctx.currentTime + 1.5);
            }
            else if (soundType === 'gong') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200, ctx.currentTime);
                gain.gain.setValueAtTime(BASE_VOL + 0.3, ctx.currentTime); // Louder for low freq
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
                osc.start();
                osc.stop(ctx.currentTime + 3);
            }
        } catch(e) {
            console.error(e);
        }
    };

    const startAlarmLoop = () => {
        setIsAlarming(true);
    };

    const stopAlarm = () => {
        setIsAlarming(false);
        clearInterval(alarmLoopRef.current);
    };

    const startBreak = (minutes, seconds = 0) => {
        stopAlarm();
        clearInterval(timerRef.current);
        const totalSeconds = (minutes * 60) + seconds;
        if (totalSeconds <= 0) return;
        
        setInitialTime(totalSeconds);
        setTimeLeft(totalSeconds);
        setIsActive(true);
    };

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        stopAlarm();
        setIsActive(false);
        setTimeLeft(0);
        setInitialTime(0);
    };

    const handleCustomStart = () => {
        const m = parseInt(customMin) || 0;
        const s = parseInt(customSec) || 0;
        startBreak(m, s);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = initialTime > 0 ? ((initialTime - timeLeft) / initialTime) * 100 : 0;

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.break-timer.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.break-timer.metaDesc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Coffee size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.break-timer.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.break-timer.desc')}</p>
                    </div>
                </div>
                <button 
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                >
                    {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                </button>
            </div>

            <div className={`rounded-3xl border transition-all p-8 md:p-12 text-center ${isAlarming ? 'bg-amber-50 border-amber-200 shadow-xl shadow-amber-100' : 'bg-white border-slate-100'}`}>
                
                {/* Visual Dial */}
                <div className="relative w-64 h-64 mx-auto mb-12 flex items-center justify-center">
                    {/* Background Circle */}
                    <div className="absolute inset-0 rounded-full border-8 border-slate-100"></div>
                    
                    {/* Progress Circle (Conic Gradient) */}
                    <div 
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: `conic-gradient(rgb(217 119 6) ${progress}%, transparent 0)`,
                            maskImage: 'radial-gradient(transparent 65%, black 66%)',
                            WebkitMaskImage: 'radial-gradient(transparent 65%, black 66%)'
                        }}
                    ></div>

                    <div className={`z-10 font-black text-5xl tabular-nums tracking-tighter ${isAlarming ? 'animate-pulse text-amber-600' : 'text-amber-600'}`}>
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Alarm Stop Button */}
                {isAlarming ? (
                    <button 
                        onClick={stopAlarm}
                        className="w-full max-w-sm mx-auto py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xl shadow-lg shadow-amber-200 animate-bounce flex items-center justify-center gap-2"
                    >
                        <BellRing size={28} />
                        {t('tools.break-timer.stopAlarm')}
                    </button>
                ) : (
                    <>
                        {/* Presets */}
                        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
                            {PRESETS.map(min => (
                                <button 
                                    key={min}
                                    onClick={() => startBreak(min)}
                                    className="py-3 px-2 rounded-xl font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 hover:scale-105 transition-all text-sm"
                                >
                                    {min}m
                                </button>
                            ))}
                        </div>

                        {/* Custom Time & Sound Settings */}
                        <div className="flex flex-col gap-6 mb-12 max-w-lg mx-auto">
                           {/* Custom Time Inputs */}
                           <div className="flex items-center justify-center gap-4">
                               <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-amber-500 transition-all">
                                  <input 
                                    type="number" 
                                    min="0" 
                                    max="999"
                                    placeholder="0"
                                    value={customMin}
                                    onChange={(e) => setCustomMin(e.target.value)}
                                    className="w-12 bg-transparent text-center font-bold text-slate-700 outline-none placeholder-slate-300"
                                  />
                                  <span className="text-sm font-bold text-slate-400">{t('tools.break-timer.min')}</span>
                               </div>
                               <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-amber-500 transition-all">
                                  <input 
                                    type="number" 
                                    min="0" 
                                    max="59"
                                    placeholder="0"
                                    value={customSec}
                                    onChange={(e) => setCustomSec(e.target.value)}
                                    className="w-12 bg-transparent text-center font-bold text-slate-700 outline-none placeholder-slate-300"
                                  />
                                  <span className="text-sm font-bold text-slate-400">{t('tools.break-timer.sec')}</span>
                               </div>
                               <button 
                                    onClick={handleCustomStart}
                                    disabled={!customMin && !customSec}
                                    className="p-3 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                               >
                                    <Play size={20} />
                               </button>
                           </div>

                           {/* Sound Selector */}
                           <div className="flex items-center justify-center gap-2">
                                <label className="text-sm font-bold text-slate-400">{t('tools.break-timer.sound')}:</label>
                                <select 
                                    value={selectedSound} 
                                    onChange={(e) => {
                                        setSelectedSound(e.target.value);
                                        playAlarm(e.target.value); // Preview
                                    }}
                                    className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl focus:ring-amber-500 focus:border-amber-500 block p-2.5 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                                >
                                    {Object.keys(SOUNDS).map(key => (
                                        <option key={key} value={key}>{t(`tools.break-timer.sounds.${SOUNDS[key].labelKey}`)}</option>
                                    ))}
                                </select>
                           </div>
                        </div>

                        {/* Controls */}
                        {timeLeft > 0 && (
                            <div className="flex items-center justify-center gap-4">
                                <button 
                                    onClick={toggleTimer}
                                    className="w-16 h-16 rounded-2xl bg-amber-600 text-white flex items-center justify-center hover:bg-amber-700 transition-all shadow-lg shadow-amber-200"
                                >
                                    {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                                </button>
                                
                                <button 
                                    onClick={resetTimer}
                                    className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-all"
                                >
                                    <RotateCcw size={24} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <RelatedTools currentToolId="break-timer" categoryId="productivity" />
        </ToolPageLayout>
    );
}
