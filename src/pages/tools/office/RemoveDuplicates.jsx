import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Filter, Trash2, Copy, Check, Info } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function RemoveDuplicates() {
    const { t } = useTranslation('tools');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [trimWhitespace, setTrimWhitespace] = useState(true);
    const [copied, setCopied] = useState(false);

    const processText = () => {
        if (!input) {
            setOutput('');
            setStats({ original: 0, unique: 0, removed: 0 });
            return;
        }

        const lines = input.split('\n');
        const processedLines = lines.map(line => trimWhitespace ? line.trim() : line);

        let uniqueLines;
        if (caseSensitive) {
            uniqueLines = [...new Set(processedLines)];
        } else {
            // Use a map to keep the original casing of the first occurrence
            const seen = new Set();
            uniqueLines = processedLines.filter(line => {
                const lower = line.toLowerCase();
                if (seen.has(lower)) return false;
                seen.add(lower);
                return true;
            });
        }

        // Filter out empty lines if trimming is on (optional, but usually desired in dedupe)
        if (trimWhitespace) {
            uniqueLines = uniqueLines.filter(line => line !== '');
        }

        const result = uniqueLines.join('\n');
        setOutput(result);

        setStats({
            original: lines.length,
            unique: uniqueLines.length,
            removed: lines.length - uniqueLines.length
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout toolId="remove-duplicates">
            <Helmet>
                <title>{t('remove-duplicates.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('remove-duplicates.desc')} />
            </Helmet>

            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
                        <Filter size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('remove-duplicates.title')}</h1>
                        <p className="text-slate-500">{t('remove-duplicates.desc')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Column */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-full flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-700">{t('remove-duplicates.inputs.label')}</h3>
                                <button
                                    onClick={() => { setInput(''); setOutput(''); }}
                                    className="text-xs text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1"
                                >
                                    <Trash2 size={12} /> {t('remove-duplicates.inputs.clear')}
                                </button>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t('remove-duplicates.inputs.placeholder')}
                                className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm min-h-[400px]"
                            />
                        </div>
                    </div>

                    {/* Output Column */}
                    <div className="space-y-6">
                        {/* Controls */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex flex-wrap gap-6 mb-6">
                                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={caseSensitive}
                                        onChange={(e) => setCaseSensitive(e.target.checked)}
                                        className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
                                    />
                                    {t('remove-duplicates.options.case')}
                                </label>
                                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={trimWhitespace}
                                        onChange={(e) => setTrimWhitespace(e.target.checked)}
                                        className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
                                    />
                                    {t('remove-duplicates.options.trim')}
                                </label>
                            </div>
                            <button
                                onClick={processText}
                                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg shadow-rose-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <Filter size={18} /> {t('remove-duplicates.buttons.remove')}
                            </button>
                        </div>

                        {/* Result */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100%-140px)] min-h-[300px]">
                            <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {t('remove-duplicates.outputs.stats', { count: stats.unique })}
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
                                    {copied ? t('remove-duplicates.buttons.copied') : t('remove-duplicates.buttons.copy')}
                                </button>
                            </div>
                            <div className="flex-1 relative">
                                <textarea
                                    value={output}
                                    readOnly
                                    placeholder={t('remove-duplicates.outputs.placeholder')}
                                    className="absolute inset-0 w-full p-4 resize-none outline-none text-slate-700 text-sm bg-slate-50/30"
                                />
                            </div>
                        </div>

                        {/* Stats Footer */}
                        {stats.original > 0 && (
                            <div className="flex gap-4 text-xs text-slate-500 justify-center">
                                <span className="bg-slate-100 px-3 py-1 rounded-full">{t('remove-duplicates.stats.original', { count: stats.original })}</span>
                                <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-bold">{t('remove-duplicates.stats.removed', { count: stats.removed })}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-200 py-8">
                    <RelatedTools currentToolId="remove-duplicates" categoryId="office" />
                </div>
            </div>
        </ToolPageLayout>
    );
}
