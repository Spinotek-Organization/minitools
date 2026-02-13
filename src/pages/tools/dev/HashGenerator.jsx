import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hash, Copy, CheckCircle2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function HashGenerator() {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const [hashes, setHashes] = useState({ sha1: '', sha256: '', sha512: '' });
    const [copied, setCopied] = useState(null);

    const generateHashes = async (text) => {
        if (!text) {
            setHashes({ sha1: '', sha256: '', sha512: '' });
            return;
        }
        
        const encode = new TextEncoder().encode(text);
        
        const bufSHA1 = await crypto.subtle.digest('SHA-1', encode);
        const bufSHA256 = await crypto.subtle.digest('SHA-256', encode);
        const bufSHA512 = await crypto.subtle.digest('SHA-512', encode);

        const toHex = (buf) => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');

        setHashes({
            sha1: toHex(bufSHA1),
            sha256: toHex(bufSHA256),
            sha512: toHex(bufSHA512)
        });
    };

    const handleInput = (e) => {
        const val = e.target.value;
        setInput(val);
        generateHashes(val);
    };

    const copyToClipboard = (text, type) => {
        if(!text) return;
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.hash-gen.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.hash-gen.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Hash size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.hash-gen.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.hash-gen.subtitle')}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.hash-gen.inputLabel')}</label>
                <textarea 
                    value={input}
                    onChange={handleInput}
                    placeholder={t('tools.hash-gen.placeholder')}
                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-6"
                />

                <div className="space-y-4">
                    {/* SHA-1 */}
                    <div className="relative group">
                        <div className="flex justify-between mb-1">
                             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">SHA-1</label>
                             <button onClick={() => copyToClipboard(hashes.sha1, 'sha1')} className="text-slate-400 hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-all">
                                 {copied === 'sha1' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                             </button>
                        </div>
                        <input 
                            readOnly 
                            value={hashes.sha1} 
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-600 focus:outline-none select-all"
                        />
                    </div>

                    {/* SHA-256 */}
                    <div className="relative group">
                        <div className="flex justify-between mb-1">
                             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">SHA-256</label>
                             <button onClick={() => copyToClipboard(hashes.sha256, 'sha256')} className="text-slate-400 hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-all">
                                 {copied === 'sha256' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                             </button>
                        </div>
                        <input 
                            readOnly 
                            value={hashes.sha256} 
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-600 focus:outline-none select-all"
                        />
                    </div>

                    {/* SHA-512 */}
                    <div className="relative group">
                        <div className="flex justify-between mb-1">
                             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">SHA-512</label>
                             <button onClick={() => copyToClipboard(hashes.sha512, 'sha512')} className="text-slate-400 hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-all">
                                 {copied === 'sha512' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                             </button>
                        </div>
                        <textarea 
                            readOnly 
                            value={hashes.sha512} 
                            rows={2}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-600 focus:outline-none select-all resize-none"
                        />
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="hash-gen" categoryId="dev" />
        </ToolPageLayout>
    );
}
