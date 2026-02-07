import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ListOrdered, ArrowDownAZ, ArrowUpZA, ArrowRight, Trash2, Copy, Check, Info } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SortList() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState({ lines: 0, time: 0 });
    const [copied, setCopied] = useState(false);

    // Sort Options
    const [order, setOrder] = useState('asc'); // asc, desc, random, length, reverseL
    const [ignoreCase, setIgnoreCase] = useState(true);
    const [removeDuplicates, setRemoveDuplicates] = useState(false);
    const [trimLines, setTrimLines] = useState(true);
    const [removeEmpty, setRemoveEmpty] = useState(true);
    const [numericSort, setNumericSort] = useState(false);

    const sortInput = () => {
        if (!input) {
            setOutput('');
            setStats({ lines: 0, time: 0 });
            return;
        }

        const start = performance.now();
        let lines = input.split('\n');

        if (trimLines) {
            lines = lines.map(line => line.trim());
        }

        if (removeEmpty) {
            lines = lines.filter(line => line !== '');
        }

        if (removeDuplicates) {
            if (ignoreCase) {
                // Determine uniqueness based on lowercase, but keep original casing
                const seen = new Set();
                lines = lines.filter(line => {
                    const lower = line.toLowerCase();
                    if (seen.has(lower)) return false;
                    seen.add(lower);
                    return true;
                });
            } else {
                lines = [...new Set(lines)];
            }
        }

        const collator = new Intl.Collator(undefined, {
            numeric: numericSort,
            sensitivity: ignoreCase ? 'base' : 'variant'
        });

        switch (order) {
            case 'asc':
                lines.sort(collator.compare);
                break;
            case 'desc':
                lines.sort((a, b) => collator.compare(b, a));
                break;
            case 'length':
                lines.sort((a, b) => a.length - b.length || collator.compare(a, b));
                break;
            case 'reverseL':
                lines.sort((a, b) => b.length - a.length || collator.compare(a, b));
                break;
            case 'random':
                for (let i = lines.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [lines[i], lines[j]] = [lines[j], lines[i]];
                }
                break;
            default:
                break;
        }

        const result = lines.join('\n');
        const end = performance.now();

        setOutput(result);
        setStats({ lines: lines.length, time: (end - start).toFixed(2) });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Alphabetical List Sorter | MiniTools by Spinotek</title>
                <meta name="description" content="Sort lists alphabetically, by length, or randomize. Remove duplicates and clean up text instantly." />
            </Helmet>

            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
                        <ListOrdered size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">List Sorter</h1>
                        <p className="text-slate-500">Organize your lists alphabetically or numerically.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Column */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-full flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-700">Input List</h3>
                                <button
                                    onClick={() => { setInput(''); setOutput(''); }}
                                    className="text-xs text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1"
                                >
                                    <Trash2 size={12} /> Clear
                                </button>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Paste your list here..."
                                className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-sm min-h-[400px]"
                            />
                        </div>
                    </div>

                    {/* Output Column */}
                    <div className="space-y-6">
                        {/* Controls */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="space-y-3">
                                    <label className="block text-xs font-bold text-slate-400 uppercase">Sort Order</label>
                                    <select
                                        value={order}
                                        onChange={(e) => setOrder(e.target.value)}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-sky-500/20"
                                    >
                                        <option value="asc">A to Z (Ascending)</option>
                                        <option value="desc">Z to A (Descending)</option>
                                        <option value="length">Length (Short to Long)</option>
                                        <option value="reverseL">Length (Long to Short)</option>
                                        <option value="random">Randomize (Shuffle)</option>
                                    </select>
                                </div>
                                <div className="space-y-2 pt-6">
                                    <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer select-none">
                                        <input type="checkbox" checked={numericSort} onChange={(e) => setNumericSort(e.target.checked)} className="rounded text-sky-600 focus:ring-sky-500" />
                                        Numeric Sort (1, 2, 10...)
                                    </label>
                                    <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer select-none">
                                        <input type="checkbox" checked={removeDuplicates} onChange={(e) => setRemoveDuplicates(e.target.checked)} className="rounded text-sky-600 focus:ring-sky-500" />
                                        Remove Duplicates
                                    </label>
                                </div>
                            </div>

                            <button
                                onClick={sortInput}
                                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg shadow-sky-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <ArrowDownAZ size={18} /> Sort List
                            </button>
                        </div>

                        {/* Result */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100%-240px)] min-h-[300px]">
                            <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {stats.lines} Items Sorted
                                </span>
                                <button
                                    onClick={handleCopy}
                                    disabled={!output}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${copied
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50'
                                        }`}
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <div className="flex-1 relative">
                                <textarea
                                    value={output}
                                    readOnly
                                    placeholder="Sorted list will appear here..."
                                    className="absolute inset-0 w-full p-4 resize-none outline-none text-slate-700 text-sm bg-slate-50/30 font-mono"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-200 py-8">
                    <RelatedTools currentToolId="sort-list" categoryId="office" />
                </div>
            </div>
        </ToolPageLayout>
    );
}
