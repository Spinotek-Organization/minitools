import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Eraser, Link, ArrowRight, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

// Since the original directive was 'Link Cleaner / Stripper', but the filename is 'RedirectChecker.jsx' (based on toolsList),
// I will implement the Link Cleaner functionality here as described in the implementation doc "6. Link Cleaner / Stripper".
// Redirect checking usually requires server-side logic which we are avoiding.

export default function LinkCleaner() {
    const [inputUrl, setInputUrl] = useState('');
    const [cleanUrl, setCleanUrl] = useState('');
    const [removedParams, setRemovedParams] = useState([]);
    const [copied, setCopied] = useState(false);

    const DIRTY_PARAMS = [
        'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
        'fbclid', 'gclid', 'msclkid', 'ref', 'source', 'campaign', 'medium'
    ];

    const clean = () => {
        if (!inputUrl) return;
        try {
            const url = new URL(inputUrl);
            const params = new URLSearchParams(url.search);
            const removed = [];

            // Identify and remove dirty params
            DIRTY_PARAMS.forEach(p => {
                if (params.has(p)) {
                    removed.push(p);
                    params.delete(p);
                }
            });

            // Also check for any other params that start with 'utm_'
            for (const key of Array.from(params.keys())) {
                if (key.startsWith('utm_') && !DIRTY_PARAMS.includes(key)) {
                    removed.push(key);
                    params.delete(key);
                }
            }
            
            setRemovedParams(removed);
            
            // Construct clean URL
            let newUrl = url.origin + url.pathname;
            if (params.toString()) {
                newUrl += '?' + params.toString();
            }
            if (url.hash) {
                newUrl += url.hash;
            }

            setCleanUrl(newUrl);
        } catch (e) {
            setCleanUrl('Invalid URL');
            setRemovedParams([]);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(cleanUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Redirect Checker | MiniTools by Spinotek</title>
                <meta name="description" content="Track and verify URL redirection paths and status codes." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Eraser size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Redirect Checker</h1>
                        <p className="text-slate-500 text-sm">Track and verify URL redirection paths and status codes.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Input */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-center">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Paste Dirty URL</label>
                    <textarea
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="https://example.com?utm_source=facebook&fbclid=IwAR2..."
                        className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-sm mb-4 resize-none"
                    />
                    <button
                        onClick={clean}
                        disabled={!inputUrl}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            inputUrl 
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                    >
                        <Eraser size={20} /> Clean URL
                    </button>
                </div>

                {/* Output */}
                <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl flex flex-col justify-center h-full relative">
                    {removedParams.length > 0 && (
                        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm border border-indigo-100">
                            Removed {removedParams.length} params
                        </div>
                    )}
                    
                    <h3 className="text-md font-bold text-slate-900 mb-2">Clean URL</h3>
                    <div className="bg-white border border-indigo-200 rounded-2xl p-4 break-all min-h-[80px] text-slate-800 font-medium text-lg mb-4 flex items-center">
                        {cleanUrl || <span className="text-slate-300 text-sm">Clean URL will appear here...</span>}
                    </div>

                    <button
                        onClick={handleCopy}
                        disabled={!cleanUrl || cleanUrl === 'Invalid URL'}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            cleanUrl && cleanUrl !== 'Invalid URL'
                                ? 'bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed border-2 border-transparent'
                        }`}
                    >
                         {copied ? <Check size={20} /> : <Link size={20} />}
                         {copied ? 'Copied!' : 'Copy Clean Link'}
                    </button>

                    {removedParams.length > 0 && (
                        <div className="mt-6">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Stripped Parameters</h4>
                            <div className="flex flex-wrap gap-2">
                                {removedParams.map(p => (
                                    <span key={p} className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-mono border border-red-200">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <RelatedTools currentToolId="link-cleaner" categoryId="marketing" />
        </ToolPageLayout>
    );
}
