import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bot, Plus, Trash2, Download, Copy, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

import { useTranslation } from 'react-i18next';

export default function RobotsGenerator() {
    const { t } = useTranslation();
    const [defaultAccess, setDefaultAccess] = useState('Allow');
    const [delay, setDelay] = useState('');
    const [sitemaps, setSitemaps] = useState(['']);
    const [rules, setRules] = useState([
        { userAgent: '*', allow: '/', disallow: '' }
    ]);
    const [generatedTxt, setGeneratedTxt] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let txt = '';
        
        // Rules
        rules.forEach(rule => {
            txt += `User-agent: ${rule.userAgent}\n`;
            if (rule.disallow) {
                const paths = rule.disallow.split(',').map(p => p.trim());
                paths.forEach(p => txt += `Disallow: ${p}\n`);
            }
             if (rule.allow && rule.allow !== '/') { // Avoid redundant Allow: / if default is usually allow
                const paths = rule.allow.split(',').map(p => p.trim());
                paths.forEach(p => txt += `Allow: ${p}\n`);
            } else if (rule.allow === '/' && !rule.disallow) {
                // If explicitly allowing root and no disallow, technically empty disallow means allow all
                 // But for clarity we can skip or add Disallow: 
            }
            txt += '\n';
        });

        // Crawl Delay
        if (delay) {
            txt += `Crawl-delay: ${delay}\n\n`;
        }

        // Sitemaps
        sitemaps.forEach(map => {
            if (map) txt += `Sitemap: ${map}\n`;
        });

        setGeneratedTxt(txt.trim());
    }, [defaultAccess, delay, sitemaps, rules]);

    const addRule = () => {
        setRules([...rules, { userAgent: 'Googlebot', allow: '', disallow: '' }]);
    };

    const updateRule = (index, field, value) => {
        const newRules = [...rules];
        newRules[index][field] = value;
        setRules(newRules);
    };

    const removeRule = (index) => {
        setRules(rules.filter((_, i) => i !== index));
    };

    const addSitemap = () => setSitemaps([...sitemaps, '']);
    
    const updateSitemap = (index, value) => {
        const newMaps = [...sitemaps];
        newMaps[index] = value;
        setSitemaps(newMaps);
    };

    const removeSitemap = (index) => {
        setSitemaps(sitemaps.filter((_, i) => i !== index));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedTxt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([generatedTxt], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "robots.txt";
        document.body.appendChild(element); 
        element.click();
        document.body.removeChild(element);
    };

    return (
        <ToolPageLayout toolId="robots-gen">
            <Helmet>
                <title>{t('tools.robots-gen.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.robots-gen.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.robots-gen.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.robots-gen.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Configuration */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-slate-900">User Agent Rules</h2>
                            <button onClick={addRule} className="text-sm flex items-center gap-1 text-slate-600 font-bold hover:text-slate-900">
                                <Plus size={16} /> Add Bot
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            {rules.map((rule, index) => (
                                <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative group">
                                    {index > 0 && (
                                        <button 
                                            onClick={() => removeRule(index)}
                                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                    <div className="mb-3">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">User Agent</label>
                                        <input
                                            type="text"
                                            value={rule.userAgent}
                                            onChange={(e) => updateRule(index, 'userAgent', e.target.value)}
                                            placeholder="*"
                                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-green-600 uppercase mb-1">Allow</label>
                                            <input
                                                type="text"
                                                value={rule.allow}
                                                onChange={(e) => updateRule(index, 'allow', e.target.value)}
                                                placeholder="/public/"
                                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-red-600 uppercase mb-1">Disallow</label>
                                            <input
                                                type="text"
                                                value={rule.disallow}
                                                onChange={(e) => updateRule(index, 'disallow', e.target.value)}
                                                placeholder="/admin/, /private/"
                                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2">Separate multiple paths with commas.</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Sitemaps & Extras</h2>
                        
                        <div className="space-y-3 mb-6">
                            <label className="block text-sm font-bold text-slate-700">Sitemap URLs</label>
                            {sitemaps.map((map, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={map}
                                        onChange={(e) => updateSitemap(index, e.target.value)}
                                        placeholder="https://example.com/sitemap.xml"
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm"
                                    />
                                    {sitemaps.length > 1 && (
                                        <button onClick={() => removeSitemap(index)} className="text-slate-400 hover:text-red-500">
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button onClick={addSitemap} className="text-sm font-bold text-slate-600 flex items-center gap-1">
                                <Plus size={16} /> Add Sitemap
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Crawl Delay (Seconds)</label>
                            <input
                                type="number"
                                value={delay}
                                onChange={(e) => setDelay(e.target.value)}
                                placeholder="e.g. 10 (Optional)"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-slate-800 text-slate-300 p-8 rounded-3xl flex flex-col h-full font-mono text-sm relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                            onClick={handleCopy}
                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white"
                            title="Copy to Clipboard"
                        >
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                        <button 
                            onClick={handleDownload}
                            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white"
                            title="Download File"
                        >
                            <Download size={18} />
                        </button>
                    </div>

                    <div className="mb-4 font-bold text-slate-400 uppercase tracking-wider text-xs">robots.txt Preview</div>
                    <textarea
                        readOnly
                        value={generatedTxt}
                        className="w-full h-full bg-transparent resize-none outline-none text-green-400"
                    />
                </div>
            </div>

            <RelatedTools currentToolId="robots-gen" categoryId="marketing" />
        </ToolPageLayout>
    );
}
