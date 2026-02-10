import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, RefreshCw, Calculator, ArrowRightLeft } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function AspectRatio() {
    const [mode, setMode] = useState('calculate'); // calculate, find
    const [width, setWidth] = useState(1920);
    const [height, setHeight] = useState(1080);
    const [ratioW, setRatioW] = useState(16);
    const [ratioH, setRatioH] = useState(9);
    const [result, setResult] = useState('');

    const presets = [
        { label: '4320p (8K)', w: 7680, h: 4320 },
        { label: '2160p (4K)', w: 3840, h: 2160 },
        { label: '1440p (2K)', w: 2560, h: 1440 },
        { label: '1080p (FHD)', w: 1920, h: 1080 },
        { label: '720p (HD)', w: 1280, h: 720 },
        { label: '480p (SD)', w: 854, h: 480 },
    ];

    const ratios = [
        { label: '16:9 (Standard)', w: 16, h: 9 },
        { label: '4:3 (TV/Old Monitor)', w: 4, h: 3 },
        { label: '21:9 (Ultrawide)', w: 21, h: 9 },
        { label: '9:16 (Vertical)', w: 9, h: 16 },
        { label: '1:1 (Square)', w: 1, h: 1 },
        { label: '2.35:1 (Cinema)', w: 2.35, h: 1 },
    ];

    useEffect(() => {
        if (mode === 'calculate') {
             // If ratio changed, we might want to update height based on width?
             // But user might edit width or height.
             // Let's make it reactive:
             // If width changes, calc height.
             // But we need to know what changed.
             // Simplified: Just recalc both possibilities or fix one.
             // Let's fix Width as primary input usually.
             setHeight(Math.round(width * (ratioH / ratioW)));
        } else {
            // Find ratio
            const r = width / height;
            // Simplify fraction?
            const gcd = (a, b) => b ? gcd(b, a % b) : a;
            const divisor = gcd(width, height);
            const rw = width / divisor;
            const rh = height / divisor;
            setResult(`${rw}:${rh} (${r.toFixed(2)})`);
        }
    }, [width, height, ratioW, ratioH, mode]);

    const handleWidthChange = (val) => {
        setWidth(val);
    };

    const handleHeightChange = (val) => {
        setHeight(val);
        if (mode === 'calculate') {
             // If user edits height, update width?
             setWidth(Math.round(val * (ratioW / ratioH)));
        }
    };

    const applyPreset = (p) => {
        setWidth(p.w);
        setHeight(p.h);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Video Aspect Ratio Calculator | MiniTools by Spinotek</title>
                <meta name="description" content="Calculate dimensions and find aspect ratios for video production." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
                        <Box size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Video Aspect Ratio</h1>
                        <p className="text-slate-500">Video resolution and ratio calculator.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calculator */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
                        <div className="flex p-1 bg-slate-100 rounded-xl mb-4">
                             <button 
                                onClick={() => setMode('calculate')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'calculate' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                             >
                                 Calculate Dimensions
                             </button>
                             <button 
                                onClick={() => setMode('find')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'find' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                             >
                                 Find Ratio
                             </button>
                        </div>

                        {mode === 'calculate' ? (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Aspect Ratio</label>
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        {ratios.map(r => (
                                            <button 
                                                key={r.label} 
                                                onClick={() => { setRatioW(r.w); setRatioH(r.h); }}
                                                className={`px-3 py-2 border rounded-lg text-xs font-bold transition-all ${ratioW === r.w && ratioH === r.h ? 'bg-slate-800 text-white border-slate-800' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                                            >
                                                {r.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="number" value={ratioW} onChange={e => setRatioW(Number(e.target.value))} className="w-20 p-2 border rounded-lg font-bold text-center" />
                                        <span className="font-bold text-slate-400">:</span>
                                        <input type="number" value={ratioH} onChange={e => setRatioH(Number(e.target.value))} className="w-20 p-2 border rounded-lg font-bold text-center" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 items-center">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-slate-500 uppercase">Width (px)</label>
                                        <input type="number" value={width} onChange={e => handleWidthChange(Number(e.target.value))} className="w-full text-2xl font-mono font-bold p-3 border-slate-200 rounded-xl focus:ring-slate-500 focus:border-slate-500" />
                                    </div>
                                    <div className="space-y-2 relative">
                                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-slate-300">
                                            <ArrowRightLeft size={16} />
                                        </div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase">Height (px)</label>
                                        <input type="number" value={height} onChange={e => handleHeightChange(Number(e.target.value))} className="w-full text-2xl font-mono font-bold p-3 border-slate-200 rounded-xl focus:ring-slate-500 focus:border-slate-500" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <p className="text-sm text-slate-500">Enter width and height to find the aspect ratio.</p>
                                <div className="grid grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                        <label className="block text-xs font-bold text-slate-500 uppercase">Width (px)</label>
                                        <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full text-2xl font-mono font-bold p-3 border-slate-200 rounded-xl" />
                                    </div>
                                     <div className="space-y-2">
                                        <label className="block text-xs font-bold text-slate-500 uppercase">Height (px)</label>
                                        <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full text-2xl font-mono font-bold p-3 border-slate-200 rounded-xl" />
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                                    <div className="text-sm text-slate-400 font-bold uppercase mb-1">Result</div>
                                    <div className="text-4xl font-black text-slate-800">{result}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reference */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-700 mb-4">Common Resolutions</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                            {presets.map(p => (
                                <button 
                                    key={p.label}
                                    onClick={() => applyPreset(p)}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                                >
                                    <span className="font-bold text-slate-600 group-hover:text-slate-900">{p.label}</span>
                                    <span className="font-mono text-slate-400 text-xs">{p.w} x {p.h}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="aspect-ratio" categoryId="content" />
        </ToolPageLayout>
    );
}
