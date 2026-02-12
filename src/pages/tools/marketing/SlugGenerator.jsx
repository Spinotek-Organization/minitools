import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Zap, Copy, Check, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

import { useTranslation } from 'react-i18next';

export default function SlugGenerator() {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const [slug, setSlug] = useState('');
    const [separator, setSeparator] = useState('-');
    const [removeNumbers, setRemoveNumbers] = useState(false);
    const [removeStopWords, setRemoveStopWords] = useState(false);
    const [copied, setCopied] = useState(false);

    const STOP_WORDS = ['a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];

    useEffect(() => {
        let text = input.toLowerCase();

        // 1. Remove special chars (mostly)
        text = text.replace(/[^a-z0-9\s-_]/g, '');

        // 2. Remove numbers if requested
        if (removeNumbers) {
            text = text.replace(/[0-9]/g, '');
        }

        // 3. Split into words
        let words = text.split(/\s+/).filter(w => w);

        // 4. Remove stop words if requested
        if (removeStopWords) {
            words = words.filter(w => !STOP_WORDS.includes(w));
        }

        // 5. Join with separator
        setSlug(words.join(separator));

    }, [input, separator, removeNumbers, removeStopWords]);

    const handleCopy = () => {
        navigator.clipboard.writeText(slug);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout toolId="slug-gen">
            <Helmet>
                <title>{t('tools.slug-gen.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.slug-gen.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.slug-gen.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.slug-gen.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Input */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-center">
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.slug-gen.input.label')}</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('tools.slug-gen.input.placeholder')}
                        className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-lg resize-none mb-4"
                    />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('tools.slug-gen.options.title')}</div>
                        
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-slate-700">{t('tools.slug-gen.options.separator')}</label>
                            <div className="flex bg-white rounded-lg p-1 border border-slate-200">
                                <button
                                    onClick={() => setSeparator('-')}
                                    className={`px-3 py-1 rounded-md text-sm font-bold transition-all ${separator === '-' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => setSeparator('_')}
                                    className={`px-3 py-1 rounded-md text-sm font-bold transition-all ${separator === '_' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    _
                                </button>
                            </div>
                        </div>

                        <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{t('tools.slug-gen.options.removeNumbers')}</span>
                            <div className={`w-10 h-6 rounded-full p-1 transition-colors ${removeNumbers ? 'bg-emerald-500' : 'bg-slate-200'}`} onClick={() => setRemoveNumbers(!removeNumbers)}>
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${removeNumbers ? 'translate-x-4' : ''}`} />
                            </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{t('tools.slug-gen.options.removeStop')}</span>
                            <div className={`w-10 h-6 rounded-full p-1 transition-colors ${removeStopWords ? 'bg-emerald-500' : 'bg-slate-200'}`} onClick={() => setRemoveStopWords(!removeStopWords)}>
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${removeStopWords ? 'translate-x-4' : ''}`} />
                            </div>
                        </label>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-emerald-900 text-emerald-50 p-8 rounded-3xl flex flex-col justify-center relative overflow-hidden">
                    {/* Assuming Link is an imported component, adding it here as per the instruction's context */}
                    {/* <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Link size={120} />
                    </div> */}
                    
                     <div className="relative z-10">
                        <label className="block text-sm font-bold text-emerald-300 mb-2 uppercase tracking-wider">{t('tools.slug-gen.output.title')}</label>
                        <div className="break-all font-mono text-2xl md:text-3xl font-bold mb-8 min-h-[80px] flex items-center">
                            {slug || <span className="opacity-30">{t('tools.slug-gen.output.placeholder')}</span>}
                        </div>

                        <button
                            onClick={handleCopy}
                            disabled={!slug}
                            className={`w-full py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-all ${
                                slug 
                                    ? 'bg-emerald-400 hover:bg-emerald-300 text-emerald-950 shadow-lg shadow-emerald-900/50' 
                                    : 'bg-emerald-800/50 text-emerald-700 cursor-not-allowed'
                            }`}
                        >
                            {copied ? <Check size={24} /> : <Copy size={24} />}
                            {copied ? t('tools.slug-gen.output.copied') : t('tools.slug-gen.output.copy')}
                        </button>
                     </div>
                </div>
            </div>

            <RelatedTools currentToolId="slug-gen" categoryId="marketing" />
        </ToolPageLayout>
    );
}
