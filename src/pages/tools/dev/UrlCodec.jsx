import { useState } from 'react';
import { Copy, Trash2, CheckCircle, Globe, AlertCircle, RefreshCw } from 'lucide-react';
import Card from '../../../components/shared/Card';
import { Helmet } from 'react-helmet-async';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function UrlCodec() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleProcess = () => {
        try {
            if (!input.trim()) {
                setOutput('');
                setError(null);
                return;
            }

            if (mode === 'encode') {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
            setError(null);
        } catch (e) {
            setError(e.message);
            setOutput('');
        }
    };

    const toggleMode = () => {
        setMode(mode === 'encode' ? 'decode' : 'encode');
        input && setInput(output);
        output && setOutput(input);
        setError(null);
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
            <Helmet>
                <title>URL Encoder & Decoder | Mini Tools by Spinotek</title>
                <meta name="description" content="Properly encode or decode URLs for web compatibility instantly." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">URL {mode === 'encode' ? 'Encoder' : 'Decoder'}</h1>
                        <p className="text-slate-500 text-sm">Safe URL formatting for web developers.</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={clear}
                        className="flex items-center gap-2 px-4 py-2 text-slate-400 font-bold hover:text-slate-600 transition-colors"
                    >
                        <Trash2 size={18} />
                        Clear
                    </button>
                    <button
                        onClick={toggleMode}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
                    >
                        <RefreshCw size={18} className={mode === 'decode' ? 'rotate-180 transition-transform' : ''} />
                        Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
                    </button>
                    <button
                        onClick={handleProcess}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                    >
                        Process
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                {/* Input Area */}
                <Card noPadding className="flex flex-col">
                    <div className="px-6 py-3 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            {mode === 'encode' ? 'Raw URL Input' : 'Encoded URL Input'}
                        </span>
                    </div>
                    <textarea
                        className="flex-grow p-6 font-mono text-sm resize-none focus:ring-0 outline-none text-slate-700 bg-transparent"
                        placeholder={mode === 'encode' ? 'Type or paste URL to encode...' : 'Paste encoded URL to decode...'}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </Card>

                {/* Output Area */}
                <Card dark noPadding className="flex flex-col relative">
                    <div className="px-6 py-3 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
                        </span>
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
                                    <p className="text-red-400 font-bold uppercase tracking-widest text-[10px] mb-1">Error</p>
                                    <p className="text-slate-400 text-xs max-w-[250px]">{error}</p>
                                </div>
                            </div>
                        ) : output ? (
                            <pre className="whitespace-pre-wrap break-all leading-relaxed">{output}</pre>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-700 italic text-xs">
                                Result will appear here...
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            <div className="mt-8">
                <Card className="bg-blue-50/50 border-blue-100">
                    <h3 className="text-sm font-bold text-blue-900 mb-2">Usage Tip</h3>
                    <p className="text-xs text-blue-700 leading-relaxed">
                        URL encoding converts characters into a format that can be transmitted over the Internet.
                        Characters like space, ampersand, and question marks have special meanings and need to be encoded
                        if they are part of a query string parameter.
                    </p>
                </Card>
            </div>

            <RelatedTools currentToolId="url-enc" categoryId="dev" />
        </ToolPageLayout>
    );
}
