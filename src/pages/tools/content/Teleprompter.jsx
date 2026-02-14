import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Monitor, Play, Pause, Settings, X, Type, FastForward, Rewind, FlipHorizontal } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function Teleprompter() {
    const { t } = useTranslation('tools');
    const [text, setText] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(2); // 1-10
    const [fontSize, setFontSize] = useState(48); // px
    const [isMirrored, setIsMirrored] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    const scrollerRef = useRef(null);
    const animationRef = useRef(null);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const resetScroll = () => {
        if (scrollerRef.current) {
            scrollerRef.current.scrollTop = 0;
        }
        setIsPlaying(false);
    };

    useEffect(() => {
        const createScroll = () => {
            if (isPlaying && scrollerRef.current) {
                scrollerRef.current.scrollTop += speed * 0.5;
                animationRef.current = requestAnimationFrame(createScroll);
            }
        };

        if (isPlaying) {
            animationRef.current = requestAnimationFrame(createScroll);
        } else {
            cancelAnimationFrame(animationRef.current);
        }

        return () => cancelAnimationFrame(animationRef.current);
    }, [isPlaying, speed]);

    // Cleanup fullscreen listeners if needed, usually handled by UI state
    
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
                // Fallback to "fake" fullscreen if API fails or denied
                setIsFullscreen(true); 
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    // Listen for Escape to exit fullscreen/prompter mode
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                if (document.fullscreenElement) document.exitFullscreen();
                setIsFullscreen(false);
                setIsPlaying(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // The Prompter UI Overlay
    if (isFullscreen) {
        return (
            <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white overflow-hidden">
                {/* Controls Overlay (Hover to show) */}
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex justify-between items-center z-10 transition-all duration-300">
                    <div className="flex gap-4 items-center">
                        <button onClick={() => setSpeed(Math.max(1, speed - 1))} className="p-2 hover:bg-white/20 rounded-full"><Rewind size={24} /></button>
                        <span className="font-mono font-bold text-xl w-8 text-center">{speed}</span>
                        <button onClick={() => setSpeed(Math.min(10, speed + 1))} className="p-2 hover:bg-white/20 rounded-full"><FastForward size={24} /></button>
                        
                        <div className="w-px h-6 bg-white/20 mx-2"></div>
                        
                        <button onClick={() => setFontSize(Math.max(20, fontSize - 4))} className="p-2 hover:bg-white/20 rounded-full"><Type size={16} /></button>
                        <span className="font-mono font-bold text-lg w-12 text-center">{fontSize}px</span>
                        <button onClick={() => setFontSize(Math.min(120, fontSize + 4))} className="p-2 hover:bg-white/20 rounded-full"><Type size={24} /></button>
                        
                        <div className="w-px h-6 bg-white/20 mx-2"></div>
                        
                        <button 
                            onClick={() => setIsMirrored(!isMirrored)} 
                            className={`p-2 rounded-full ${isMirrored ? 'bg-white text-black' : 'hover:bg-white/20'}`}
                            title={t('teleprompter.controls.mirror')}
                        >
                            <FlipHorizontal size={24} />
                        </button>
                    </div>

                    <button 
                        onClick={() => {
                            if (document.fullscreenElement) document.exitFullscreen();
                            setIsFullscreen(false);
                            setIsPlaying(false);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                    >
                        <X size={20} /> {t('teleprompter.controls.exit')}
                    </button>
                </div>

                {/* Scroller Area */}
                <div 
                    ref={scrollerRef}
                    className="w-full h-full overflow-y-auto scrollbar-hide relative px-[10%] py-[40vh]"
                    style={{ 
                        transform: isMirrored ? 'scaleX(-1)' : 'none' 
                    }}
                    onClick={togglePlay} // Click anywhere to toggle play
                >
                    {/* Focusing Arrow */}
                    <div className="fixed top-1/2 left-4 text-red-500 opacity-50 font-bold text-4xl transform -translate-y-1/2 pointer-events-none">▶</div>
                    <div className="fixed top-1/2 right-4 text-red-500 opacity-50 font-bold text-4xl transform -translate-y-1/2 rotate-180 pointer-events-none">▶</div>

                    <p 
                        className="font-bold leading-relaxed whitespace-pre-line text-center outline-none selection:bg-red-500/30"
                        style={{ fontSize: `${fontSize}px` }}
                        contentEditable={false} // Read only in prompter mode
                    >
                        {text || t('teleprompter.placeholders.empty')}
                    </p>
                    
                    {/* End Padding */}
                    <div className="h-[50vh]"></div>
                </div>

                {/* Play/Pause Center Overlay (Briefly shows on toggle?) No, plain click is better. */}
                {/* Floating Action Button for Play/Pause */}
                <button 
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                    className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 p-6 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 ${isPlaying ? 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md' : 'bg-red-600 text-white hover:bg-red-700'}`}
                >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>
            </div>
        );
    }

    // Creating initial content
    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('teleprompter.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('teleprompter.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-200">
                        <Monitor size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('teleprompter.title')}</h1>
                        <p className="text-slate-500">{t('teleprompter.subtitle')}</p>
                    </div>
                </div>
                <button 
                    onClick={toggleFullscreen}
                    disabled={!text}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Play size={20} /> {t('teleprompter.buttons.start')}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Editor */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="font-bold text-slate-700 block">{t('teleprompter.labels.scriptEditor')}</label>
                        <div className="flex gap-4 text-sm text-slate-500">
                            <span>{t('teleprompter.labels.words', { count: text.split(/\s+/).filter(w => w.length > 0).length })}</span>
                            <span>{t('teleprompter.labels.minRead', { count: Math.ceil(text.split(/\s+/).filter(w => w.length > 0).length / 130) })}</span>
                        </div>
                    </div>
                    <textarea 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={t('teleprompter.placeholders.input')}
                        className="w-full h-96 p-6 text-lg leading-relaxed rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-500 focus:ring-sky-500 transition-colors resize-y"
                    />
                    <div className="flex items-center gap-2 text-sm text-slate-500 bg-sky-50 p-4 rounded-xl border border-sky-100">
                        <Monitor size={16} className="text-sky-600" />
                        <p dangerouslySetInnerHTML={{ __html: t('teleprompter.tip') }} />
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="teleprompter" categoryId="content" />
        </ToolPageLayout>
    );
}
