import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileCode, Download, Copy, Check, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

import { useTranslation } from 'react-i18next';

export default function SitemapGenerator() {
    const { t } = useTranslation();
    const [urls, setUrls] = useState('');
    const [priority, setPriority] = useState('0.8');
    const [freq, setFreq] = useState('weekly');
    const [includeLastMod, setIncludeLastMod] = useState(true);
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
      <loc>${cleanUrl}</loc>\n`;
            
            if (includeLastMod) {
                xml += `      <lastmod>${lastMod}</lastmod>\n`;
            }
            
            xml += `      <changefreq>${freq}</changefreq>
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
        <ToolPageLayout toolId="url-sitemap">
            <Helmet>
                <title>{t('tools.url-sitemap.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.url-sitemap.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileCode size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.url-sitemap.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.url-sitemap.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-bold text-slate-700">{t('tools.url-sitemap.input.label')}</label>
                        <button 
                            onClick={() => setUrls('')}
                            className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
                        >
                            {t('tools.url-sitemap.input.clear')}
                        </button>
                    </div>
                        <textarea
                            value={urls}
                            onChange={(e) => setUrls(e.target.value)}
                            placeholder="https://example.com/page1&#10;https://example.com/page2"
                            className="w-full h-64 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500 font-mono text-sm resize-none"
                        />
                </div>

                {/* Settings */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4">{t('tools.url-sitemap.settings.title')}</h3>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('tools.url-sitemap.settings.freq')}</label>
                                    <select 
                                        value={freq}
                                        onChange={(e) => setFreq(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                                    >
                                        <option value="always">always</option>
                                        <option value="hourly">hourly</option>
                                        <option value="daily">daily</option>
                                        <option value="weekly">weekly</option>
                                        <option value="monthly">monthly</option>
                                        <option value="yearly">yearly</option>
                                        <option value="never">never</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t('tools.url-sitemap.settings.priority')}</label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                                    >
                                        <option value="1.0">1.0</option>
                                        <option value="0.9">0.9</option>
                                        <option value="0.8">0.8</option>
                                        <option value="0.7">0.7</option>
                                        <option value="0.6">0.6</option>
                                        <option value="0.5">0.5</option>
                                        <option value="0.4">0.4</option>
                                        <option value="0.3">0.3</option>
                                        <option value="0.2">0.2</option>
                                        <option value="0.1">0.1</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="lastmod"
                                    checked={includeLastMod}
                                    onChange={(e) => setIncludeLastMod(e.target.checked)}
                                    className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                                />
                                <label htmlFor="lastmod" className="text-sm font-medium text-slate-700">{t('tools.url-sitemap.settings.lastmod')}</label>
                            </div>

                            <button
                                onClick={generateSitemap}
                                className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg ${
                                    urls.trim() 
                                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200' 
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                }`}
                                disabled={!urls.trim()}
                            >
                                <RefreshCw size={20} /> {t('tools.url-sitemap.settings.generate')}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col h-full">
                         <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-900">{t('tools.url-sitemap.output.title')}</h3>
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleCopy}
                                    disabled={!result}
                                     className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 disabled:opacity-50"
                                     title={t('tools.url-sitemap.output.copy')}
                                >
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                                <button 
                                    onClick={handleDownload}
                                    disabled={!result}
                                     className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 disabled:opacity-50"
                                     title={t('tools.url-sitemap.output.download')}
                                >
                                    <Download size={18} />
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={result}
                            readOnly
                            placeholder={t('tools.url-sitemap.output.placeholder')}
                            className="w-full flex-1 min-h-[200px] bg-slate-800 rounded-xl px-4 py-3 outline-none text-slate-300 font-mono text-xs leading-relaxed resize-none"
                        />
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="url-sitemap" categoryId="marketing" />
        </ToolPageLayout>
    );
}
