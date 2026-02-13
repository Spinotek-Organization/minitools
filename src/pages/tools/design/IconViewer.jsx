import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Upload, Download, Code, Check } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function IconViewer() {
    const { t } = useTranslation();
    const [svgContent, setSvgContent] = useState('');
    const [fileName, setFileName] = useState('');
    const [fill, setFill] = useState('#000000');
    const [stroke, setStroke] = useState('none');
    const [strokeWidth, setStrokeWidth] = useState(0);
    const [optimized, setOptimized] = useState(false);
    const [outputSvg, setOutputSvg] = useState('');
    const [copied, setCopied] = useState(false);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'image/svg+xml') {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                setSvgContent(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    useEffect(() => {
        if (!svgContent) return;

        let modified = svgContent;

        if (optimized) {
            modified = modified.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments
            modified = modified.replace(/<\?xml.*?\?>/, ''); // Remove xml decl
            modified = modified.replace(/<!DOCTYPE.*?>/, ''); // Remove doctype
            modified = modified.replace(/\s+/g, ' '); // Minify whitespace
        }

        const setAttr = (str, attr, val) => {
            const regex = new RegExp(`(<svg[^>]*?)(${attr}="[^"]*")`, 'i');
            if (regex.test(str)) {
                return str.replace(regex, `$1${attr}="${val}"`);
            } else {
                return str.replace('<svg', `<svg ${attr}="${val}"`);
            }
        };

        if (fill) modified = setAttr(modified, 'fill', fill);
        if (stroke) modified = setAttr(modified, 'stroke', stroke);
        if (strokeWidth > 0) modified = setAttr(modified, 'stroke-width', strokeWidth);

        setOutputSvg(modified);

    }, [svgContent, fill, stroke, strokeWidth, optimized]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(outputSvg);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadSvg = () => {
        const blob = new Blob([outputSvg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `modified-${fileName}`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.icon-viewer.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.icon-viewer.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <Search size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.icon-viewer.title')}</h1>
                        <p className="text-slate-500">{t('tools.icon-viewer.subtitle')}</p>
                    </div>
                </div>
                {outputSvg && (
                    <div className="flex gap-2">
                         <button 
                            onClick={copyToClipboard}
                            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
                        >
                            {copied ? <Check size={16} className="text-green-600"/> : <Code size={16} />}
                            {copied ? t('tools.icon-viewer.actions.copied') : t('tools.icon-viewer.actions.copy')}
                        </button>
                        <button 
                            onClick={downloadSvg}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
                        >
                            <Download size={16} /> {t('tools.icon-viewer.actions.download')}
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Controls */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6 h-fit">
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors relative">
                        <input 
                            type="file" 
                            accept=".svg"
                            onChange={handleFileUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Upload className="mx-auto text-blue-500 mb-2" size={32} />
                        <p className="text-sm font-bold text-slate-700">{t('tools.icon-viewer.labels.upload')}</p>
                    </div>

                    {svgContent && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">{t('tools.icon-viewer.labels.fill')}</label>
                                <div className="flex gap-2">
                                    <input type="color" value={fill} onChange={e => setFill(e.target.value)} className="w-8 h-8 rounded border-none p-0 cursor-pointer"/>
                                    <input type="text" value={fill} onChange={e => setFill(e.target.value)} className="flex-1 text-sm border-slate-200 rounded-lg"/>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">{t('tools.icon-viewer.labels.stroke')}</label>
                                <div className="flex gap-2">
                                     <input type="color" value={stroke === 'none' ? '#000000' : stroke} onChange={e => setStroke(e.target.value)} disabled={stroke === 'none'} className={`w-8 h-8 rounded border-none p-0 cursor-pointer ${stroke === 'none' ? 'opacity-50' : ''}`}/>
                                     <div className="flex-1 flex gap-2">
                                         <input type="text" value={stroke} onChange={e => setStroke(e.target.value)} className="flex-1 text-sm border-slate-200 rounded-lg"/>
                                         <button onClick={() => setStroke(stroke === 'none' ? '#000000' : 'none')} className="text-xs font-bold px-2 bg-slate-100 rounded hover:bg-slate-200">
                                             {stroke === 'none' ? t('tools.icon-viewer.actions.set') : t('tools.icon-viewer.actions.none')}
                                         </button>
                                     </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">{t('tools.icon-viewer.labels.width')}: {strokeWidth}</label>
                                <input type="range" min="0" max="20" value={strokeWidth} onChange={e => setStrokeWidth(Number(e.target.value))} className="w-full accent-blue-600 h-2 bg-slate-200 rounded-full"/>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <label className="text-sm font-bold text-slate-700">{t('tools.icon-viewer.labels.optimize')}</label>
                                <input 
                                    type="checkbox" 
                                    checked={optimized} 
                                    onChange={e => setOptimized(e.target.checked)}
                                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview */}
                <div className="lg:col-span-2">
                    {outputSvg ? (
                         <div className="space-y-6">
                            <div className="bg-checkered border border-slate-200 rounded-3xl p-12 flex items-center justify-center min-h-[400px]">
                                <div 
                                    className="w-full h-full max-w-[300px] max-h-[300px]"
                                    dangerouslySetInnerHTML={{ __html: outputSvg }}
                                />
                            </div>
                            
                            <div className="relative group">
                                <textarea 
                                    readOnly
                                    value={outputSvg}
                                    className="w-full h-48 bg-slate-900 text-blue-300 font-mono text-xs p-4 rounded-xl resize-none focus:outline-none"
                                />
                            </div>
                         </div>
                    ) : (
                        <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
                            {t('tools.icon-viewer.labels.placeholder')}
                        </div>
                    )}
                </div>
            </div>

            <RelatedTools currentToolId="icon-viewer" categoryId="design" />
        </ToolPageLayout>
    );
}
