import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { EyeOff, Lock, Unlock, Copy, AlertCircle, CheckCircle2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SecretNote() {
    const [mode, setMode] = useState('encrypt'); // 'encrypt' or 'decrypt'
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState({ type: '', msg: '' });

    // Helper: Convert string to buffer
    const str2ab = (str) => new TextEncoder().encode(str);
    
    // Helper: Buffer to Base64
    const ab2base64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
    
    // Helper: Base64 to Buffer
    const base642ab = (base64) => {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };

    const deriveKey = async (password, salt) => {
        const enc = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
            "raw", 
            enc.encode(password), 
            { name: "PBKDF2" }, 
            false, 
            ["deriveKey"]
        );
        
        return window.crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: salt,
                iterations: 100000,
                hash: "SHA-256"
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt", "decrypt"]
        );
    };

    const handleEncrypt = async () => {
        setStatus({ type: '', msg: '' });
        if (!input || !password) {
            setStatus({ type: 'error', msg: 'Please enter both a message and a password.' });
            return;
        }

        try {
            const salt = window.crypto.getRandomValues(new Uint8Array(16));
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            const key = await deriveKey(password, salt);
            
            const encrypted = await window.crypto.subtle.encrypt(
                { name: "AES-GCM", iv: iv },
                key,
                str2ab(input)
            );

            const combined = new Uint8Array(salt.byteLength + iv.byteLength + encrypted.byteLength);
            combined.set(salt, 0);
            combined.set(iv, salt.byteLength);
            combined.set(new Uint8Array(encrypted), salt.byteLength + iv.byteLength);

            setOutput(ab2base64(combined));
            setStatus({ type: 'success', msg: 'Message encrypted successfully!' });
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', msg: 'Encryption failed. Please try again.' });
        }
    };

    const handleDecrypt = async () => {
        setStatus({ type: '', msg: '' });
        if (!input || !password) {
            setStatus({ type: 'error', msg: 'Please enter the encrypted text and password.' });
            return;
        }

        try {
            const combined = new Uint8Array(base642ab(input));
            
            // Extract parts
            const salt = combined.slice(0, 16);
            const iv = combined.slice(16, 28);
            const data = combined.slice(28);

            const key = await deriveKey(password, salt);
            
            const decrypted = await window.crypto.subtle.decrypt(
                { name: "AES-GCM", iv: iv },
                key,
                data
            );
            
            setOutput(new TextDecoder().decode(decrypted));
            setStatus({ type: 'success', msg: 'Message decrypted successfully!' });
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', msg: 'Decryption failed. Wrong password or corrupted data.' });
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setStatus({ type: 'success', msg: 'Copied to clipboard!' });
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Secret Note | MiniTools by Spinotek</title>
                <meta name="description" content="Create encrypted notes that self-destruct after being read." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <EyeOff size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Secret Note</h1>
                        <p className="text-slate-500 text-sm">Create encrypted notes that self-destruct after being read.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Main Interaction Area */}
                <div className="lg:col-span-3 space-y-6">
                    
                    {/* Mode Toggle */}
                    <div className="flex p-1 bg-slate-100 rounded-xl w-fit">
                        <button
                            onClick={() => { setMode('encrypt'); setInput(''); setOutput(''); setStatus({}); }}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${mode === 'encrypt' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Lock size={16} />
                            Encrypt Mode
                        </button>
                        <button
                            onClick={() => { setMode('decrypt'); setInput(''); setOutput(''); setStatus({}); }}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${mode === 'decrypt' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Unlock size={16} />
                            Decrypt Mode
                        </button>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">
                                    {mode === 'encrypt' ? 'Message to Encrypt' : 'Encrypted Text'}
                                </label>
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={mode === 'encrypt' ? "Type your secret message here..." : "Paste the encrypted text string here..."}
                                    className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none font-mono text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 font-bold mb-2">Password / Key</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter a strong password"
                                    className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all bg-slate-50"
                                />
                            </div>

                            <button
                                onClick={mode === 'encrypt' ? handleEncrypt : handleDecrypt}
                                className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${mode === 'encrypt' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                            >
                                {mode === 'encrypt' ? <Lock size={18} /> : <Unlock size={18} />}
                                {mode === 'encrypt' ? 'Encrypt Message' : 'Decrypt Message'}
                            </button>
                        </div>
                    </div>

                    {/* Output Section */}
                    {output && (
                        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 relative animation-fade-in">
                            <label className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                                {mode === 'encrypt' ? 'Encrypted Result (Share this)' : 'Decrypted Message'}
                            </label>
                            <div className="bg-white border border-slate-200 rounded-xl p-4 font-mono text-sm break-all text-slate-700 max-h-48 overflow-y-auto">
                                {output}
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Copy to Clipboard"
                            >
                                <Copy size={20} />
                            </button>
                        </div>
                    )}

                    {status.msg && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                            {status.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                            {status.msg}
                        </div>
                    )}
                </div>
            </div>

            <RelatedTools currentToolId="secret-note" categoryId="security" />
        </ToolPageLayout>
    );
}
