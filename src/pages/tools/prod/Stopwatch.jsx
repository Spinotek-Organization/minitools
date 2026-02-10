import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, Play, Pause, RotateCcw, Flag } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const requestRef = useRef();
    const startTimeRef = useRef(0);
    const savedTimeRef = useRef(0);

    const animate = (timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const progress = timestamp - startTimeRef.current + savedTimeRef.current;
        setTime(progress);
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isRunning) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestRef.current);
            savedTimeRef.current = time;
            startTimeRef.current = 0;
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
        savedTimeRef.current = 0;
        startTimeRef.current = 0;
    };

    const handleLap = () => {
        setLaps([...laps, time]);
    };

    const formatTime = (ms) => {
        const date = new Date(ms);
        const m = date.getUTCHours() * 60 + date.getUTCMinutes();
        const s = date.getUTCSeconds();
        const cs = Math.floor(date.getUTCMilliseconds() / 10);
        
        return {
            m: m.toString().padStart(2, '0'),
            s: s.toString().padStart(2, '0'),
            cs: cs.toString().padStart(2, '0')
        };
    };

    const { m, s, cs } = formatTime(time);

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Simple Stopwatch | MiniTools by Spinotek</title>
                <meta name="description" content="A simple and clean interface for timing anything." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Simple Stopwatch</h1>
                        <p className="text-slate-500 text-sm">A simple and clean interface for timing anything.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Timer Display */}
                <div className="bg-white rounded-3xl border border-slate-100 p-12 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="font-mono text-7xl md:text-8xl font-black text-slate-900 tabular-nums tracking-tighter mb-12 flex items-baseline">
                        <span>{m}</span>
                        <span className="text-slate-300">:</span>
                        <span>{s}</span>
                        <span className="text-4xl md:text-5xl text-rose-500 ml-2">.{cs}</span>
                    </div>

                    <div className="flex items-center gap-4 w-full justify-center">
                         <button 
                            onClick={handleReset}
                            className="w-20 h-20 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-all"
                        >
                            <RotateCcw size={28} />
                        </button>

                        <button 
                            onClick={handleStartStop}
                            className={`w-24 h-24 rounded-3xl flex items-center justify-center text-white transition-all transform active:scale-95 shadow-lg ${
                                isRunning ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
                            }`}
                        >
                            {isRunning ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
                        </button>
                        
                        <button 
                            onClick={handleLap}
                            disabled={!isRunning && time === 0}
                            className="w-20 h-20 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-all disabled:opacity-50 disabled:hover:bg-slate-100"
                        >
                            <Flag size={28} />
                        </button>
                    </div>
                </div>

                {/* Laps */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col h-[400px]">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-50">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <Flag size={20} className="text-rose-500" />
                            Laps
                        </h3>
                        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">
                            {laps.length} Total
                        </span>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                        {laps.length === 0 ? (
                            <div className="text-center text-slate-400 py-12">
                                <Clock size={48} className="mx-auto mb-4 opacity-20" />
                                <p>No laps recorded.</p>
                            </div>
                        ) : (
                            [...laps].reverse().map((lapTime, index) => {
                                const lapIndex = laps.length - index;
                                const formatted = formatTime(lapTime);
                                // Calculate lap duration
                                const prevLapTime = lapIndex > 1 ? laps[lapIndex - 2] : 0;
                                const lapDuration = lapTime - prevLapTime;
                                const formattedDuration = formatTime(lapDuration);

                                return (
                                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group hover:bg-rose-50 transition-colors">
                                        <span className="text-slate-400 font-bold w-8">#{lapIndex}</span>
                                        <div className="flex gap-4">
                                            <span className="font-mono text-slate-500 text-sm">
                                                +{formattedDuration.m}:{formattedDuration.s}.{formattedDuration.cs}
                                            </span>
                                            <span className="font-mono font-bold text-slate-900">
                                                {formatted.m}:{formatted.s}.{formatted.cs}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="stopwatch" categoryId="productivity" />
        </ToolPageLayout>
    );
}
