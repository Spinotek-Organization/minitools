import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Zap, Copy, Check, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SlugGenerator() {
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
        <ToolPageLayout>
            <Helmet>
                <title>Slug Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Convert any text into a URL-friendly slug." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Slug Generator</h1>
                        <p className="text-slate-500 text-sm">Convert any text into a URL-friendly slug instantly.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Input */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Input Text</label>
                        <textarea
                             value={input}
                             onChange={(e) => setInput(e.target.value)}
                             placeholder="Type your title here..."
                             className="w-full h-40 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-500 text-lg font-medium resize-none"
                        />
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4">Options</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <span className="text-sm font-bold text-slate-600">Separator</span>
                                <div className="flex bg-slate-200 p-1 rounded-lg">
                                    <button 
                                        onClick={() => setSeparator('-')}
                                        className={`w-10 h-8 rounded-md font-mono font-bold text-lg flex items-center justify-center transition-all ${separator === '-' ? 'bg-white shadow-sm text-yellow-600' : 'text-slate-500'}`}
                                    >
                                        -
                                    </button>
                                    <button 
                                        onClick={() => setSeparator('_')}
                                        className={`w-10 h-8 rounded-md font-mono font-bold text-lg flex items-center justify-center transition-all ${separator === '_' ? 'bg-white shadow-sm text-yellow-600' : 'text-slate-500'}`}
                                    >
                                        _
                                    </button>
                                </div>
                            </div>
                            
                            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                                <span className="text-sm font-bold text-slate-600">Remove Numbers</span>
                                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${removeNumbers ? 'bg-yellow-500' : 'bg-slate-300'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${removeNumbers ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                                <input type="checkbox" checked={removeNumbers} onChange={() => setRemoveNumbers(!removeNumbers)} className="hidden" />
                            </label>

                             <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                                <span className="text-sm font-bold text-slate-600">Remove Stop Words (a, the, and...)</span>
                                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${removeStopWords ? 'bg-yellow-500' : 'bg-slate-300'}`}>
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${removeStopWords ? 'translate-x-6' : 'translate-x-0'}`} />
                                </div>
                                <input type="checkbox" checked={removeStopWords} onChange={() => setRemoveStopWords(!removeStopWords)} className="hidden" />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-yellow-50 border border-yellow-100 p-8 rounded-3xl flex flex-col justify-center h-full">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Generated Slug</h3>
                    
                    <div className="min-h-[120px] mb-8 break-all font-mono text-2xl font-bold text-slate-800 leading-relaxed">
                        {slug || <span className="text-slate-300">your-slug-will-appear-here</span>}
                    </div>

                    <button
                        onClick={handleCopy}
                        disabled={!slug}
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            slug 
                                ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg shadow-yellow-200 hover:-translate-y-1' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                    >
                        {copied ? <Check size={24} /> : <Copy size={24} />}
                        {copied ? 'COPIED!' : 'COPY SLUG'}
                    </button>
                </div>
            </div>

            <RelatedTools currentToolId="slug-gen" categoryId="marketing" />
        </ToolPageLayout>
    );
}
