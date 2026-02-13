import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Quote, BookOpen, Copy, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function CitationGenerator() {
    const { t } = useTranslation();
    const [style, setStyle] = useState('apa'); // apa, mla, chicago
    const [sourceType, setSourceType] = useState('website'); // website, book, journal
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        title: '', // Article/Chapter title
        sourceTitle: '', // Website name / Book title / Journal name
        publisher: '',
        url: '',
        year: '',
        month: '',
        day: '',
        volume: '',
        issue: '',
        pages: ''
    });

    const [citation, setCitation] = useState('');
    const [copied, setCopied] = useState(false);

    const generateCitation = () => {
        const { firstName, lastName, title, sourceTitle, publisher, url, year, month, day } = formData;
        // Simple mock logic for demonstration
        let result = '';

        const author = lastName && firstName ? `${lastName}, ${firstName[0]}.` : (sourceTitle || 'Unknown');
        const date = year ? `(${year}${month ? ', ' + month : ''}${day ? ' ' + day : ''})` : '(n.d.)';

        if (style === 'apa') {
            // LastName, F. (Year). Title. Source. URL
            result = `${author} ${date}. ${title}. ${sourceTitle}. ${url}`;
        } else if (style === 'mla') {
            // LastName, FirstName. "Title." SourceTitle, Publisher, Day Month Year, URL.
            result = `${lastName}, ${firstName}. "${title}." ${sourceTitle}, ${publisher}, ${day} ${month} ${year}, ${url}.`;
        } else if (style === 'chicago') {
             // LastName, FirstName. "Title." SourceTitle. Month Day, Year. URL.
             result = `${lastName}, ${firstName}. "${title}." ${sourceTitle}. ${month} ${day}, ${year}. ${url}.`;
        }
        
        setCitation(result);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(citation);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.citation-gen.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.citation-gen.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Quote size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.citation-gen.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.citation-gen.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Form Area */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Style & Type Selector */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('tools.citation-gen.styles')}</label>
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                {['apa', 'mla', 'chicago'].map(s => (
                                    <button 
                                        key={s} 
                                        onClick={() => setStyle(s)}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg uppercase transition-all ${style === s ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        {s.toUpperCase()}
                                    </button>
                                ))}
                            </div> 
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('tools.citation-gen.sourceType')}</label>
                             <div className="flex bg-slate-100 p-1 rounded-xl">
                                {['website', 'book'].map(s => (
                                    <button 
                                        key={s} 
                                        onClick={() => setSourceType(s)}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg capitalize transition-all ${sourceType === s ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div> 
                        </div>
                    </div>

                    {/* Input Fields */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.citation-gen.forms.firstName')}</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.citation-gen.forms.lastName')}</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{sourceType === 'website' ? t('tools.citation-gen.forms.pageTitle') : t('tools.citation-gen.forms.title')}</label>
                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{sourceType === 'website' ? t('tools.citation-gen.forms.websiteName') : t('tools.citation-gen.forms.publisher')}</label>
                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500" value={formData.sourceTitle} onChange={e => setFormData({...formData, sourceTitle: e.target.value})} />
                        </div>
                        
                        {sourceType === 'website' && (
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.citation-gen.forms.url')}</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-4">
                             <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.citation-gen.forms.day')}</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500" value={formData.day} onChange={e => setFormData({...formData, day: e.target.value})} placeholder="DD" />
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.citation-gen.forms.month')}</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500" value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})} placeholder="Month" />
                            </div>
                             <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.citation-gen.forms.year')}</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="YYYY" />
                            </div>
                        </div>

                        <button onClick={generateCitation} className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-200 active:scale-95">
                            {t('tools.citation-gen.title')}
                        </button>
                    </div>
                </div>

                {/* Preview Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className={`bg-white rounded-3xl p-6 border-2 transition-all ${citation ? 'border-purple-500 shadow-xl' : 'border-slate-100 border-dashed opacity-70'}`}>
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                             <BookOpen size={20} className="text-purple-600" />
                             {t('tools.citation-gen.preview.title')} ({style.toUpperCase()})
                        </h3>
                        
                        {citation ? (
                            <div className="bg-purple-50 rounded-xl p-4 text-slate-800 font-serif leading-relaxed text-lg mb-4 break-words">
                                {citation}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-slate-400 text-sm">
                                Fill in the details to see your citation here.
                            </div>
                        )}

                        {citation && (
                            <button 
                                onClick={handleCopy}
                                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                            >
                                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                                {copied ? 'Copied!' : 'Copy Citation'}
                            </button>
                        )}
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
                        <strong>Disclaimer:</strong> {t('tools.citation-gen.preview.disclaimer')}
                    </div>
                </div>

            </div>

            <RelatedTools currentToolId="citation-gen" categoryId="academic" />
        </ToolPageLayout>
    );
}
