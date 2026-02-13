import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Minimize2, Save, FileCode, Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { minify } from 'terser';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function JsMinifier() {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);
    const [isMinifying, setIsMinifying] = useState(false);
    const [copied, setCopied] = useState(false);

    const minifyJS = async () => {
        if (!input) return;
        setIsMinifying(true);
        setError(null);

        try {
            const result = await minify(input, {
                mangle: true,
                compress: true,
                sourceMap: false
            });

            if (result.code) {
                setOutput(result.code);
                
                const originalSize = new Blob([input]).size;
                const minifiedSize = new Blob([result.code]).size;
                const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
                
                setStats({ original: originalSize, minified: minifiedSize, savings });
            }
        } catch (err) {
            setError(err.message || t('tools.js-minifier.errors.failed'));
            setOutput('');
            setStats(null);
        } finally {
            setIsMinifying(false);
        }
    };

    const copyOutput = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.js-minifier.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.js-minifier.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-700 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Minimize2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.js-minifier.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.js-minifier.subtitle')}</p>
                    </div>
                </div>
                <button 
                    onClick={minifyJS}
                    disabled={isMinifying || !input}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${
                        isMinifying || !input 
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                        : 'bg-yellow-700 hover:bg-yellow-800 text-white shadow-yellow-200 hover:scale-105'
                    }`}
                >
                    {isMinifying ? t('tools.js-minifier.actions.minifying') : (
                        <>
                            <Save size={20} /> {t('tools.js-minifier.actions.minify')}
                        </>
                    )}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm h-full flex flex-col">
                    <label className="text-sm font-bold text-slate-500 mb-2 ml-2">{t('tools.js-minifier.labels.input')}</label>
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('tools.js-minifier.placeholders.input')} 
                        className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[400px]"
                        spellCheck="false"
                    />
                </div>
                
                <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm h-full flex flex-col relative">
                    <div className="flex justify-between items-center mb-2 mx-2 h-6">
                        <label className="text-sm font-bold text-slate-500">{t('tools.js-minifier.labels.output')}</label>
                        {stats && (
                            <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                {t('tools.js-minifier.labels.saved', { savings: stats.savings, original: stats.original, minified: stats.minified })}
                            </div>
                        )}
                        {output && (
                             <button onClick={copyOutput} className="text-slate-400 hover:text-yellow-600 transition-colors ml-auto">
                                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                             </button>
                        )}
                    </div>
                    
                    {error ? (
                        <div className="flex-1 w-full p-6 bg-red-50 border border-red-100 rounded-xl text-red-600 font-medium flex items-start gap-3">
                            <AlertCircle className="shrink-0 mt-0.5" size={20} />
                            <div className="break-words w-full">
                                <p className="font-bold mb-1">{t('tools.js-minifier.labels.failed')}</p>
                                <p className="text-sm font-mono opacity-80">{error}</p>
                            </div>
                        </div>
                    ) : (
                        <textarea 
                            readOnly
                            value={output}
                            placeholder={t('tools.js-minifier.placeholders.output')} 
                            className="flex-1 w-full p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs md:text-sm text-yellow-400 focus:outline-none min-h-[400px]"
                            spellCheck="false"
                        />
                    )}
                </div>
            </div>

            <RelatedTools currentToolId="js-minifier" categoryId="dev" />
        </ToolPageLayout>
    );
}
