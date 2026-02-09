import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Terminal, Search, Shield, Server, AlertTriangle, Loader, Globe, Database, Info } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

// Friendly names for common ports to make it easier to understand
const PORT_SERVICES = {
    21: 'FTP (File Transfer)',
    22: 'SSH (Secure Shell)',
    23: 'Telnet (Unencrypted Text)',
    25: 'SMTP (Email Sending)',
    53: 'DNS (Domain Name System)',
    80: 'HTTP (Web Server)',
    110: 'POP3 (Email Receiving)',
    143: 'IMAP (Email Receiving)',
    443: 'HTTPS (Secure Web)',
    3306: 'MySQL (Database)',
    3389: 'RDP (Remote Desktop)',
    5432: 'PostgreSQL (Database)',
    6379: 'Redis (Data Store)',
    8080: 'HTTP Proxy (Alt Web)',
    27017: 'MongoDB (Database)'
};

export default function PortScanner() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleScan = async () => {
        if (!input) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Step 1: Resolve Domain to IP
            let ip = input;
            const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(input);

            if (!isIp) {
                const dnsRes = await fetch(`https://dns.google/resolve?name=${input}`);
                const dnsData = await dnsRes.json();
                
                if (!dnsData.Answer || dnsData.Answer.length === 0) {
                    throw new Error('Could not find an IP address for this domain.');
                }
                
                const aRecord = dnsData.Answer.find(r => r.type === 1);
                if (!aRecord) throw new Error('No IP address found.');
                ip = aRecord.data;
            }

            // Step 2: Fetch Data
            const shodanRes = await fetch(`https://internetdb.shodan.io/${ip}`);
            
            if (!shodanRes.ok) {
                if (shodanRes.status === 404) {
                    throw new Error(`No open ports found for ${ip}. The host might be down or fully firewalled.`);
                }
                throw new Error('Could not fetch port data. Please try again.');
            }

            const data = await shodanRes.json();
            setResult({ ...data, query_ip: ip });

        } catch (err) {
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleScan();
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Port Scanner | MiniTools by Spinotek</title>
                <meta name="description" content="Check for open ports on a specific IP or domain." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Terminal size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Port Scanner</h1>
                        <p className="text-slate-500 text-sm">Check for open ports on a specific IP or domain.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <label className="block text-slate-700 font-bold mb-2">Target Address</label>
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="google.com" // Example needed
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-mono"
                            />
                        </div>

                        <button
                            onClick={handleScan}
                            disabled={loading || !input}
                            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                loading || !input
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'
                            }`}
                        >
                            {loading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
                            {loading ? 'Scanning...' : 'Scan Now'}
                        </button>

                   
                    </div>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm min-h-[400px]">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Server size={20} className="text-slate-400" />
                                Scan Results
                            </h3>
                            {result && (
                                <span className="bg-slate-200 text-slate-700 text-xs font-mono font-bold px-3 py-1 rounded-full">
                                    {result.query_ip}
                                </span>
                            )}
                        </div>

                        <div className="p-0">
                            {!result && !loading && !error && (
                                <div className="text-center text-slate-400 py-20 px-6">
                                    <Globe size={48} className="mx-auto mb-4 opacity-20" />
                                    <p className="font-medium">Enter a domain or IP (e.g. <code>google.com</code>) to scan.</p>
                                    <p className="text-sm mt-2 opacity-70">We'll check a public database to see what's open.</p>
                                </div>
                            )}

                            {loading && (
                                <div className="space-y-4 max-w-lg mx-auto py-12 px-6">
                                    <div className="flex justify-center mb-6">
                                        <Loader className="animate-spin text-blue-500" size={32} />
                                    </div>
                                    <p className="text-center text-slate-500 font-medium">Checking public records...</p>
                                </div>
                            )}

                            {error && (
                                <div className="p-8">
                                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl flex items-start gap-4">
                                        <AlertTriangle size={24} className="flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold mb-1">Scan Failed</h4>
                                            <p className="text-sm">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {result && (
                                <div>
                                    {/* Summary Header */}
                                    <div className="bg-emerald-50/50 p-6 border-b border-slate-100">
                                        <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                                            <Shield size={18} />
                                            Found {result.ports ? result.ports.length : 0} Open Ports
                                        </div>
                                        <p className="text-sm text-slate-600">
                                            These services are publicly accessible on the internet.
                                        </p>
                                    </div>

                                    {/* Ports List */}
                                    <div className="divide-y divide-slate-50">
                                        {result.ports && result.ports.length > 0 ? (
                                            result.ports.map(port => (
                                                <div key={port} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 font-mono font-bold flex items-center justify-center">
                                                            {port}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-800">
                                                                {PORT_SERVICES[port] || 'Unknown Service'}
                                                            </div>
                                                            <div className="text-xs text-slate-500">
                                                                TCP Protocol
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                                                        Open
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-8 text-center text-slate-500">
                                                No common open ports found. This is good!
                                            </div>
                                        )}
                                    </div>

                                    {/* Extra Info */}
                                    {result.hostnames && result.hostnames.length > 0 && (
                                        <div className="p-6 bg-slate-50 border-t border-slate-100">
                                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Associated Hostnames</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {result.hostnames.map(host => (
                                                    <span key={host} className="bg-white border border-slate-200 px-2 py-1 rounded text-xs text-slate-600 break-all">
                                                        {host}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="port-scanner" categoryId="security" />
        </ToolPageLayout>
    );
}