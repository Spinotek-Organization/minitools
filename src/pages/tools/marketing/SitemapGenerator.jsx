import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileCode, Download, Copy, Check, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SitemapGenerator() {
    const [urls, setUrls] = useState('');
    const [priority, setPriority] = useState('0.8');
    const [freq, setFreq] = useState('weekly');
    const [lastMod, setLastMod] = useState(new Date().toISOString().split('T')[0]);
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    const generateSitemap = () => {
        const urlList = urls.split('\n').map(u => u.trim()).filter(u => u);
        
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

        urlList.forEach(url => {
            const cleanUrl = url.replace(/&/g, '&amp;')
                               .replace(/'/g, '&apos;')
                               .replace(/"/g, '&quot;')
                               .replace(/>/g, '&gt;')
                               .replace(/</g, '&lt;');

            xml += `   <url>
      <loc>${cleanUrl}</loc>
      <lastmod>${lastMod}</lastmod>
      <changefreq>${freq}</changefreq>
      <priority>${priority}</priority>
   </url>
`;
        });

        xml += `</urlset>`;
        setResult(xml);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([result], {type: 'text/xml'});
        element.href = URL.createObjectURL(file);
        element.download = "sitemap.xml";
        document.body.appendChild(element); 
        element.click();
        document.body.removeChild(element);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Sitemap XML Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Generate SEO-friendly XML sitemaps for your website." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileCode size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Sitemap XML Generator</h1>
                        <p className="text-slate-500 text-sm">Generate SEO-friendly XML sitemaps for your website.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Input */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex-1">
                        <div className="flex justify-between mb-2">
                             <label className="text-sm font-bold text-slate-700">Pages List (One URL per line)</label>
                             <button
                                onClick={() => setUrls('')}
                                className="text-xs font-bold text-slate-400 hover:text-red-500"
                             >
                                Clear
                             </button>
                        </div>
                        <textarea
                            value={urls}
                            onChange={(e) => setUrls(e.target.value)}
                            placeholder="https://example.com/page1&#10;https://example.com/page2"
                            className="w-full h-64 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500 font-mono text-sm resize-none"
                        />
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4">Default Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Frequency</label>
                                <select 
                                    value={freq} 
                                    onChange={(e) => setFreq(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="always">Always</option>
                                    <option value="hourly">Hourly</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                    <option value="never">Never</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Priority</label>
                                <select 
                                    value={priority} 
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="1.0">1.0</option>
                                    <option value="0.9">0.9</option>
                                    <option value="0.8">0.8</option>
                                    <option value="0.7">0.7</option>
                                    <option value="0.6">0.6</option>
                                    <option value="0.5">0.5</option>
                                    <option value="0.4">0.4</option>
                                    <option value="0.3">0.3</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Last Mod</label>
                                <input
                                    type="date"
                                    value={lastMod}
                                    onChange={(e) => setLastMod(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                                />
                            </div>
                        </div>

                         <button
                            onClick={generateSitemap}
                            disabled={!urls}
                            className={`w-full mt-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                urls 
                                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200' 
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                            <RefreshCw size={20} /> Generate Sitemap
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-slate-800 text-slate-300 p-8 rounded-3xl flex flex-col h-full font-mono text-sm relative min-h-[400px]">
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                        <button 
                            onClick={handleCopy}
                            disabled={!result}
                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white disabled:opacity-50"
                            title="Copy to Clipboard"
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                        <button 
                            onClick={handleDownload}
                            disabled={!result}
                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white disabled:opacity-50"
                            title="Download File"
                        >
                            <Download size={18} />
                        </button>
                    </div>

                    <div className="mb-4 font-bold text-slate-400 uppercase tracking-wider text-xs">XML Output</div>
                    <textarea
                        readOnly
                        value={result || '<!-- Your XML sitemap will appear here -->'}
                        className="w-full h-full bg-transparent resize-none outline-none text-rose-300"
                    />
                </div>
            </div>

            <RelatedTools currentToolId="url-sitemap" categoryId="marketing" />
        </ToolPageLayout>
    );
}
