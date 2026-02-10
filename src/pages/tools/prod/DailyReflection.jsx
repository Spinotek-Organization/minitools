import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Shuffle, Copy, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const PROMPTS = [
    "What is one small win you had today?",
    "What is something you learned today?",
    "How did you help someone today?",
    "What is something you could have done better?",
    "What are you looking forward to tomorrow?",
    "Who are you grateful for today and why?",
    "What was the most challenging part of your day?",
    "Did you take enough time for yourself today?",
    "What is one goal you want to focus on this week?",
    "How are you feeling right now, really?",
    "What gave you energy today? What drained it?",
    "What is a new habit you want to start?",
    "If you could relive one moment from today, what would it be?",
];

export default function DailyReflection() {
    const [currentPrompt, setCurrentPrompt] = useState(PROMPTS[0]);
    const [answer, setAnswer] = useState('');
    const [copied, setCopied] = useState(false);

    const getNewPrompt = () => {
        const randomIndex = Math.floor(Math.random() * PROMPTS.length);
        setCurrentPrompt(PROMPTS[randomIndex]);
        setAnswer('');
    };

    const copyToClipboard = () => {
        if (!answer.trim()) return;
        const text = `Daily Reflection:\n\nQ: ${currentPrompt}\nA: ${answer}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Daily Reflection Prompt | MiniTools by Spinotek</title>
                <meta name="description" content="Thoughtful prompts for personal growth and awareness." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Daily Reflection Prompt</h1>
                        <p className="text-slate-500 text-sm">Thoughtful prompts for personal growth and awareness.</p>
                    </div>
                </div>
                <button 
                    onClick={getNewPrompt}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 font-medium transition-colors"
                >
                    <Shuffle size={18} />
                    New Prompt
                </button>
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm relative">
                    <div className="mb-6">
                         <span className="text-cyan-600 font-bold uppercase tracking-wider text-xs mb-2 block">Today's Question</span>
                         <h2 className="text-2xl font-bold text-slate-800 leading-tight">
                            {currentPrompt}
                         </h2>
                    </div>

                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Write your thoughts here..."
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
                            {copied ? 'Copied!' : 'Copy to Clipboard'}
                        </button>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="daily-reflection" categoryId="productivity" />
        </ToolPageLayout>
    );
}
