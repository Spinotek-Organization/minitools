import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Shuffle, Copy, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function DailyReflection() {
    const { t } = useTranslation();
    
    // We fetch prompts from translations.
    // However, t returns a string or an array depending on config and key.
    // Better to use t to get array if supported or just keys.
    // Since returnObjects: true is not default, usage: t('key', { returnObjects: true })
    const PROMPTS = t('tools.daily-reflection.prompts', { returnObjects: true });

    // Since PROMPTS comes from a hook, we should probably use useEffect or similar?
    // But hooks shouldn't change order.
    // Safe way: Initialize state with index instead of string.
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [copied, setCopied] = useState(false);

    const getNewPrompt = () => {
        const randomIndex = Math.floor(Math.random() * PROMPTS.length);
        setCurrentPromptIndex(randomIndex);
        setAnswer('');
    };

    const copyToClipboard = () => {
        if (!answer.trim()) return;
        const text = `Daily Reflection:\n\nQ: ${PROMPTS[currentPromptIndex]}\nA: ${answer}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.daily-reflection.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.daily-reflection.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.daily-reflection.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.daily-reflection.desc')}</p>
                    </div>
                </div>
                <button 
                    onClick={getNewPrompt}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 font-medium transition-colors"
                >
                    <Shuffle size={18} />
                    {t('tools.daily-reflection.controls.newPrompt')}
                </button>
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm relative">
                    <div className="mb-6">
                         <span className="text-cyan-600 font-bold uppercase tracking-wider text-xs mb-2 block">{t('tools.daily-reflection.todayQuestion')}</span>
                         <h2 className="text-2xl font-bold text-slate-800 leading-tight">
                            {PROMPTS[currentPromptIndex]}
                         </h2>
                    </div>

                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder={t('tools.daily-reflection.placeholder')}
                        className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none font-medium text-slate-600"
                    ></textarea>

                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={copyToClipboard}
                            disabled={!answer.trim()}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                                copied 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-200 disabled:opacity-50 disabled:shadow-none'
                            }`}
                        >
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                            {copied ? t('tools.daily-reflection.controls.copied') : t('tools.daily-reflection.controls.copy')}
                        </button>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="daily-reflection" categoryId="productivity" />
        </ToolPageLayout>
    );
}
