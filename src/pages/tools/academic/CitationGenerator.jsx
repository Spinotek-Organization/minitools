import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Quote, Copy, BookOpen, Globe, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const CITATION_STYLES = ['APA 7', 'MLA 9', 'Chicago', 'Harvard', 'IEEE'];
const SOURCES = ['Website', 'Book', 'Journal'];

export default function CitationGenerator() {
    const [style, setStyle] = useState('APA 7');
    const [sourceType, setSourceType] = useState('Website');
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        title: '',
        publisher: '', // or Website Name / Container
        url: '',
        year: new Date().getFullYear().toString(),
        month: '',
        day: '',
        accessDate: new Date().toISOString().split('T')[0]
    });
    const [citation, setCitation] = useState('');
    const [copied, setCopied] = useState(false);

    // Format Logic
    useEffect(() => {
        const { firstName, lastName, title, publisher, url, year, month, day, accessDate } = data;
        const author = lastName ? `${lastName}, ${firstName ? firstName[0] + '.' : ''}` : (publisher || 'Anonymous');
        const authorFull = lastName ? `${lastName}, ${firstName}` : (publisher || 'Anonymous');
        
        let text = '';

        if (style === 'APA 7') {
            // APA: Author, A. A. (Year, Month Day). Title of page. Site Name. URL
            const dateStr = [year, month, day].filter(Boolean).join(', ');
            text = `${author} (${dateStr || 'n.d.'}). ${title ? title + '.' : ''} ${publisher ? publisher + '.' : ''} ${url}`;
        } else if (style === 'MLA 9') {
            // MLA: Author. "Title." Container, Publisher, Publication Date, URL. Accessed Date.
            text = `${authorFull}. "${title}." ${publisher}, ${year || 'n.d.'}, ${url}. Accessed ${accessDate}.`;
        } else if (style === 'Chicago') {
             // Chicago: Author. "Title." Publisher, Year. URL.
             text = `${authorFull}. "${title}." ${publisher}, ${year}. ${url}.`;
        } else if (style === 'Harvard') {
            // Harvard: Author (Year) 'Title', Publisher, Year. Available at: URL [Accessed Date]
            text = `${author} (${year || 'n.d.'}) '${title}', ${publisher}. Available at: ${url} [Accessed ${accessDate}].`;
        } else if (style === 'IEEE') {
            // IEEE: [1] F. Last, "Title," Publisher, Year. [Online]. Available: URL. [Accessed: Date].
            const ieeeAuthor = firstName && lastName ? `${firstName[0]}. ${lastName}` : (publisher || 'Anonymous');
            text = `[1] ${ieeeAuthor}, "${title}," ${publisher}, ${year}. [Online]. Available: ${url}. [Accessed: ${accessDate}].`;
        }

        setCitation(text);
    }, [data, style, sourceType]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(citation);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Citation Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Generate citations in APA, MLA, and Chicago formats easily." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Quote size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Citation Generator</h1>
                        <p className="text-slate-500 text-sm">Create accurate references for your bibliography.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Input Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        
                        {/* Type/Style Selectors */}
                        <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-slate-100">
                             <div className="flex-1 min-w-[140px]">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Style</label>
                                <div className="flex bg-slate-100 p-1 rounded-xl">
                                    {CITATION_STYLES.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setStyle(s)}
                                            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${style === s ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                             </div>
                             <div className="flex-1 min-w-[140px]">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Source Type</label>
                                <div className="flex bg-slate-100 p-1 rounded-xl">
                                    {SOURCES.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setSourceType(s)}
                                            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${sourceType === s ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                             </div>
                        </div>

                        {/* Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">First Name</label>
                                    <input name="firstName" value={data.firstName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-colors" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Last Name</label>
                                    <input name="lastName" value={data.lastName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-colors" placeholder="Doe" />
                                </div>
                                <div className="md:col-span-2">
                                     <label className="block text-sm font-bold text-slate-700 mb-1">
                                        {sourceType === 'Website' ? 'Page Title' : 'Title'}
                                     </label>
                                    <input name="title" value={data.title} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-colors" placeholder="e.g. How to Cite Sources" />
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="md:col-span-2">
                                     <label className="block text-sm font-bold text-slate-700 mb-1">
                                         {sourceType === 'Website' ? 'Website Name' : 'Publisher'}
                                     </label>
                                    <input name="publisher" value={data.publisher} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-colors" placeholder="e.g. Wikipedia / Penguin Books" />
                                </div>
                                {sourceType === 'Website' && (
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-slate-700 mb-1">URL</label>
                                        <input name="url" value={data.url} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-colors" placeholder="https://..." />
                                    </div>
                                )}
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Year</label>
                                        <input name="year" value={data.year} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-sm" placeholder="2024" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Month</label>
                                        <input name="month" value={data.month} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-sm" placeholder="May" />
                                    </div>
                                      <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Day</label>
                                        <input name="day" value={data.day} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-sm" placeholder="15" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Preview Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl sticky top-6">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
                            <h3 className="font-bold flex items-center gap-2">
                                <BookOpen size={18} className="text-blue-400" />
                                Preview ({style})
                            </h3>
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-300 hover:text-white"
                                title="Copy to Clipboard"
                            >
                                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                            </button>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 font-serif text-lg leading-relaxed border border-slate-700 break-words min-h-[120px]">
                            {citation}
                        </div>
                        
                        <div className="mt-4 text-xs text-slate-400 flex items-start gap-2">
                            <Globe size={14} className="mt-0.5 flex-shrink-0" />
                            <p>Always double-check against your institution's specific guidelines. Automated tools can make mistakes.</p>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="citation-gen" categoryId="academic" />
        </ToolPageLayout>
    );
}
