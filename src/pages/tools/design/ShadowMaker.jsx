import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BoxSelect, Copy, Plus, Trash2, Check, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function ShadowMaker() {
    const { t } = useTranslation();
    const [shadows, setShadows] = useState([
        { x: 0, y: 4, blur: 6, spread: -1, color: 'rgba(0, 0, 0, 0.1)', inset: false },
        { x: 0, y: 2, blur: 4, spread: -1, color: 'rgba(0, 0, 0, 0.06)', inset: false }
    ]);
    const [boxColor, setBoxColor] = useState('#ffffff');
    const [bgColor, setBgColor] = useState('#f8fafc');
    const [css, setCss] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const shadowString = shadows.map(s => {
            return `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`;
        }).join(', ');
        setCss(`box-shadow: ${shadowString};`);
    }, [shadows]);

    const addShadow = () => {
        setShadows([...shadows, { x: 0, y: 10, blur: 15, spread: -3, color: 'rgba(0, 0, 0, 0.1)', inset: false }]);
    };

    const removeShadow = (index) => {
        if (shadows.length > 0) {
            setShadows(shadows.filter((_, i) => i !== index));
        }
    };

    const updateShadow = (index, field, value) => {
        const newShadows = [...shadows];
        newShadows[index] = { ...newShadows[index], [field]: value };
        setShadows(newShadows);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.shadow-maker.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.shadow-maker.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
                        <BoxSelect size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.shadow-maker.title')}</h1>
                        <p className="text-slate-500">{t('tools.shadow-maker.subtitle')}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setShadows([])}
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                    >
                        {t('tools.shadow-maker.actions.clear')}
                    </button>
                    <button 
                        onClick={copyToClipboard}
                        className="px-6 py-2 text-sm font-bold text-white bg-slate-800 rounded-xl hover:bg-slate-900 transition-colors flex items-center gap-2"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? t('tools.shadow-maker.actions.copied') : t('tools.shadow-maker.actions.copy')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Controls */}
                <div className="lg:col-span-4 space-y-6 max-h-[600px] overflow-y-auto pr-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-700">{t('tools.shadow-maker.labels.layers')}</h3>
                        <button 
                            onClick={addShadow} 
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                        >
                            <Plus size={14} /> {t('tools.shadow-maker.actions.add')}
                        </button>
                    </div>

                    {shadows.length === 0 && (
                        <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                            <p className="text-slate-400 text-sm">{t('tools.shadow-maker.labels.noShadows')}</p>
                        </div>
                    )}

                    {shadows.map((shadow, index) => (
                        <div key={index} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative group hover:border-blue-200 transition-colors">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => removeShadow(index)} className="text-slate-400 hover:text-red-500 p-1">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">{t('tools.shadow-maker.labels.xOffset')} ({shadow.x}px)</label>
                                    <input 
                                        type="range" min="-100" max="100" value={shadow.x}
                                        onChange={(e) => updateShadow(index, 'x', Number(e.target.value))}
                                        className="w-full accent-slate-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">{t('tools.shadow-maker.labels.yOffset')} ({shadow.y}px)</label>
                                    <input 
                                        type="range" min="-100" max="100" value={shadow.y}
                                        onChange={(e) => updateShadow(index, 'y', Number(e.target.value))}
                                        className="w-full accent-slate-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">{t('tools.shadow-maker.labels.blur')} ({shadow.blur}px)</label>
                                    <input 
                                        type="range" min="0" max="100" value={shadow.blur}
                                        onChange={(e) => updateShadow(index, 'blur', Number(e.target.value))}
                                        className="w-full accent-slate-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">{t('tools.shadow-maker.labels.spread')} ({shadow.spread}px)</label>
                                    <input 
                                        type="range" min="-50" max="50" value={shadow.spread}
                                        onChange={(e) => updateShadow(index, 'spread', Number(e.target.value))}
                                        className="w-full accent-slate-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">{t('tools.shadow-maker.labels.color')}</label>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="color" 
                                            value={shadow.color.startsWith('#') ? shadow.color : '#000000'}
                                            onChange={(e) => {
                                                updateShadow(index, 'color', e.target.value)
                                            }}
                                            className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                                        />
                                        <input 
                                            type="text" 
                                            value={shadow.color}
                                            onChange={(e) => updateShadow(index, 'color', e.target.value)}
                                            className="flex-1 text-xs border-slate-200 rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={shadow.inset}
                                            onChange={(e) => updateShadow(index, 'inset', e.target.checked)}
                                            className="rounded border-slate-300 text-slate-600 focus:ring-slate-500" 
                                        />
                                        <span className="text-xs font-bold text-slate-600">{t('tools.shadow-maker.labels.inset')}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Preview */}
                <div className="lg:col-span-8 space-y-6">
                    <div 
                        className="h-[500px] rounded-3xl border border-slate-200 flex items-center justify-center relative transition-colors duration-300"
                        style={{ backgroundColor: bgColor }}
                    >
                        <div className="absolute top-4 left-4 flex gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400 mb-1 block uppercase">{t('tools.shadow-maker.labels.boxColor')}</label>
                                <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 shadow-sm"/>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 mb-1 block uppercase">{t('tools.shadow-maker.labels.bgColor')}</label>
                                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0 shadow-sm"/>
                            </div>
                        </div>

                        <div 
                            className="w-64 h-64 rounded-2xl transition-all duration-200 flex items-center justify-center text-slate-400 font-medium"
                            style={{ 
                                backgroundColor: boxColor,
                                boxShadow: shadows.map(s => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`).join(', ')
                            }}
                        >
                            {t('tools.shadow-maker.labels.previewBox')}
                        </div>
                    </div>
                    
                    <div className="relative group">
                        <textarea 
                            readOnly
                            value={css}
                            className="w-full h-24 bg-slate-900 text-slate-300 font-mono text-sm p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                        <button 
                            onClick={copyToClipboard}
                            className="absolute top-4 right-4 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg transition-colors"
                        >
                            {copied ? t('tools.shadow-maker.actions.copied') : t('tools.shadow-maker.actions.copy')}
                        </button>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="shadow-maker" categoryId="design" />
        </ToolPageLayout>
    );
}
