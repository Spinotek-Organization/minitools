import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Fingerprint, RefreshCw, Copy, CheckCircle2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function UuidGenerator() {
    const [count, setCount] = useState(5);
    const [uuids, setUuids] = useState([]);
    const [copied, setCopied] = useState(false);

    const generateUUIDs = () => {
        const newUuids = [];
        for (let i = 0; i < count; i++) {
            newUuids.push(crypto.randomUUID());
        }
        setUuids(newUuids);
        setCopied(false);
    };

    // Initial load
    React.useEffect(() => {
        generateUUIDs();
    }, [count]);

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>UUID Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Generate unique identifiers (UUID v4) for your applications." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-fuchsia-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Fingerprint size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">UUID Generator</h1>
                        <p className="text-slate-500 text-sm">Generate random UUID v4 identifiers.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Quantity ({count})</label>
                        <input 
                            type="range" 
                            min="1" 
                            max="50" 
                            value={count} 
                            onChange={(e) => setCount(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-fuchsia-600"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button 
                            onClick={generateUUIDs}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl transition-colors"
                        >
                            <RefreshCw size={18} /> Regenerate
                        </button>
                        <button 
                            onClick={copyAll}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                        >
                            {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                            {copied ? 'Copied!' : 'Copy All'}
                        </button>
                    </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm text-slate-600 h-96 overflow-y-auto custom-scrollbar">
                    {uuids.map((uuid, i) => (
                        <div key={i} className="py-1 border-b border-slate-200 last:border-0 border-dashed hover:text-fuchsia-600 transition-colors cursor-text select-all">
                            {uuid}
                        </div>
                    ))}
                </div>
            </div>

            <RelatedTools currentToolId="uuid-gen" categoryId="dev" />
        </ToolPageLayout>
    );
}
