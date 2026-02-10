import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Lightbulb, Copy, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function BusinessNameGenerator() {
    const [keyword, setKeyword] = useState('');
    const [style, setStyle] = useState('modern'); // modern, classic, tech
    const [generatedNames, setGeneratedNames] = useState([]);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const prefixes = {
        modern: ['Neo', 'Nova', 'Pro', 'Go', 'Up', 'On', 'In', 'Zu', 'Zen', 'Meta'],
        classic: ['The', 'Royal', 'Grand', 'Elite', 'Prime', 'Apex', 'Summit', 'Global', 'Ace', 'First'],
        tech: ['Cyber', 'Digi', 'Techno', 'Data', 'Info', 'Net', 'Sys', 'Soft', 'Byte', 'Pixel']
    };

    const suffixes = {
        modern: ['ify', 'ly', 'io', 'hq', 'co', 'lab', 'box', 'hub', 'flow', 'works'],
        classic: ['Corp', 'Inc', 'Solutions', 'Group', 'Partners', 'Ventures', 'Holdings', 'Consulting', 'Agency', 'Enterprises'],
        tech: ['wizz', 'ware', 'sys', 'net', 'bot', 'cloud', 'stack', 'node', 'logic', 'base']
    };

    const generateNames = () => {
        if (!keyword) return;

        const results = [];
        const currentPrefixes = prefixes[style];
        const currentSuffixes = suffixes[style];

        // 1. Prefix + Keyword
        for (let i = 0; i < 5; i++) {
            const prefix = currentPrefixes[Math.floor(Math.random() * currentPrefixes.length)];
            results.push(`${prefix}${keyword}`);
        }

        // 2. Keyword + Suffix
        for (let i = 0; i < 5; i++) {
            const suffix = currentSuffixes[Math.floor(Math.random() * currentSuffixes.length)];
            results.push(`${keyword}${suffix}`);
        }

        // 3. Keyword + Keyword (if short)
        if (keyword.length < 6) {
             results.push(`${keyword}${keyword}`);
        }

        // 4. Style specific
        if (style === 'modern') {
            results.push(`${keyword}Space`);
            results.push(`My${keyword}`);
        } else if (style === 'tech') {
            results.push(`i${keyword}`);
            results.push(`${keyword}App`);
        }

        // Shuffle
        setGeneratedNames(results.sort(() => 0.5 - Math.random()));
    };

    const copyToClipboard = (name, index) => {
        navigator.clipboard.writeText(name);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Business Name Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Generate catchy, brandable business names instantly." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Lightbulb size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Business Name Generator</h1>
                        <p className="text-slate-500 text-sm">Generate catchy, brandable business names instantly.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">Brainstorming Details</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Main Keyword</label>
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && generateNames()}
                                placeholder="e.g. Coffee, Code, Design"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Naming Style</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button 
                                    onClick={() => setStyle('modern')}
                                    className={`py-3 rounded-xl text-sm font-bold border transition-all ${style === 'modern' ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    Modern
                                    <span className="block text-[10px] font-normal opacity-70">Short, catchy</span>
                                </button>
                                <button 
                                    onClick={() => setStyle('classic')}
                                     className={`py-3 rounded-xl text-sm font-bold border transition-all ${style === 'classic' ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    Classic
                                    <span className="block text-[10px] font-normal opacity-70">Professional, trusty</span>
                                </button>
                                <button 
                                    onClick={() => setStyle('tech')}
                                     className={`py-3 rounded-xl text-sm font-bold border transition-all ${style === 'tech' ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    Tech
                                    <span className="block text-[10px] font-normal opacity-70">Futuristic, geeky</span>
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={generateNames}
                            disabled={!keyword}
                            className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <Lightbulb size={20} />
                            Generate Ideas
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 min-h-[300px]">
                    {!generatedNames.length ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                            <Lightbulb size={48} className="mb-4" />
                            <p className="font-medium text-center">Enter a keyword and hit generate<br/>to see magic happen!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {generatedNames.map((name, index) => (
                                <div key={index} className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between border border-slate-100">
                                    <span className="font-bold text-slate-800 text-lg capitalize">{name}</span>
                                    <button
                                        onClick={() => copyToClipboard(name, index)}
                                        className="text-slate-400 hover:text-amber-600 p-2 rounded-lg hover:bg-amber-50 transition-colors"
                                        title="Copy name"
                                    >
                                        {copiedIndex === index ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <RelatedTools currentToolId="biz-name-gen" categoryId="biz" />
        </ToolPageLayout>
    );
}
