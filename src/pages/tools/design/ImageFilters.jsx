import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Wand2, Upload, Download, Eye, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function ImageFilters() {
    const { t } = useTranslation();
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [filters, setFilters] = useState({
        brightness: 100,
        contrast: 100,
        saturate: 100,
        blur: 0,
        hueRotate: 0,
        grayscale: 0,
        sepia: 0,
    });
    const canvasRef = useRef(null);
    const [showOriginal, setShowOriginal] = useState(false);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = new Image();
                img.src = ev.target.result;
                img.onload = () => {
                    setImage(img);
                    applyFilters(img, filters);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const applyFilters = (img, currentFilters) => {
        if (!img) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        const filterString = `
            brightness(${currentFilters.brightness}%) 
            contrast(${currentFilters.contrast}%) 
            saturate(${currentFilters.saturate}%) 
            blur(${currentFilters.blur}px) 
            hue-rotate(${currentFilters.hueRotate}deg) 
            grayscale(${currentFilters.grayscale}%) 
            sepia(${currentFilters.sepia}%)
        `;
        
        ctx.filter = filterString;
        ctx.drawImage(img, 0, 0);
        setPreviewUrl(canvas.toDataURL());
    };

    useEffect(() => {
        if (image) {
            applyFilters(image, filters);
        }
    }, [filters, image]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({
            brightness: 100,
            contrast: 100,
            saturate: 100,
            blur: 0,
            hueRotate: 0,
            grayscale: 0,
            sepia: 0,
        });
    };

    const downloadImage = () => {
        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = previewUrl;
        link.click();
    };

    const presets = {
        'Vintage': { brightness: 110, contrast: 90, saturate: 70, sepia: 40, hueRotate: 0, blur: 0, grayscale: 0 },
        'Grayscale': { brightness: 100, contrast: 100, saturate: 0, grayscale: 100, sepia: 0, hueRotate: 0, blur: 0 },
        'Warm': { brightness: 105, contrast: 105, saturate: 110, sepia: 20, hueRotate: 0, blur: 0, grayscale: 0 },
        'Cool': { brightness: 105, contrast: 105, saturate: 90, sepia: 0, hueRotate: 180, blur: 0, grayscale: 0 }, // Hue rotate 180 is extreme, maybe small shift
        'Dramatic': { brightness: 90, contrast: 150, saturate: 120, sepia: 0, hueRotate: 0, blur: 0, grayscale: 0 },
    };

    const applyPreset = (name) => {
        if (presets[name]) {
            setFilters(presets[name]);
        }
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.image-filters.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.image-filters.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-200">
                        <Wand2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.image-filters.title')}</h1>
                        <p className="text-slate-500">{t('tools.image-filters.subtitle')}</p>
                    </div>
                </div>
                {image && (
                     <div className="flex gap-2">
                         <button 
                            onClick={resetFilters}
                            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
                         >
                             <RefreshCw size={16} /> {t('tools.image-filters.actions.reset')}
                         </button>
                         <button 
                            onMouseDown={() => setShowOriginal(true)}
                            onMouseUp={() => setShowOriginal(false)}
                            onMouseLeave={() => setShowOriginal(false)}
                            onTouchStart={() => setShowOriginal(true)}
                            onTouchEnd={() => setShowOriginal(false)}
                            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 select-none"
                         >
                             <Eye size={16} /> {t('tools.image-filters.actions.compare')}
                         </button>
                         <button 
                            onClick={downloadImage}
                            className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-xl hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-lg shadow-pink-200"
                         >
                             <Download size={16} /> {t('tools.image-filters.actions.download')}
                         </button>
                     </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-8 h-fit max-h-[800px] overflow-y-auto">
                    {!image && (
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:bg-slate-50 transition-colors text-center cursor-pointer relative">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <Upload className="mx-auto text-pink-500 mb-4" size={48} />
                            <p className="font-bold text-slate-700">{t('tools.image-filters.labels.upload')}</p>
                        </div>
                    )}

                    {image && (
                        <>
                            <div>
                                <h3 className="font-bold text-slate-700 mb-4">{t('tools.image-filters.labels.presets')}</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {Object.keys(presets).map(name => (
                                        <button 
                                            key={name}
                                            onClick={() => applyPreset(name)}
                                            className="px-2 py-2 text-xs font-bold bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-pink-600 rounded-lg transition-colors border border-slate-200 hover:border-pink-200"
                                        >
                                            {t(`tools.image-filters.presets.${name.toLowerCase()}`)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-700">{t('tools.image-filters.labels.adjustments')}</h3>
                                
                                {Object.entries(filters).map(([key, value]) => (
                                    <div key={key}>
                                        <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                                            <span>{t(`tools.image-filters.filters.${key}`)}</span>
                                            <span>{value}{key === 'blur' ? 'px' : (key === 'hueRotate' ? 'deg' : '%')}</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min={key === 'blur' ? 0 : (key === 'hueRotate' ? 0 : 0)} 
                                            max={key === 'blur' ? 20 : (key === 'hueRotate' ? 360 : 300)} 
                                            value={value}
                                            onChange={(e) => handleFilterChange(key, Number(e.target.value))}
                                            className="w-full accent-pink-600 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Preview */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-900 rounded-3xl overflow-hidden flex items-center justify-center min-h-[500px] relative shadow-2xl">
                        {!image ? (
                             <div className="text-slate-500">{t('tools.image-filters.labels.noImage')}</div>
                        ) : (
                             <img 
                                src={showOriginal ? image.src : previewUrl} 
                                alt="Preview" 
                                className="max-w-full max-h-[700px] object-contain transition-all duration-100"
                             />
                        )}
                        {showOriginal && (
                            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
                                {t('tools.image-filters.labels.original')}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />

            <RelatedTools currentToolId="image-filters" categoryId="design" />
        </ToolPageLayout>
    );
}
