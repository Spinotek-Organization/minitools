import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Eye, Check, X, RefreshCw } from 'lucide-react';
import chroma from 'chroma-js';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function ContrastChecker() {
    const { t } = useTranslation();
    const [foreground, setForeground] = useState('#ffffff');
    const [background, setBackground] = useState('#3b82f6');
    const [ratio, setRatio] = useState(0);
    const [status, setStatus] = useState({ aa_sm: false, aa_lg: false, aaa_sm: false, aaa_lg: false });
    const [suggestion, setSuggestion] = useState('');

    useEffect(() => {
        try {
            const r = chroma.contrast(foreground, background);
            setRatio(r);
            setStatus({
                aa_sm: r >= 4.5,
                aa_lg: r >= 3,
                aaa_sm: r >= 7,
                aaa_lg: r >= 4.5
            });

            if (r < 4.5) {
                setSuggestion(t('tools.contrast-check.suggestions.fail'));
            } else {
                setSuggestion(t('tools.contrast-check.suggestions.pass'));
            }
        } catch (e) {
            setRatio(0);
        }
    }, [foreground, background, t]);

    const getStatusIcon = (pass) => pass ? <Check className="text-green-500" size={20}/> : <X className="text-red-500" size={20}/>;
    const getStatusText = (pass) => pass ? <span className="text-green-600 font-bold">{t('tools.contrast-check.status.pass')}</span> : <span className="text-red-600 font-bold">{t('tools.contrast-check.status.fail')}</span>;

    const swapColors = () => {
        const temp = foreground;
        setForeground(background);
        setBackground(temp);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.contrast-check.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.contrast-check.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
                        <Eye size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.contrast-check.title')}</h1>
                        <p className="text-slate-500">{t('tools.contrast-check.subtitle')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.contrast-check.labels.textColor')}</label>
                            <div className="flex items-center gap-2 border rounded-xl p-2">
                                <input 
                                    type="color" 
                                    value={foreground}
                                    onChange={(e) => setForeground(e.target.value)}
                                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                                />
                                <input 
                                    type="text" 
                                    value={foreground}
                                    onChange={(e) => setForeground(e.target.value)}
                                    className="w-full border-none focus:ring-0 font-mono text-sm uppercase"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.contrast-check.labels.bgColor')}</label>
                            <div className="flex items-center gap-2 border rounded-xl p-2">
                                <input 
                                    type="color" 
                                    value={background}
                                    onChange={(e) => setBackground(e.target.value)}
                                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                                />
                                <input 
                                    type="text" 
                                    value={background}
                                    onChange={(e) => setBackground(e.target.value)}
                                    className="w-full border-none focus:ring-0 font-mono text-sm uppercase"
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={swapColors}
                        className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-medium transition-colors flex justify-center items-center gap-2"
                    >
                        <RefreshCw size={18} /> {t('tools.contrast-check.actions.swap')}
                    </button>

                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-900">{t('tools.contrast-check.labels.scores')}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-slate-500 font-bold mb-1">AA - {t('tools.contrast-check.labels.normal')}</div>
                                    {getStatusText(status.aa_sm)}
                                </div>
                                {getStatusIcon(status.aa_sm)}
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-slate-500 font-bold mb-1">AA - {t('tools.contrast-check.labels.large')}</div>
                                    {getStatusText(status.aa_lg)}
                                </div>
                                {getStatusIcon(status.aa_lg)}
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-slate-500 font-bold mb-1">AAA - {t('tools.contrast-check.labels.normal')}</div>
                                    {getStatusText(status.aaa_sm)}
                                </div>
                                {getStatusIcon(status.aaa_sm)}
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-slate-500 font-bold mb-1">AAA - {t('tools.contrast-check.labels.large')}</div>
                                    {getStatusText(status.aaa_lg)}
                                </div>
                                {getStatusIcon(status.aaa_lg)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-8">
                    {/* Big Score Display */}
                    <div className={`p-8 rounded-3xl text-center border-4 ${ratio >= 4.5 ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'}`}>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{t('tools.contrast-check.labels.ratio')}</div>
                        <div className={`text-6xl font-black ${ratio >= 4.5 ? 'text-green-600' : 'text-red-600'}`}>
                            {ratio.toFixed(2)}:1
                        </div>
                        <p className="mt-4 text-slate-600 font-medium">{suggestion}</p>
                    </div>

                    {/* Live Preview */}
                    <div 
                        className="rounded-3xl p-8 shadow-xl transition-all duration-300 min-h-[300px] flex flex-col justify-center gap-6"
                        style={{ backgroundColor: background, color: foreground }}
                    >
                        <div>
                            <h2 className="text-3xl font-bold mb-2">{t('tools.contrast-check.preview.heading')}</h2>
                            <p className="text-lg opacity-90">{t('tools.contrast-check.preview.desc')}</p>
                        </div>
                        <div className="flex gap-4">
                            <button 
                                className="px-6 py-3 rounded-xl font-bold transition-transform active:scale-95"
                                style={{ backgroundColor: foreground, color: background }}
                            >
                                {t('tools.contrast-check.preview.primary')}
                            </button>
                            <button 
                                className="px-6 py-3 rounded-xl font-bold border-2 transition-transform active:scale-95"
                                style={{ borderColor: foreground, color: foreground }}
                            >
                                {t('tools.contrast-check.preview.secondary')}
                            </button>
                        </div>
                        <div className="text-xs opacity-70 mt-4">
                            {t('tools.contrast-check.preview.small')}
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="contrast-check" categoryId="design" />
        </ToolPageLayout>
    );
}
