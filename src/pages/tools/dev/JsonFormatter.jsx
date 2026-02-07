import { useState } from 'react';
import { Copy, Trash2, CheckCircle, FileJson, AlertCircle } from 'lucide-react';
import Card from '../../../components/shared/Card';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
            setError(null);
        } catch (e) {
            setError(e.message);
            setOutput('');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clear = () => {
        setInput('');
        setOutput('');
        setError(null);
    };

    return (
        <ToolPageLayout>
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <FileJson size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">JSON Formatter</h1>
                        <p className="text-slate-500 text-sm">Clean and validate your JSON data instantly.</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={clear}
                        className="flex items-center gap-2 px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <Trash2 size={18} />
                        Clear
                    </button>
                    <button
                        onClick={formatJson}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                    >
                        Format JSON
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
                {/* Input Area */}
                <Card noPadding className="flex flex-col">
                    <div className="px-6 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Raw Input</span>
                    </div>
                    <textarea
                        className="flex-grow p-6 font-mono text-sm resize-none focus:ring-0 outline-none text-slate-700 bg-transparent"
                        placeholder='Paste your JSON here (e.g., {"name":"John", "age":30})'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </Card>

                {/* Output Area */}
                <Card dark noPadding className="flex flex-col relative">
                    <div className="px-6 py-3 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">Formatted Result</span>
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className={`flex items-center gap-2 text-xs font-bold transition-colors ${copied ? 'text-green-400' : 'text-slate-400 hover:text-white'}`}
                            >
                                {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        )}
                    </div>

                    <div className="flex-grow p-6 font-mono text-sm overflow-auto text-blue-300">
                        {error ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                                    <AlertCircle size={24} />
                                </div>
                                <div>
                                    <p className="text-red-400 font-bold uppercase tracking-widest text-[10px] mb-1">Invalid JSON</p>
                                    <p className="text-slate-400 text-xs max-w-[250px]">{error}</p>
                                </div>
                            </div>
                        ) : output ? (
                            <pre className="whitespace-pre-wrap leading-relaxed">{output}</pre>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-600 italic">
                                Formatted output will appear here...
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            <RelatedTools currentToolId="json-fmt" categoryId="dev" />
        </ToolPageLayout>
    );
}
