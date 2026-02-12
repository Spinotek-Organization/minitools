import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { UserCheck, Upload, Download, Star, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { toPng } from 'html-to-image';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function TestimonialCard() {
    const { t } = useTranslation();

    const THEMES = [
        { id: 'light', name: t('tools.testimonial-maker.themes.light'), bg: 'bg-white', text: 'text-slate-900', border: 'border-slate-100', accent: 'text-indigo-600' },
        { id: 'dark', name: t('tools.testimonial-maker.themes.dark'), bg: 'bg-slate-900', text: 'text-white', border: 'border-slate-800', accent: 'text-indigo-400' },
        { id: 'blue', name: t('tools.testimonial-maker.themes.blue'), bg: 'bg-indigo-600', text: 'text-white', border: 'border-indigo-500', accent: 'text-indigo-200' },
        { id: 'gradient', name: t('tools.testimonial-maker.themes.gradient'), bg: 'bg-gradient-to-br from-indigo-500 to-purple-600', text: 'text-white', border: 'border-white/20', accent: 'text-yellow-300' },
    ];

    const [data, setData] = useState({
        name: 'Sarah Johnson',
        role: 'Marketing Director at TechFlow',
        quote: "This solution completely transformed how we handle our sales pipeline. It's intuitive, fast, and the support is incredible. Highly recommended for any growing team!",
        rating: 5,
        image: null
    });
    const [theme, setTheme] = useState(THEMES[0]);
    const cardRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = async () => {
        if (!cardRef.current) return;
        try {
            const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `testimonial-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to generate image', err);
        }
    };

    return (
        <ToolPageLayout toolId="testimonial-maker">
            <Helmet>
                <title>{t('tools.testimonial-maker.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.testimonial-maker.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <UserCheck size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.testimonial-maker.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.testimonial-maker.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Controls */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <RefreshCw size={20} className="text-pink-600" />
                        {t('tools.testimonial-maker.page.card_details')}
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.testimonial-maker.page.theme_label')}</label>
                            <div className="grid grid-cols-2 gap-3">
                                {THEMES.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTheme(t)}
                                        className={`p-3 rounded-xl border text-left transition-all ${
                                            theme.id === t.id
                                                ? 'ring-2 ring-pink-500 border-pink-500 bg-pink-50'
                                                : 'border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className="text-sm font-bold text-slate-900">{t.name}</div>
                                        <div className={`mt-1 h-2 w-full rounded-full ${t.bg.includes('gradient') ? t.bg : t.bg} border border-slate-100`}></div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.testimonial-maker.page.data_label')}</label>
                             <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleInputChange}
                                placeholder={t('tools.testimonial-maker.page.client_name_ph')}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 mb-2 text-slate-900 outline-none focus:ring-2 focus:ring-pink-500"
                            />
                            <input
                                type="text"
                                name="role"
                                value={data.role}
                                onChange={handleInputChange}
                                placeholder={t('tools.testimonial-maker.page.role_ph')}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 mb-2 text-slate-900 outline-none focus:ring-2 focus:ring-pink-500"
                            />
                            <textarea
                                name="quote"
                                value={data.quote}
                                onChange={handleInputChange}
                                placeholder={t('tools.testimonial-maker.page.quote_ph')}
                                rows={4}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.testimonial-maker.page.rating_label')}</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => setData(prev => ({ ...prev, rating: star }))}
                                        className={`p-2 rounded-lg transition-colors ${
                                            data.rating >= star ? 'text-yellow-400' : 'text-slate-300'
                                        }`}
                                    >
                                        <Star fill="currentColor" size={24} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.testimonial-maker.page.photo_label')}</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="photo-upload"
                                />
                                <label
                                    htmlFor="photo-upload"
                                    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all text-slate-500 hover:text-pink-600 gap-2 font-medium"
                                >
                                    <Upload size={20} />
                                    {data.image ? t('tools.testimonial-maker.page.change_photo') : t('tools.testimonial-maker.page.upload_photo')}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-slate-900">{t('tools.testimonial-maker.page.preview_title')}</h2>
                        <button
                            onClick={handleDownload}
                            className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                        >
                            <Download size={18} />
                            {t('tools.testimonial-maker.page.download_png')}
                        </button>
                    </div>

                    <div className="bg-slate-100 rounded-3xl p-8 flex items-center justify-center min-h-[400px] shadow-inner">
                        <div
                            ref={cardRef}
                            className={`w-full max-w-[500px] aspect-[4/3] rounded-2xl shadow-2xl p-8 flex flex-col justify-between relative overflow-hidden transition-colors ${theme.bg} ${theme.text} ${theme.border} border`}
                        >
                            <div className="relative z-10">
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star 
                                            key={star} 
                                            size={20} 
                                            fill={data.rating >= star ? "currentColor" : "none"}
                                            className={data.rating >= star ? theme.accent : "opacity-20"} 
                                        />
                                    ))}
                                </div>
                                <p className="text-xl md:text-2xl font-medium leading-relaxed font-serif italic">
                                    "{data.quote}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 relative z-10 pt-6">
                                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 border-2 border-white/20 flex-shrink-0">
                                    {data.image ? (
                                        <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            <ImageIcon size={24} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="font-bold text-lg leading-tight">{data.name}</div>
                                    <div className={`text-sm ${theme.id === 'light' ? 'text-slate-500' : 'text-white/60'}`}>
                                        {data.role}
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Quote Mark */}
                            <div className={`absolute top-4 right-8 text-[120px] leading-none opacity-10 font-serif ${theme.accent}`}>
                                "
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="testimonial-maker" categoryId="sales" />
        </ToolPageLayout>
    );
}
