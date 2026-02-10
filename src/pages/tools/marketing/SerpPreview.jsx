import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Monitor, Smartphone, Globe } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SerpPreview() {
    const [data, setData] = useState({
        title: 'Your Page Title | Brand Name',
        description: 'This is a sample meta description that will appear in search results. Make it catchy and relevant to improve your click-through rate.',
        url: 'example.com',
        path: 'blog/article-name'
    });

    const [viewMode, setViewMode] = useState('desktop');

    const TITLE_MAX = 60;
    const DESC_MAX = 160;

    const truncate = (str, max) => {
        return str.length > max ? str.substring(0, max) + '...' : str;
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Google SERP Preview | MiniTools by Spinotek</title>
                <meta name="description" content="Visualize how your website appears on Google search results." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Search size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Google SERP Preview</h1>
                        <p className="text-slate-500 text-sm">Visualize how your website appears on Google search results.</p>
                    </div>
                </div>
                
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setViewMode('desktop')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'desktop' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                    >
                        <Monitor size={18} /> Desktop
                    </button>
                    <button
                        onClick={() => setViewMode('mobile')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'mobile' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                    >
                        <Smartphone size={18} /> Mobile
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-sm font-bold text-slate-700">SEO Title</label>
                            <span className={`text-xs font-bold ${data.title.length > TITLE_MAX ? 'text-red-500' : 'text-slate-400'}`}>
                                {data.title.length} / {TITLE_MAX}px
                            </span>
                        </div>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-red-500"
                        />
                         {data.title.length > TITLE_MAX && <p className="text-xs text-red-500 mt-1">Title is likely to be truncated.</p>}
                    </div>

                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-sm font-bold text-slate-700">Meta Description</label>
                            <span className={`text-xs font-bold ${data.description.length > DESC_MAX ? 'text-red-500' : 'text-slate-400'}`}>
                                {data.description.length} / {DESC_MAX}px
                            </span>
                        </div>
                        <textarea
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-red-500"
                        />
                         {data.description.length > DESC_MAX && <p className="text-xs text-red-500 mt-1">Description is likely to be truncated.</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Domain</label>
                            <input
                                type="text"
                                value={data.url}
                                onChange={(e) => setData({ ...data, url: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">URL Path</label>
                            <input
                                type="text"
                                value={data.path}
                                onChange={(e) => setData({ ...data, path: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview Container */}
                <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8 flex items-center justify-center">
                    <div className="bg-white p-6 shadow-sm w-full max-w-xl rounded-lg">
                        {/* Google Style Preview */}
                         <div className="font-arial text-[14px]">
                            {viewMode === 'mobile' ? (
                                <div className="mb-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                         <Globe size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                         <span className="text-slate-800 text-sm">{data.url}</span>
                                         <span className="text-slate-500 text-xs">https://{data.url} › {data.path.replace(/\//g, ' › ')}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-1 flex items-center gap-2">
                                     <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                         <Globe size={14} />
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                        <span className="text-slate-800 text-sm">{data.url}</span>
                                        <cite className="text-slate-500 text-xs not-italic">https://{data.url} › {data.path.replace(/\//g, ' › ')}</cite>
                                    </div>
                                </div>
                            )}

                             <div className="group cursor-pointer">
                                 <h3 className="text-[#1a0dab] text-xl hover:underline truncate">
                                     {viewMode === 'mobile' ? truncate(data.title, 55) : truncate(data.title, 60)}
                                 </h3>
                             </div>

                             <div className="text-[#4d5156] text-sm mt-1 leading-normal max-w-[600px]">
                                 {truncate(data.description, 160)}
                             </div>
                         </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="serp-preview" categoryId="marketing" />
        </ToolPageLayout>
    );
}
