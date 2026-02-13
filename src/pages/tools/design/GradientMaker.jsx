import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layers, Copy, Trash2, Plus, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function GradientMaker() {
    const { t } = useTranslation();
    const [type, setType] = useState('linear');
    const [angle, setAngle] = useState(90);
    const [position, setPosition] = useState('center');
    const [shape, setShape] = useState('circle');
    const [stops, setStops] = useState([
        { color: '#3b82f6', position: 0 },
        { color: '#ec4899', position: 100 }
    ]);
    const [css, setCss] = useState('');
    const [copied, setCopied] = useState(false);

    const types = [
        { id: 'linear', label: t('tools.gradient-maker.types.linear') },
        { id: 'radial', label: t('tools.gradient-maker.types.radial') },
        { id: 'conic', label: t('tools.gradient-maker.types.conic') },
        { id: 'repeating-linear', label: t('tools.gradient-maker.types.repeating-linear') },
        { id: 'repeating-radial', label: t('tools.gradient-maker.types.repeating-radial') }
    ];

    const positions = [
        { value: 'center', label: t('tools.gradient-maker.positions.center') },
        { value: 'top', label: t('tools.gradient-maker.positions.top') },
        { value: 'bottom', label: t('tools.gradient-maker.positions.bottom') },
        { value: 'left', label: t('tools.gradient-maker.positions.left') },
        { value: 'right', label: t('tools.gradient-maker.positions.right') },
        { value: 'top left', label: t('tools.gradient-maker.positions.top-left') },
        { value: 'top right', label: t('tools.gradient-maker.positions.top-right') },
        { value: 'bottom left', label: t('tools.gradient-maker.positions.bottom-left') },
        { value: 'bottom right', label: t('tools.gradient-maker.positions.bottom-right') }
    ];

    useEffect(() => {
        const sortedStops = [...stops].sort((a, b) => a.position - b.position);
        const stopString = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');
        
        let generated = '';
        
        switch (type) {
            case 'linear':
            case 'repeating-linear':
                generated = `${type}-gradient(${angle}deg, ${stopString})`;
                break;
            case 'radial':
            case 'repeating-radial':
                generated = `${type}-gradient(${shape} at ${position}, ${stopString})`;
                break;
            case 'conic':
                generated = `conic-gradient(from ${angle}deg at ${position}, ${stopString})`;
                break;
            default:
                generated = `linear-gradient(${angle}deg, ${stopString})`;
        }

        setCss(`background: ${generated};`);
    }, [type, angle, position, shape, stops]);

    const addStop = () => {
        setStops([...stops, { color: '#ffffff', position: 50 }]);
    };

    const removeStop = (index) => {
        if (stops.length > 2) {
            setStops(stops.filter((_, i) => i !== index));
        }
    };

    const updateStop = (index, field, value) => {
        const newStops = [...stops];
        newStops[index] = { ...newStops[index], [field]: value };
        setStops(newStops);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.gradient-maker.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.gradient-maker.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <Layers size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.gradient-maker.title')}</h1>
                        <p className="text-slate-500">{t('tools.gradient-maker.subtitle')}</p>
                    </div>
                </div>
                <button 
                    onClick={copyToClipboard}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200"
                >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                    {copied ? t('tools.gradient-maker.actions.copied') : t('tools.gradient-maker.actions.copy')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual Editor */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
                        
                        {/* Type Selector */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.gradient-maker.labels.type')}</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {types.map(t => (
                                    <button 
                                        key={t.id}
                                        onClick={() => setType(t.id)}
                                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                                            type === t.id 
                                                ? 'bg-indigo-50 border border-indigo-200 text-indigo-700' 
                                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Directions & Settings */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Angle - for Linear & Conic */}
                            {(type.includes('linear') || type === 'conic') && (
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                                        {t('tools.gradient-maker.labels.angle')} ({angle}°)
                                    </label>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="360" 
                                        value={angle}
                                        onChange={(e) => setAngle(Number(e.target.value))}
                                        className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 font-mono mt-1">
                                        <span>0°</span>
                                        <span>360°</span>
                                    </div>
                                </div>
                            )}

                            {/* Shape - for Radial */}
                            {(type.includes('radial')) && (
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('tools.gradient-maker.labels.shape')}</label>
                                    <select 
                                        value={shape} 
                                        onChange={(e) => setShape(e.target.value)}
                                        className="w-full rounded-xl border-slate-200 focus:border-indigo-500"
                                    >
                                        <option value="circle">{t('tools.gradient-maker.shapes.circle')}</option>
                                        <option value="ellipse">{t('tools.gradient-maker.shapes.ellipse')}</option>
                                    </select>
                                </div>
                            )}

                            {/* Position - for Radial & Conic */}
                            {(type.includes('radial') || type === 'conic') && (
                                <div className={type === 'conic' ? 'col-span-2' : ''}>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('tools.gradient-maker.labels.position')}</label>
                                    <select 
                                        value={position} 
                                        onChange={(e) => setPosition(e.target.value)}
                                        className="w-full rounded-xl border-slate-200 focus:border-indigo-500"
                                    >
                                        {positions.map(p => (
                                            <option key={p.value} value={p.value}>{p.label}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Color Stops */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-slate-700">{t('tools.gradient-maker.labels.stops')}</label>
                                <button 
                                    onClick={addStop} 
                                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-lg transition-colors"
                                >
                                    <Plus size={14} /> {t('tools.gradient-maker.actions.add')}
                                </button>
                            </div>
                            
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                {stops.map((stop, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 group hover:border-indigo-200 transition-colors">
                                        <input 
                                            type="color" 
                                            value={stop.color}
                                            onChange={(e) => updateStop(index, 'color', e.target.value)}
                                            className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 shadow-sm"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                                <span>{t('tools.gradient-maker.labels.stopPosition')}</span>
                                                <span>{stop.position}%</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max="100" 
                                                value={stop.position}
                                                onChange={(e) => updateStop(index, 'position', Number(e.target.value))}
                                                className="w-full accent-indigo-500 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer"
                                            />
                                        </div>
                                        {stops.length > 2 && (
                                            <button 
                                                onClick={() => removeStop(index)}
                                                className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <textarea 
                            readOnly
                            value={css}
                            className="w-full h-32 bg-slate-900 text-indigo-300 font-mono text-sm p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <div className="absolute top-2 right-2 text-xs text-slate-500 font-mono bg-slate-800 px-2 py-1 rounded">
                            CSS
                        </div>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="h-full min-h-[400px] bg-slate-100 rounded-3xl shadow-inner-lg p-8 flex items-center justify-center">
                    <div 
                        className="w-full h-full max-h-[600px] rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center group overflow-hidden border-4 border-white"
                        style={{ background: css.replace('background: ', '').replace(';', '') }}
                    >
                        <div className="text-white/90 font-black text-4xl opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm bg-black/20 px-6 py-4 rounded-3xl">
                            {t('tools.gradient-maker.labels.preview')}
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="gradient-maker" categoryId="design" />
        </ToolPageLayout>
    );
}
