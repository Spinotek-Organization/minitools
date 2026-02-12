import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Activity, Hash, Trash2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

const StatRow = ({ label, value, sub }) => (
    <div className="flex justify-between items-center">
        <span className="text-slate-600 font-medium text-sm">{label}</span>
        <span className="font-bold text-slate-800">
            {value} {sub && <span className="text-xs text-slate-400 ml-1">{sub}</span>}
        </span>
    </div>
);

export default function WordCounter() {
    const { t } = useTranslation('tools');
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        words: 0,
        chars: 0,
        charsNoSpace: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0
    });
    const [density, setDensity] = useState([]);

    useEffect(() => {
        calculateStats(text);
    }, [text]);

    const calculateStats = (input) => {
        if (!input) {
            setStats({ words: 0, chars: 0, charsNoSpace: 0, sentences: 0, paragraphs: 0, readingTime: 0, speakingTime: 0 });
            setDensity([]);
            return;
        }

        const words = input.trim().split(/\s+/).filter(word => word.length > 0).length;
        const chars = input.length;
        const charsNoSpace = input.replace(/\s/g, '').length;
        const sentences = input.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
        const paragraphs = input.split(/\n+/).filter(para => para.trim().length > 0).length;

        const readingTime = Math.ceil(words / 200);
        const speakingTime = Math.ceil(words / 130);

        setStats({ words, chars, charsNoSpace, sentences, paragraphs, readingTime, speakingTime });

        const wordList = input.toLowerCase().match(/\b\w+\b/g);
        if (wordList) {
            const frequency = {};
            const stopWords = ['the', 'and', 'a', 'to', 'of', 'in', 'i', 'is', 'that', 'it', 'on', 'you', 'this', 'for', 'but', 'with', 'are', 'have', 'be', 'at', 'or', 'as', 'was', 'so', 'if', 'out', 'not'];

            wordList.forEach(word => {
                if (!stopWords.includes(word) && word.length > 2) {
                    frequency[word] = (frequency[word] || 0) + 1;
                }
            });

            const sorted = Object.entries(frequency)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([word, count]) => ({
                    word,
                    count,
                    percentage: Math.round((count / words) * 100)
                }));

            setDensity(sorted);
        } else {
            setDensity([]);
        }
    };

    return (
        <ToolPageLayout toolId="word-counter">
            <Helmet>
                <title>{t('word-counter.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('word-counter.desc')} />
            </Helmet>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-blue-200">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('word-counter.title')}</h1>
                        <p className="text-slate-500">{t('word-counter.desc')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                             <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-slate-800">
                                    {t('word-counter.stats.summary', { words: stats.words, chars: stats.chars })}
                                </h2>
                                <button 
                                    onClick={() => setText('')}
                                    className="text-slate-400 hover:text-red-500 flex items-center gap-2 text-sm font-bold transition-colors"
                                    title={t('word-counter.input.clear')}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder={t('word-counter.input.placeholder')}
                                className="w-full h-80 p-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-slate-700 leading-relaxed custom-scrollbar"
                            ></textarea>
                        </div>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="space-y-6">
                         
                         {/* Detailed Stats */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Activity size={20} className="text-blue-500" />
                                {t('word-counter.stats.title')}
                            </h3>
                            
                            <div className="space-y-4">
                                <StatRow label={t('word-counter.stats.words')} value={stats.words} />
                                <StatRow label={t('word-counter.stats.chars')} value={stats.chars} />
                                <StatRow label={t('word-counter.stats.sentences')} value={stats.sentences} />
                                <StatRow label={t('word-counter.stats.paragraphs')} value={stats.paragraphs} />
                                <div className="h-px bg-slate-100 my-4"></div>
                                <StatRow label={t('word-counter.stats.readTime')} value={stats.readingTime} sub="min" />
                                <StatRow label={t('word-counter.stats.speakTime')} value={stats.speakingTime} sub="min" />
                            </div>
                        </div>

                        {/* Top Words */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Hash size={20} className="text-purple-500" />
                                {t('word-counter.frequency.title')}
                             </h3>
                             {density.length > 0 ? (
                                <div className="space-y-3">
                                    {density.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                <span className="w-6 h-6 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-500">
                                                    {i + 1}
                                                </span>
                                                <span className="font-medium text-slate-700 truncate" title={item.word}>
                                                    {item.word}
                                                </span>
                                            </div>
                                            <span className="text-xs font-bold bg-purple-100 text-purple-600 px-2 py-1 rounded-full flex-shrink-0">
                                                {item.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-400 italic">
                                    {t('word-counter.frequency.hint')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-200 py-8">
                    <RelatedTools currentToolId="word-counter" categoryId="office" />
                </div>
            </div>
        </ToolPageLayout>
    );
}   
