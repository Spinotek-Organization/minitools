import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Youtube, Sun, Moon, Upload, Eye } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function YoutubeThumbnail() {
    const { t } = useTranslation();
    const [title, setTitle] = useState(t('tools.yt-thumbnail.placeholders.title'));
    const [channel, setChannel] = useState(t('tools.yt-thumbnail.placeholders.channel'));
    const [views, setViews] = useState(t('tools.yt-thumbnail.placeholders.views'));
    const [time, setTime] = useState(t('tools.yt-thumbnail.placeholders.time'));
    const [thumbnail, setThumbnail] = useState(null);
    const [darkMode, setDarkMode] = useState(true);

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.yt-thumbnail.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.yt-thumbnail.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200">
                        <Youtube size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.yt-thumbnail.title')}</h1>
                        <p className="text-slate-500">{t('tools.yt-thumbnail.subtitle')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
                        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-100 transition-colors cursor-pointer relative group">
                             <input type="file" onChange={handleImageUpload} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                             <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-500">
                                 <Upload size={20} />
                             </div>
                             <p className="text-sm font-bold text-slate-600">{t('tools.yt-thumbnail.labels.upload')}</p>
                             <p className="text-xs text-slate-400">{t('tools.yt-thumbnail.labels.recommended')}</p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('tools.yt-thumbnail.labels.title')}</label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-sm font-medium p-3 rounded-xl border-slate-200 focus:ring-red-500 focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('tools.yt-thumbnail.labels.channel')}</label>
                            <input 
                                type="text" 
                                value={channel}
                                onChange={(e) => setChannel(e.target.value)}
                                className="w-full text-sm font-medium p-3 rounded-xl border-slate-200 focus:ring-red-500 focus:border-red-500"
                            />
                        </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('tools.yt-thumbnail.labels.views')}</label>
                                <input 
                                    type="text" 
                                    value={views}
                                    onChange={(e) => setViews(e.target.value)}
                                    className="w-full text-sm font-medium p-3 rounded-xl border-slate-200"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('tools.yt-thumbnail.labels.time')}</label>
                                <input 
                                    type="text" 
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full text-sm font-medium p-3 rounded-xl border-slate-200"
                                />
                            </div>
                        </div>

                        <div className="flex bg-slate-100 rounded-lg p-1">
                            <button 
                                onClick={() => setDarkMode(false)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${!darkMode ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                            >
                                <Sun size={16} /> {t('tools.yt-thumbnail.buttons.light')}
                            </button>
                            <button 
                                onClick={() => setDarkMode(true)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${darkMode ? 'bg-slate-800 shadow text-white' : 'text-slate-500'}`}
                            >
                                <Moon size={16} /> {t('tools.yt-thumbnail.buttons.dark')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-2">
                    <div className={`rounded-3xl border border-slate-200 overflow-hidden shadow-xl transition-colors duration-300 ${darkMode ? 'bg-[#0f0f0f]' : 'bg-white'}`}>
                        {/* Fake Header */}
                        <div className={`h-14 border-b flex items-center px-4 gap-4 ${darkMode ? 'border-[#2a2a2a]' : 'border-slate-100'}`}>
                             <div className="w-6 h-6 rounded-full bg-slate-300/20"></div>
                             <div className={`h-8 w-1/3 rounded-full ${darkMode ? 'bg-[#222]' : 'bg-slate-100'}`}></div>
                             <div className="ml-auto flex gap-4">
                                 <div className="w-8 h-8 rounded-full bg-slate-300/20"></div>
                             </div>
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="max-w-md mx-auto space-y-4">
                                {/* Video Card */}
                                <div className="group cursor-pointer">
                                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 mb-3 shadow-sm group-hover:rounded-none transition-all duration-300">
                                        {thumbnail ? (
                                            <img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                                                <Youtube size={48} className="opacity-20 mb-2" />
                                                <span className="text-xs uppercase font-bold opacity-40">{t('tools.yt-thumbnail.labels.noImage')}</span>
                                            </div>
                                        )}
                                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1 rounded">10:24</div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-9 h-9 rounded-full bg-slate-300/20 flex-shrink-0 mt-0.5"></div>
                                        <div className="flex-1">
                                            <h3 className={`text-base font-semibold leading-tight line-clamp-2 mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                                                {title}
                                            </h3>
                                            <div className="text-xs text-slate-400 flex flex-col">
                                                <span>{channel}</span>
                                                <span>{views} • {time}</span>
                                            </div>
                                        </div>
                                        <div className="text-slate-400">
                                             <div className="w-1 h-1 bg-current rounded-full mb-0.5"></div>
                                             <div className="w-1 h-1 bg-current rounded-full mb-0.5"></div>
                                             <div className="w-1 h-1 bg-current rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Padding / Fake List */}
                                <div className="space-y-4 pt-4 opacity-50 pointer-events-none grayscale">
                                     {[1, 2].map(i => (
                                         <div key={i} className="flex gap-2">
                                             <div className="w-40 aspect-video bg-slate-300/10 rounded-lg"></div>
                                             <div className="flex-1 space-y-2">
                                                 <div className={`h-4 w-3/4 rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
                                                 <div className={`h-3 w-1/2 rounded ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}></div>
                                             </div>
                                         </div>
                                     ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="yt-thumbnail" categoryId="content" />
        </ToolPageLayout>
    );
}
