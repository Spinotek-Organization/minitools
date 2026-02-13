import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Palette, Copy, Check, Lock, Unlock, Download, RefreshCw, Plus, Minus } from 'lucide-react';
import chroma from 'chroma-js';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function PaletteGenerator() {
    const { t } = useTranslation();
    const [baseColor, setBaseColor] = useState('#3b82f6');
    const [method, setMethod] = useState('monochromatic');
    const [palette, setPalette] = useState([]);
    const [colorCount, setColorCount] = useState(5);
    const [locked, setLocked] = useState({});
    const [copied, setCopied] = useState(null);

    const methods = [
        { id: 'monochromatic', name: t('tools.palette-gen.methods.monochromatic') },
        { id: 'analogous', name: t('tools.palette-gen.methods.analogous') },
        { id: 'complementary', name: t('tools.palette-gen.methods.complementary') },
        { id: 'triadic', name: t('tools.palette-gen.methods.triadic') },
        { id: 'split-complementary', name: t('tools.palette-gen.methods.split-complementary') },
        { id: 'tetradic', name: t('tools.palette-gen.methods.tetradic') },
        { id: 'random', name: t('tools.palette-gen.methods.random') }
    ];

    const generatePalette = (isRegenerateButton = false) => {
        let currentBase = baseColor;
        if (isRegenerateButton) {
            currentBase = chroma.random().hex();
            setBaseColor(currentBase);
        }

        let colors = [];
        const base = chroma(currentBase);

        try {
            switch (method) {
                case 'monochromatic':
                    colors = chroma.scale([base.darken(2), base, base.brighten(2)]).colors(colorCount);
                    break;
                case 'analogous':
                    const h = base.get('hsl.h');
                    const step = 60 / (colorCount > 1 ? colorCount - 1 : 1);
                    colors = Array.from({length: colorCount}, (_, i) => {
                         const offset = -30 + (i * step);
                         return base.set('hsl.h', (h + offset) % 360).hex();
                    });
                    break;
                case 'complementary':
                    const comp = base.set('hsl.h', (base.get('hsl.h') + 180) % 360);
                    colors = chroma.scale([base, comp]).mode('lch').colors(colorCount);
                    break;
                case 'triadic':
                case 'split-complementary': 
                case 'tetradic':
                     let keyColors = [base.hex()];
                     if (method === 'triadic') {
                         keyColors.push(base.set('hsl.h', (base.get('hsl.h') + 120) % 360).hex());
                         keyColors.push(base.set('hsl.h', (base.get('hsl.h') + 240) % 360).hex());
                     } else if (method === 'split-complementary') {
                         keyColors.push(base.set('hsl.h', (base.get('hsl.h') + 150) % 360).hex());
                         keyColors.push(base.set('hsl.h', (base.get('hsl.h') + 210) % 360).hex());
                     } else if (method === 'tetradic') {
                         keyColors.push(base.set('hsl.h', (base.get('hsl.h') + 90) % 360).hex());
                         keyColors.push(base.set('hsl.h', (base.get('hsl.h') + 180) % 360).hex());
                         keyColors.push(base.set('hsl.h', (base.get('hsl.h') + 270) % 360).hex());
                     }
                     colors = chroma.scale(keyColors).mode('lch').colors(colorCount);
                     break;
                case 'random':
                     colors = chroma.scale([chroma.random(), chroma.random()]).mode('lch').colors(colorCount);
                     break;
                default:
                    colors = chroma.scale([base, '#fff']).colors(colorCount);
            }
        } catch (e) {
            console.error("Color generation error", e);
            colors = chroma.scale([base, '#000']).colors(colorCount);
        }

        setPalette(prev => {
            if (prev.length === 0) return colors;
            return colors.map((c, i) => (locked[i] && prev[i]) ? prev[i] : c);
        });
    };

    useEffect(() => {
        generatePalette(false);
    }, [baseColor, method, colorCount]);

    const toggleLock = (index) => {
        setLocked(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const copyToClipboard = (hex) => {
        navigator.clipboard.writeText(hex);
        setCopied(hex);
        setTimeout(() => setCopied(null), 2000);
    };

    const downloadPalette = () => {
        const canvas = document.createElement('canvas');
        const swatchWidth = 150;
        const width = swatchWidth * palette.length;
        const height = 250;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        palette.forEach((color, i) => {
            ctx.fillStyle = color;
            ctx.fillRect(i * swatchWidth, 0, swatchWidth, height);
            
            const luminance = chroma(color).luminance();
            ctx.fillStyle = luminance > 0.5 ? '#000000' : '#ffffff';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(color.toUpperCase(), (i * swatchWidth) + (swatchWidth / 2), height - 40);
        });
        
        const link = document.createElement('a');
        link.download = `palette-${baseColor}.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    const adjustCount = (delta) => {
        const newCount = colorCount + delta;
        if (newCount >= 1 && newCount <= 9) {
            setColorCount(newCount);
        }
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.palette-gen.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.palette-gen.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                        <Palette size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.palette-gen.title')}</h1>
                        <p className="text-slate-500">{t('tools.palette-gen.subtitle')}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setLocked({})}
                        className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        {t('tools.palette-gen.actions.resetLocks')}
                    </button>
                    <button 
                        onClick={() => generatePalette(true)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
                    >
                        <RefreshCw size={16} /> {t('tools.palette-gen.actions.randomize')}
                    </button>
                    <button 
                        onClick={downloadPalette}
                        className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors flex items-center gap-2"
                    >
                        <Download size={16} /> {t('tools.palette-gen.actions.export')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 h-fit space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('tools.palette-gen.labels.baseColor')}</label>
                        <div className="flex gap-2">
                            <input 
                                type="color" 
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                            />
                            <input 
                                type="text" 
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="flex-1 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 font-mono"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('tools.palette-gen.labels.harmonyRule')}</label>
                        <div className="space-y-2">
                            {methods.map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => setMethod(m.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                                        method === m.id 
                                            ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' 
                                            : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                                    }`}
                                >
                                    {m.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-slate-700 mb-2">{t('tools.palette-gen.labels.paletteSize')} (Max 9)</label>
                         <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200 justify-between">
                            <button 
                                onClick={() => adjustCount(-1)}
                                disabled={colorCount <= 1}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="text-xl font-black text-slate-800">{colorCount}</span>
                            <button 
                                onClick={() => adjustCount(1)}
                                disabled={colorCount >= 9}
                                className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600"
                            >
                                <Plus size={18} />
                            </button>
                         </div>
                    </div>
                </div>

                {/* Palette Display */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-2 shadow-sm h-full min-h-[400px] flex flex-col md:flex-row">
                        {palette.map((color, idx) => (
                            <div 
                                key={idx} 
                                className="relative flex-1 group transition-all duration-300 min-h-[100px] md:min-h-full rounded-2xl md:first:rounded-l-2xl md:first:rounded-r-none md:last:rounded-r-2xl md:last:rounded-l-none first:rounded-t-2xl first:rounded-b-none last:rounded-b-2xl last:rounded-t-none md:rounded-none"
                                style={{ backgroundColor: color }}
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-sm z-10">
                                    <button 
                                        onClick={() => toggleLock(idx)}
                                        className="p-2 bg-white/90 rounded-full shadow-lg mb-4 hover:bg-white transition-colors"
                                        title={locked[idx] ? "Unlock" : "Lock"}
                                    >
                                        {locked[idx] ? <Lock size={20} className="text-blue-600"/> : <Unlock size={20} className="text-slate-400"/>}
                                    </button>
                                    
                                    <button
                                        onClick={() => copyToClipboard(color)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-xl shadow-lg font-mono font-bold text-slate-800 hover:bg-white transition-colors"
                                    >
                                        {color.toUpperCase()}
                                        {copied === color ? <Check size={16} className="text-green-500"/> : <Copy size={16} className="text-slate-400"/>}
                                    </button>
                                </div>
                                
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/20 text-white px-3 py-1 rounded-lg backdrop-blur-md text-xs font-mono font-bold tracking-wider opacity-0 lg:opacity-100 md:opacity-100 group-hover:opacity-0 transition-opacity whitespace-nowrap">
                                    {color.toUpperCase()}
                                </div>

                                {locked[idx] && (
                                    <div className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-full z-20">
                                        <Lock size={14} className="text-white"/>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="palette-gen" categoryId="design" />
        </ToolPageLayout>
    );
}
