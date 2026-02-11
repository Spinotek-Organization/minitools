import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Share2, Facebook, Twitter, Linkedin, ImageIcon } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

import { useTranslation } from 'react-i18next';

export default function OgPreview() {
    const { t } = useTranslation();
    const [data, setData] = useState({
        title: 'Your Page Title',
        description: 'A brief description of your content that will appear when shared on social media platforms.',
        image: '',
        url: 'https://example.com'
    });

    const [platform, setPlatform] = useState('facebook');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <ToolPageLayout toolId="social-mockup">
            <Helmet>
                <title>{t('tools.social-mockup.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.social-mockup.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Share2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.social-mockup.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.social-mockup.desc')}</p>
                    </div>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setPlatform('facebook')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${platform === 'facebook' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                    >
                        <Facebook size={18} /> Facebook
                    </button>
                    <button
                        onClick={() => setPlatform('twitter')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${platform === 'twitter' ? 'bg-white shadow-sm text-sky-500' : 'text-slate-500'}`}
                    >
                        <Twitter size={18} /> Twitter
                    </button>
                    <button
                        onClick={() => setPlatform('linkedin')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${platform === 'linkedin' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500'}`}
                    >
                        <Linkedin size={18} /> LinkedIn
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Image URL or Upload</label>
                        <div className="space-y-2">
                             <input
                                type="text"
                                value={data.image}
                                onChange={(e) => setData({ ...data, image: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                            />
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="w-full bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl py-3 flex items-center justify-center gap-2 text-slate-500 font-bold text-sm hover:bg-slate-200 transition-colors">
                                    <ImageIcon size={18} /> Upload Image
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Domain</label>
                        <input
                            type="text"
                            value={data.url}
                            onChange={(e) => setData({ ...data, url: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                </div>

                {/* Preview Container */}
                <div className="bg-slate-100 rounded-3xl border border-slate-200 p-8 flex items-center justify-center min-h-[400px]">
                    
                    {/* Facebook Preview */}
                    {platform === 'facebook' && (
                        <div className="bg-white max-w-[500px] w-full border border-slate-200 shadow-sm overflow-hidden">
                            <div className="aspect-[1.91/1] bg-slate-200 w-full relative group overflow-hidden">
                                {data.image ? (
                                    <img src={data.image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                                )}
                            </div>
                            <div className="p-3 bg-[#f0f2f5] border-t border-slate-100">
                                <div className="uppercase text-[12px] text-slate-500 truncate mb-1">{new URL(data.url).hostname}</div>
                                <div className="font-bold text-slate-900 leading-tight mb-1 line-clamp-2">{data.title}</div>
                                <div className="text-sm text-slate-500 line-clamp-1">{data.description}</div>
                            </div>
                        </div>
                    )}

                    {/* Twitter Preview */}
                    {platform === 'twitter' && (
                        <div className="bg-white max-w-[500px] w-full rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                             <div className="aspect-[2/1] bg-slate-200 w-full relative overflow-hidden">
                                {data.image ? (
                                    <img src={data.image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                                )}
                                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-1 rounded">PROMOTED</div>
                            </div>
                            <div className="p-3 bg-white hover:bg-slate-50 cursor-pointer">
                                <div className="text-slate-500 text-sm mb-1">{new URL(data.url).hostname}</div>
                                <div className="text-slate-900 leading-tight mb-1">{data.title}</div>
                                <div className="text-slate-500 text-sm line-clamp-2">{data.description}</div>
                            </div>
                        </div>
                    )}

                    {/* LinkedIn Preview */}
                    {platform === 'linkedin' && (
                        <div className="bg-white max-w-[500px] w-full border border-slate-200 shadow-sm overflow-hidden rounded-lg">
                             <div className="aspect-[1.91/1] bg-slate-200 w-full relative overflow-hidden">
                                {data.image ? (
                                    <img src={data.image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                                )}
                            </div>
                            <div className="p-4 bg-[#eef3f8]">
                                <div className="font-semibold text-slate-900 leading-tight mb-1 line-clamp-2">{data.title}</div>
                                <div className="text-xs text-slate-500 truncate">{new URL(data.url).hostname}</div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <RelatedTools currentToolId="social-mockup" categoryId="marketing" />
        </ToolPageLayout>
    );
}
