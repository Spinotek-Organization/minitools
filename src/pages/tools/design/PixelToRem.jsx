import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Ruler, RefreshCw, Copy, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PixelToRem() {
    const [baseSize, setBaseSize] = useState(16);
    const [pixels, setPixels] = useState(16);
    const [rem, setRem] = useState(1);
    const [copied, setCopied] = useState(null);

    const handlePixelsChange = (val) => {
        setPixels(val);
        setRem(parseFloat((val / baseSize).toFixed(4)));
    };

    const handleRemChange = (val) => {
        setRem(val);
        setPixels(Math.round(val * baseSize));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    // Reference table values
    const tableValues = [8, 10, 12, 14, 16, 18, 20, 24, 32, 48, 64];

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Pixel to REM Converter | MiniTools by Spinotek</title>
                <meta name="description" content="Convert pixels to REM units for responsive web design." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-200">
                        <Ruler size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Pixel to REM Converter</h1>
                        <p className="text-slate-500 text-sm">Convert pixels to REM for modern responsive CSS.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Converter */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-8">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Base Font Size (px)</label>
                            <input 
                                type="number" 
                                value={baseSize} 
                                onChange={(e) => setBaseSize(Number(e.target.value))}
                                className="w-32 text-center font-bold p-2 rounded-xl border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                            />
                            <p className="text-xs text-slate-400 mt-2">Default browser font size is usually 16px.</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 w-full">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Pixels (px)</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={pixels} 
                                        onChange={(e) => handlePixelsChange(Number(e.target.value))}
                                        className="w-full text-3xl font-mono font-bold p-6 rounded-2xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 shadow-sm"
                                    />
                                    <button 
                                        onClick={() => copyToClipboard(`${pixels}px`)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600"
                                    >
                                        {copied === `${pixels}px` ? <Check size={20}/> : <Copy size={20}/>}
                                    </button>
                                </div>
                            </div>

                            <div className="text-slate-300">
                                <RefreshCw size={32} />
                            </div>

                            <div className="flex-1 w-full">
                                <label className="block text-sm font-bold text-slate-700 mb-2">REM</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={rem} 
                                        onChange={(e) => handleRemChange(Number(e.target.value))}
                                        step="0.125"
                                        className="w-full text-3xl font-mono font-bold p-6 rounded-2xl border-slate-200 focus:border-teal-500 focus:ring-teal-500 shadow-sm"
                                    />
                                    <button 
                                        onClick={() => copyToClipboard(`${rem}rem`)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600"
                                    >
                                        {copied === `${rem}rem` ? <Check size={20}/> : <Copy size={20}/>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-teal-50 border border-teal-100 rounded-3xl p-8 text-center">
                        <p className="text-teal-800 font-medium text-lg mb-2">
                            {pixels}px = {rem}rem
                        </p>
                        <p className="text-teal-600/70 text-sm">
                            Based on a root font-size of {baseSize}px.
                        </p>
                    </div>
                </div>

                {/* Reference Table */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-700">Quick Reference</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {tableValues.map(px => (
                                <div key={px} className="flex justify-between p-4 hover:bg-slate-50 transition-colors">
                                    <span className="font-mono text-slate-600">{px}px</span>
                                    <span className="font-mono font-bold text-teal-600">{(px / baseSize).toFixed(3).replace(/\.?0+$/, '')}rem</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="pixel-rem" categoryId="design" />
        </ToolPageLayout>
    );
}
