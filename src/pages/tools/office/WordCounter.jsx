import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Type, AlignLeft, Clock, AlertCircle } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function WordCounter() {
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
        <ToolPageLayout>
            <Helmet>
                <title>Word Counter & Text Analyzer | Mini Tools by Spinotek</title>
                <meta name="description" content="Free online word counter, character counter, and text analyzer. Calculate reading time and check keyword density instantly." />
            </Helmet>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Word Counter</h1>
                        <p className="text-slate-500">Real-time stats, character count, and reading estimates.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Input Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Text Area Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Start typing or paste your text here..."
                                className="w-full h-[500px] p-6 resize-none outline-none text-slate-700 placeholder-slate-400 bg-transparent text-lg leading-relaxed font-normal"
                                spellCheck="false"
                            />
                            <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex justify-between items-center text-xs text-slate-500">
                                <span>Autosaved locally</span>
                                <button
                                    onClick={() => setText('')}
                                    className="text-slate-500 hover:text-red-500 font-medium transition-colors"
                                >
                                    Clear Text
                                </button>
                            </div>
                        </div>

                        {/* Keyword Density Card */}
                        {density.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <AlertCircle size={18} className="text-blue-500" />
                                    Top Keywords
                                </h3>
                                <div className="space-y-4">
                                    {density.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-4 flex-1">
                                                <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                    {index + 1}
                                                </span>
                                                <span className="font-medium text-slate-700 capitalize w-24 truncate" title={item.word}>
                                                    {item.word}
                                                </span>
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                                        style={{ width: `${Math.min(item.percentage * 5, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="ml-4 font-mono text-sm text-slate-500 font-medium w-16 text-right">
                                                {item.count} <span className="text-slate-300 text-xs">x</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Stats Sticky */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="sticky top-24 space-y-6">
                            {/* Primary Stats */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Overview</h3>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                                        <div className="text-3xl font-black text-slate-900 mb-1">{stats.words.toLocaleString()}</div>
                                        <div className="text-xs font-bold text-slate-500 flex items-center justify-center gap-1">
                                            Words
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                                        <div className="text-3xl font-black text-slate-900 mb-1">{stats.chars.toLocaleString()}</div>
                                        <div className="text-xs font-bold text-slate-500 flex items-center justify-center gap-1">
                                            Chars
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">No Spaces</span>
                                        <span className="font-bold text-slate-700">{stats.charsNoSpace.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Sentences</span>
                                        <span className="font-bold text-slate-700">{stats.sentences.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Paragraphs</span>
                                        <span className="font-bold text-slate-700">{stats.paragraphs.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reading Time */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Time Estimate</h3>
                                <div className="space-y-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-lg leading-tight">
                                                {stats.readingTime} <span className="text-sm font-normal text-slate-500">min</span>
                                            </div>
                                            <div className="text-xs text-slate-400">Silent Reading</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                            <AlignLeft size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-lg leading-tight">
                                                {stats.speakingTime} <span className="text-sm font-normal text-slate-500">min</span>
                                            </div>
                                            <div className="text-xs text-slate-400">Speaking Output</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
