import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Maximize, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function AspectRatioCalc() {
    const { t } = useTranslation();
    const [width, setWidth] = useState(1920);
    const [height, setHeight] = useState(1080);
    const [ratio, setRatio] = useState(16/9);
    const [customRatio, setCustomRatio] = useState('16:9');

    // Ratios
    const presets = [
        { label: t('tools.aspect-calc.presets.hd'), value: 16/9, s: '16:9' },
        { label: t('tools.aspect-calc.presets.sd'), value: 4/3, s: '4:3' },
        { label: t('tools.aspect-calc.presets.square'), value: 1, s: '1:1' },
        { label: t('tools.aspect-calc.presets.ultrawide'), value: 21/9, s: '21:9' },
        { label: t('tools.aspect-calc.presets.mobile'), value: 9/16, s: '9:16' },
        { label: t('tools.aspect-calc.presets.golden'), value: 1.618, s: '1.618:1' },
    ];

    const handleWidthChange = (val) => {
        setWidth(val);
        setHeight(Math.round(val / ratio));
    };

    const handleHeightChange = (val) => {
        setHeight(val);
        setWidth(Math.round(val * ratio));
    };

    const handleRatioSelect = (r) => {
        setRatio(r.value);
        setCustomRatio(r.s);
        // Recalculate height based on new ratio keeping width constant (or whatever seems natural)
        setHeight(Math.round(width / r.value));
    };

    // Visual rectangle style
    // Max width/height 300px
    const rectStyle = {
        width: ratio >= 1 ? '300px' : `${300 * ratio}px`,
        height: ratio >= 1 ? `${300 / ratio}px` : '300px',
        maxWidth: '100%',
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.aspect-calc.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.aspect-calc.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-violet-200">
                        <Maximize size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.aspect-calc.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.aspect-calc.subtitle')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-8 h-fit">
                    <div>
                        <h3 className="font-bold text-slate-700 mb-4">{t('tools.aspect-calc.headings.common')}</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {presets.map(p => (
                                <button
                                    key={p.label}
                                    onClick={() => handleRatioSelect(p)}
                                    className={`px-3 py-2 text-sm font-medium rounded-xl border transition-all ${
                                        Math.abs(ratio - p.value) < 0.01 
                                            ? 'bg-violet-50 border-violet-500 text-violet-700 ring-1 ring-violet-500' 
                                            : 'border-slate-200 hover:bg-slate-50 hover:border-violet-300'
                                    }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                         <h3 className="font-bold text-slate-700">{t('tools.aspect-calc.headings.dimensions')}</h3>
                         <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">{t('tools.aspect-calc.labels.width')}</label>
                            <input 
                                type="number" 
                                value={width} 
                                onChange={(e) => handleWidthChange(Number(e.target.value))}
                                className="w-full text-xl font-mono font-bold p-3 rounded-xl border-slate-200 focus:border-violet-500 focus:ring-violet-500"
                            />
                         </div>
                         <div className="text-center text-slate-400">
                             <RefreshCw size={16} className="mx-auto" />
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">{t('tools.aspect-calc.labels.height')}</label>
                            <input 
                                type="number" 
                                value={height} 
                                onChange={(e) => handleHeightChange(Number(e.target.value))}
                                className="w-full text-xl font-mono font-bold p-3 rounded-xl border-slate-200 focus:border-violet-500 focus:ring-violet-500"
                            />
                         </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[500px]">
                        <div 
                            className="bg-violet-500 shadow-[0_0_50px_rgba(139,92,246,0.3)] transition-all duration-300 flex items-center justify-center text-white font-bold text-lg border-4 border-white/20"
                            style={rectStyle}
                        >
                            {customRatio}
                        </div>
                        <div className="mt-8 text-slate-400 font-mono text-sm">
                            {width} x {height} px
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="aspect-calc" categoryId="design" />
        </ToolPageLayout>
    );
}
