import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, AlertCircle, CheckCircle2, Copy } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function JWTDebugger() {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState(null);
    const [payload, setPayload] = useState(null);
    const [signature, setSignature] = useState(null);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        if (!token.trim()) {
            setHeader(null);
            setPayload(null);
            setSignature(null);
            setError(null);
            return;
        }

        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format (must have 3 parts).');
            }

            const decodePart = (part) => {
                const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload);
            };

            const h = decodePart(parts[0]);
            const p = decodePart(parts[1]);

            setHeader(JSON.stringify(h, null, 2));
            setPayload(JSON.stringify(p, null, 2));
            setSignature(parts[2]);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Invalid token. Could not decode.');
            setHeader(null);
            setPayload(null);
            setSignature(null);
        }
    }, [token]);

    const copyToClipboard = (text, type) => {
        if(!text) return;
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>JWT Debugger | MiniTools by Spinotek</title>
                <meta name="description" content="Decode and inspect JSON Web Tokens safely." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">JWT Debugger</h1>
                        <p className="text-slate-500 text-sm">Decode and inspect JSON Web Tokens safely.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm mb-8">
                <textarea 
                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" 
                    placeholder="Paste your JWT here (e.g. eyJhbGciOi...)"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm font-medium">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}
            </div>

            {(header || payload) && (
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900">Header</h3>
                            <button onClick={() => copyToClipboard(header, 'header')} className="text-slate-400 hover:text-violet-600 transition-colors">
                                {copied === 'header' ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                            </button>
                        </div>
                        <pre className="p-6 text-xs md:text-sm font-mono text-slate-600 overflow-auto whitespace-pre-wrap h-64">{header}</pre>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900">Payload</h3>
                            <button onClick={() => copyToClipboard(payload, 'payload')} className="text-slate-400 hover:text-violet-600 transition-colors">
                                {copied === 'payload' ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                            </button>
                        </div>
                        <pre className="p-6 text-xs md:text-sm font-mono text-slate-600 overflow-auto whitespace-pre-wrap h-64">{payload}</pre>
                    </div>
                </div>
            )}
            
            {(signature) && (
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm mb-8">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-900">Signature</h3>
                    </div>
                    <div className="p-6 break-all font-mono text-xs md:text-sm text-violet-600 bg-violet-50">
                        {signature}
                    </div>
                </div>
            )}

            <RelatedTools currentToolId="jwt-debug" categoryId="dev" />
        </ToolPageLayout>
    );
}
