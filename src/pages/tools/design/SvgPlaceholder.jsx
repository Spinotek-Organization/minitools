import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Image as ImageIcon, Copy, Download, Check, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function SvgPlaceholder() {
    const { t } = useTranslation();
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(150);
    const [text, setText] = useState('300x150');
    const [bgColor, setBgColor] = useState('#cccccc');
    const [textColor, setTextColor] = useState('#555555');
    const [fontSize, setFontSize] = useState(24);
    const [svgCode, setSvgCode] = useState('');
    const [dataUri, setDataUri] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="sans-serif" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dy=".3em">${text || `${width}x${height}`}</text>
</svg>`;
        setSvgCode(svg);
        setDataUri(`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`);
    }, [width, height, text, bgColor, textColor, fontSize]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(dataUri);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadSvg = () => {
        const blob = new Blob([svgCode], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `placeholder-${width}x${height}.svg`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.svg-placeholder.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.svg-placeholder.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                        <ImageIcon size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.svg-placeholder.title')}</h1>
                        <p className="text-slate-500">{t('tools.svg-placeholder.subtitle')}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={copyToClipboard}
                        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                        {copied ? <Check size={16} className="text-green-600"/> : <Copy size={16} />}
                        {copied ? t('tools.svg-placeholder.actions.copiedDataUri') : t('tools.svg-placeholder.actions.copyDataUri')}
                    </button>
                    <button 
                        onClick={downloadSvg}
                        className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-200"
                    >
                        <Download size={16} /> {t('tools.svg-placeholder.actions.downloadSvg')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6 h-fit">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.svg-placeholder.labels.width')}</label>
                            <input 
                                type="number" 
                                value={width}
                                onChange={(e) => setWidth(Number(e.target.value))}
                                className="w-full rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.svg-placeholder.labels.height')}</label>
                            <input 
                                type="number" 
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                className="w-full rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.svg-placeholder.labels.textContent')}</label>
                        <input 
                            type="text" 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={`${width}x${height}`}
                            className="w-full rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.svg-placeholder.labels.background')}</label>
                            <div className="flex gap-2">
                                <input 
                                    type="color" 
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                                />
                                <input 
                                    type="text" 
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="flex-1 rounded-xl border-slate-200 text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.svg-placeholder.labels.textColor')}</label>
                            <div className="flex gap-2">
                                <input 
                                    type="color" 
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                                />
                                <input 
                                    type="text" 
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    className="flex-1 rounded-xl border-slate-200 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.svg-placeholder.labels.fontSize')}</label>
                        <input 
                            type="range" 
                            min="10" 
                            max="100" 
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                        />
                         <div className="text-right text-xs text-slate-500 mt-1">{fontSize}px</div>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-2 space-y-6">
                     <div className="bg-slate-50 border border-slate-200 border-dashed rounded-3xl p-8 flex items-center justify-center min-h-[400px] overflow-auto">
                        <img src={dataUri} alt="Preview" className="max-w-full shadow-lg" />
                     </div>
                     
                     <div className="relative group">
                        <textarea 
                            readOnly
                            value={svgCode}
                            className="w-full h-32 bg-slate-900 text-emerald-300 font-mono text-xs p-4 rounded-xl resize-none focus:outline-none"
                        />
                        <div className="absolute top-2 right-2 text-xs text-slate-500 font-mono bg-slate-800 px-2 py-1 rounded">
                            {t('tools.svg-placeholder.labels.svgSource')}
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="svg-placeholder" categoryId="design" />
        </ToolPageLayout>
    );
}
