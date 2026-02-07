import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Replace, ArrowRightLeft, Type, Copy, Check, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function BatchReplace() {
    const [inputText, setInputText] = useState('');
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [stats, setStats] = useState({ replacements: 0, textLength: 0 });
    const [options, setOptions] = useState({
        caseSensitive: false,
        useRegex: false,
        wholeWord: false,
    });
    const [copied, setCopied] = useState(false);

    const handleReplace = () => {
        if (!inputText || !findText) {
            setOutputText(inputText);
            setStats({ replacements: 0, textLength: inputText.length });
            return;
        }

        let flags = 'g';
        if (!options.caseSensitive) flags += 'i';

        let pattern = findText;
        if (!options.useRegex) {
            // Escape special regex characters if not using regex mode
            pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        if (options.wholeWord && !options.useRegex) {
            pattern = `\\b${pattern}\\b`;
        }

        try {
            const regex = new RegExp(pattern, flags);
            const matches = inputText.match(regex);
            const count = matches ? matches.length : 0;
            const newText = inputText.replace(regex, replaceText);

            setOutputText(newText);
            setStats({ replacements: count, textLength: newText.length });
        } catch (e) {
            // Invalid regex handling
            setOutputText(inputText);
            alert('Invalid Regex Pattern: ' + e.message);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Batch Search & Replace | Mini Tools by Spinotek</title>
                <meta name="description" content="Find and replace text across multiple lines. Supports Case Sensitivity, Whole Words, and Regular Expressions." />
            </Helmet>

            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                        <Replace size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Batch Search & Replace</h1>
                        <p className="text-slate-500">Quickly modify text with advanced find/replace options.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Input Column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* INPUT BOX */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Type size={16} className="text-emerald-500" /> Source Text
                            </h3>
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Paste your text here..."
                                className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                            />
                        </div>

                        {/* CONTROLS */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Find</label>
                                    <input
                                        type="text"
                                        value={findText}
                                        onChange={(e) => setFindText(e.target.value)}
                                        placeholder="Text to find..."
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <ArrowRightLeft size={20} className="text-slate-300 rotate-90" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Replace With</label>
                                    <input
                                        type="text"
                                        value={replaceText}
                                        onChange={(e) => setReplaceText(e.target.value)}
                                        placeholder="Replacement text..."
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                                    />
                                </div>

                                <div className="py-2 space-y-2">
                                    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={options.caseSensitive}
                                            onChange={(e) => setOptions({ ...options, caseSensitive: e.target.checked })}
                                            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                                        />
                                        Match Case
                                    </label>
                                    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={options.wholeWord}
                                            onChange={(e) => setOptions({ ...options, wholeWord: e.target.checked })}
                                            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                                            disabled={options.useRegex}
                                        />
                                        Whole Words Only
                                    </label>
                                    <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={options.useRegex}
                                            onChange={(e) => setOptions({ ...options, useRegex: e.target.checked })}
                                            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                                        />
                                        Use Regular Expressions (Regex)
                                    </label>
                                </div>

                                <button
                                    onClick={handleReplace}
                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    <RefreshCw size={18} /> Replace All
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Output Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col min-h-[500px]">
                            {/* Toolbar */}
                            <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        Result
                                    </span>
                                    {stats.replacements > 0 && (
                                        <span className="bg-emerald-100 text-emerald-700 pk-2 py-0.5 rounded text-xs font-bold px-2">
                                            {stats.replacements} replacements made
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={handleCopy}
                                    disabled={!outputText}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${copied
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed'
                                        }`}
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                    {copied ? 'Copied!' : 'Copy Result'}
                                </button>
                            </div>

                            {/* Text Area */}
                            <textarea
                                value={outputText}
                                readOnly
                                placeholder="Modified text will appear here..."
                                className="flex-1 w-full p-8 resize-none outline-none text-slate-700 text-sm leading-relaxed font-mono bg-slate-50/30"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-200 py-8">
                    <RelatedTools currentToolId="text-replace" categoryId="office" />
                </div>
            </div>
        </ToolPageLayout>
    );
}
