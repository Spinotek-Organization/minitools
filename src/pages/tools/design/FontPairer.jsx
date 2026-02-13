import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Type, Check, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

const GOOGLE_FONTS_API = "https://fonts.googleapis.com/css2?display=swap";

const PAIRINGS = {
    modern: { h: 'Montserrat', b: 'Open Sans', labelKey: 'modern' },
    classic: { h: 'Playfair Display', b: 'Lato', labelKey: 'classic' },
    contrast: { h: 'Oswald', b: 'Merriweather', labelKey: 'contrast' },
    tech: { h: 'Space Mono', b: 'Roboto', labelKey: 'tech' },
    fun: { h: 'Pacifico', b: 'Quicksand', labelKey: 'fun' },
    minimal: { h: 'Raleway', b: 'Inter', labelKey: 'minimal' },
    editorial: { h: 'Lora', b: 'Roboto', labelKey: 'editorial' },
    corporate: { h: 'Titillium Web', b: 'Open Sans', labelKey: 'corporate' },
    geometric: { h: 'Josefin Sans', b: 'Lato', labelKey: 'geometric' },
    luxury: { h: 'Cinzel', b: 'Fauna One', labelKey: 'luxury' },
    friendly: { h: 'Nunito', b: 'Rubik', labelKey: 'friendly' },
    retro: { h: 'Abril Fatface', b: 'Poppins', labelKey: 'retro' },
    display: { h: 'Bebas Neue', b: 'Montserrat', labelKey: 'display' },
    handwritten: { h: 'Dancing Script', b: 'Josefin Sans', labelKey: 'handwritten' }
};

const FONTS = [
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 'Raleway', 'Merriweather', 
    'Playfair Display', 'Nunito', 'Poppins', 'Inter', 'Ubuntu', 'Quicksand', 'Pacifico', 
    'Space Mono', 'Lora', 'Rubik', 'Work Sans', 'Titillium Web', 'PT Sans', 'PT Serif',
    'Fira Sans', 'Josefin Sans', 'Anton', 'Cabin', 'Arvo', 'Dancing Script', 'Bitter',
    'Oxygen', 'Dosis', 'Exo 2', 'Inconsolata', 'Nunito Sans', 'Barlow', 'Karla',
    'Mulish', 'IBM Plex Sans', 'DM Sans', 'Noto Sans', 'Manrope', 'Cinzel', 'Fauna One',
    'Abril Fatface', 'Bebas Neue', 'Crimson Text', 'Libre Baskerville', 'Source Sans Pro',
    'Source Serif Pro', 'Zilla Slab', 'Maven Pro', 'Comfortaa', 'Righteous', 'Fredoka One',
    'Varela Round', 'Lobster', 'Shadows Into Light', 'Indie Flower', 'Amatic SC'
].sort();

export default function FontPairer() {
    const { t } = useTranslation();
    const [headingFont, setHeadingFont] = useState('Montserrat');
    const [bodyFont, setBodyFont] = useState('Open Sans');
    const [theme, setTheme] = useState('modern');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Load fonts dynamically
        const link = document.createElement('link');
        link.href = `${GOOGLE_FONTS_API}&family=${headingFont.replace(/ /g, '+')}:wght@400;700&family=${bodyFont.replace(/ /g, '+')}:wght@400;700`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, [headingFont, bodyFont]);

    const setPairing = (key) => {
        setTheme(key);
        setHeadingFont(PAIRINGS[key].h);
        setBodyFont(PAIRINGS[key].b);
    };

    const copyCode = () => {
        const url = `${GOOGLE_FONTS_API}&family=${headingFont.replace(/ /g, '+')}:wght@400;700&family=${bodyFont.replace(/ /g, '+')}:wght@400;700`;
        const code = `<link href="${url}" rel="stylesheet">\n\n/* CSS */\nh1, h2, h3 { font-family: '${headingFont}', sans-serif; }\nbody { font-family: '${bodyFont}', sans-serif; }`;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.font-pairer.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.font-pairer.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                        <Type size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.font-pairer.title')}</h1>
                        <p className="text-slate-500">{t('tools.font-pairer.subtitle')}</p>
                    </div>
                </div>
                <button 
                    onClick={copyCode}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2 shadow-lg shadow-slate-200"
                >
                    {copied ? <Check size={20} /> : <CodeIcon size={20} />}
                    {copied ? t('tools.font-pairer.actions.copied') : t('tools.font-pairer.actions.getCss')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Controls */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
                        <h3 className="font-bold text-slate-700">{t('tools.font-pairer.headings.presets')}</h3>
                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                            {Object.keys(PAIRINGS).map(key => (
                                <button
                                    key={key}
                                    onClick={() => setPairing(key)}
                                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between group ${
                                        theme === key 
                                            ? 'border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500' 
                                            : 'border-slate-200 hover:border-orange-300 hover:bg-orange-50/50'
                                    }`}
                                >
                                    <span className="font-medium">{t(`tools.font-pairer.themes.${PAIRINGS[key].labelKey}`)}</span>
                                    <div className="text-xs text-slate-400 group-hover:text-orange-500">
                                        {PAIRINGS[key].h} + {PAIRINGS[key].b}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
                        <h3 className="font-bold text-slate-700">{t('tools.font-pairer.headings.custom')}</h3>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">{t('tools.font-pairer.labels.headingFont')}</label>
                            <select 
                                value={headingFont}
                                onChange={(e) => {
                                    setHeadingFont(e.target.value);
                                    setTheme('custom');
                                }}
                                className="w-full rounded-xl border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                            >
                                {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">{t('tools.font-pairer.labels.bodyFont')}</label>
                            <select 
                                value={bodyFont}
                                onChange={(e) => {
                                    setBodyFont(e.target.value);
                                    setTheme('custom');
                                }}
                                className="w-full rounded-xl border-slate-200 focus:border-orange-500 focus:ring-orange-500"
                            >
                                {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden min-h-[600px] flex flex-col">
                        <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <div className="ml-4 bg-white px-3 py-1 rounded text-xs text-slate-400 border border-slate-200 flex-1 text-center">
                                {t('tools.font-pairer.labels.preview')}
                            </div>
                        </div>
                        <div className="p-12 flex-1 flex flex-col justify-center gap-8">
                            <h1 
                                className="text-5xl md:text-6xl font-black text-slate-900 leading-tight"
                                style={{ fontFamily: headingFont }}
                            >
                                {t('tools.font-pairer.previewText.heading')}
                            </h1>
                            <h2 
                                className="text-2xl md:text-3xl font-bold text-slate-700"
                                style={{ fontFamily: headingFont }}
                            >
                                {t('tools.font-pairer.previewText.subheading')}
                            </h2>
                            <p 
                                className="text-lg text-slate-600 leading-relaxed max-w-2xl"
                                style={{ fontFamily: bodyFont }}
                            >
                                {t('tools.font-pairer.previewText.body')}
                            </p>
                            <div className="flex gap-4 pt-4">
                                <button 
                                    className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold transition-transform active:scale-95"
                                    style={{ fontFamily: bodyFont }}
                                >
                                    {t('tools.font-pairer.previewText.primary')}
                                </button>
                                <button 
                                    className="px-8 py-3 border-2 border-slate-200 text-slate-700 rounded-full font-bold transition-transform active:scale-95 hover:border-slate-900"
                                    style={{ fontFamily: bodyFont }}
                                >
                                    {t('tools.font-pairer.previewText.secondary')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="font-pairer" categoryId="design" />
        </ToolPageLayout>
    );
}

function CodeIcon({ size }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
}
