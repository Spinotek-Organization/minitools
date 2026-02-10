import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Zap, Copy, Check, Shuffle, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const HOOKS = [
    { category: 'Educational', text: 'Stop doing [x] if you want to [y].' },
    { category: 'Educational', text: 'Here\'s the secret to [result] that no one tells you.' },
    { category: 'Educational', text: '3 websites that feel illegal to know.' },
    { category: 'Educational', text: 'I tried [x] so you don\'t have to.' },
    { category: 'Storytime', text: 'You won\'t believe what just happened to me.' },
    { category: 'Storytime', text: 'Have you ever felt like [emotion]? well...' },
    { category: 'Storytime', text: 'I made a huge mistake and here is what I learned.' },
    { category: 'Shocking', text: 'This is why you are failing at [topic].' },
    { category: 'Shocking', text: 'What if I told you everything you know about [x] is wrong?' },
    { category: 'Shocking', text: 'Do not scroll if you care about [topic].' },
    { category: 'Listicle', text: '5 tools I utilize every single day.' },
    { category: 'Listicle', text: 'Top 3 reasons why [x] is better than [y].' },
    { category: 'Listicle', text: 'The only [x] checklist you will ever need.' },
    { category: 'Relatable', text: 'POV: You finally figured out how to [x].' },
    { category: 'Relatable', text: 'Is it just me or does everyone struggle with [x]?' },
    { category: 'Behind the Scenes', text: 'Come with me to [event/place].' },
    { category: 'Behind the Scenes', text: 'A day in the life of a [job title].' },
    { category: 'Behind the Scenes', text: 'How we built [product] from scratch.' }
];

export default function TiktokHooks() {
    const [filter, setFilter] = useState('All');
    const [hooks, setHooks] = useState(HOOKS);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const categories = ['All', ...new Set(HOOKS.map(h => h.category))];

    const filterHooks = (cat) => {
        setFilter(cat);
        if (cat === 'All') {
            setHooks(HOOKS);
        } else {
            setHooks(HOOKS.filter(h => h.category === cat));
        }
    };

    const shuffleHooks = () => {
        const shuffled = [...hooks].sort(() => Math.random() - 0.5);
        setHooks(shuffled);
    };

    const copyHook = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>TikTok Viral Hook Ideas | MiniTools by Spinotek</title>
                <meta name="description" content="Discover high-performing hooks to make your short-form videos go viral." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Viral Hooks Database</h1>
                        <p className="text-slate-500">Stop the scroll with these proven opening lines.</p>
                    </div>
                </div>
                <button 
                    onClick={shuffleHooks}
                    className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold hover:bg-emerald-100 transition-colors flex items-center gap-2"
                >
                    <Shuffle size={20} /> Shuffle
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6">
                        <h3 className="font-bold text-slate-700 mb-4">Categories</h3>
                        <div className="space-y-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => filterHooks(cat)}
                                    className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                        filter === cat 
                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hooks Grid */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hooks.map((hook, index) => (
                            <div 
                                key={index} 
                                onClick={() => copyHook(hook.text, index)}
                                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-emerald-300 hover:shadow-emerald-50 transition-all cursor-pointer group relative active:scale-95"
                            >
                                <div className="absolute top-4 right-4 text-slate-300 group-hover:text-emerald-500 transition-colors">
                                    {copiedIndex === index ? <Check size={20} /> : <Copy size={20} />}
                                </div>
                                <span className="inline-block px-2 py-1 bg-slate-100 rounded-md text-[10px] uppercase font-bold text-slate-500 mb-3 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                    {hook.category}
                                </span>
                                <p className="font-bold text-slate-800 text-lg leading-relaxed pr-8">
                                    "{hook.text}"
                                </p>
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-emerald-500">
                                    Click to Copy
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="tiktok-hooks" categoryId="content" />
        </ToolPageLayout>
    );
}
