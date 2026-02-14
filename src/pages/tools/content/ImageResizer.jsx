import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { Upload, Download, Maximize, Image as ImageIcon } from 'lucide-react';
import 'react-image-crop/dist/ReactCrop.css';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

// Helper for center crop
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function ImageResizer() {
    const { t } = useTranslation();
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [aspect, setAspect] = useState(1); // Default Square
    const [platform, setPlatform] = useState('instagram');
    const [format, setFormat] = useState('square');
    
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const platforms = {
        instagram: {
            name: t('tools.img-resizer.platforms.instagram'),
            formats: {
                square: { label: t('tools.img-resizer.formats.square'), aspect: 1/1 },
                portrait: { label: t('tools.img-resizer.formats.portrait'), aspect: 4/5 },
                landscape: { label: t('tools.img-resizer.formats.landscape'), aspect: 1.91/1 },
                story: { label: t('tools.img-resizer.formats.story'), aspect: 9/16 }
            }
        },
        facebook: {
            name: t('tools.img-resizer.platforms.facebook'),
            formats: {
                post: { label: t('tools.img-resizer.formats.fb_post'), aspect: 1.91/1 },
                square: { label: t('tools.img-resizer.formats.square'), aspect: 1/1 },
                story: { label: t('tools.img-resizer.formats.fb_story'), aspect: 9/16 },
                cover: { label: t('tools.img-resizer.formats.fb_cover'), aspect: 16/9 }
            }
        },
        twitter: {
            name: t('tools.img-resizer.platforms.twitter'),
            formats: {
                post: { label: t('tools.img-resizer.formats.tw_post'), aspect: 16/9 },
                square: { label: t('tools.img-resizer.formats.square'), aspect: 1/1 },
                header: { label: t('tools.img-resizer.formats.tw_header'), aspect: 3/1 }
            }
        },
        linkedin: {
            name: t('tools.img-resizer.platforms.linkedin'),
            formats: {
                post: { label: t('tools.img-resizer.formats.li_post'), aspect: 1.91/1 },
                square: { label: t('tools.img-resizer.formats.square'), aspect: 1/1 },
                cover: { label: t('tools.img-resizer.formats.li_cover'), aspect: 4/1 }
            }
        }
    };

    const handleSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined); // Makes crop preview update with new image
            const reader = new FileReader();
            reader.addEventListener('load', () => setImgSrc(reader.result.toString() || ''));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const initialCrop = centerAspectCrop(width, height, aspect);
        setCrop(initialCrop);
        setCompletedCrop(initialCrop); // Trigger initial preview
    };

    const handlePlatformChange = (p) => {
        setPlatform(p);
        // Default to first format of new platform
        const firstFormat = Object.keys(platforms[p].formats)[0];
        setFormat(firstFormat);
        const newAspect = platforms[p].formats[firstFormat].aspect;
        setAspect(newAspect);
        
        if (imgRef.current) {
             const { width, height } = imgRef.current;
             setCrop(centerAspectCrop(width, height, newAspect));
        }
    };

    const handleFormatChange = (f) => {
        setFormat(f);
        const newAspect = platforms[platform].formats[f].aspect;
        setAspect(newAspect);
        
        if (imgRef.current) {
             const { width, height } = imgRef.current;
             setCrop(centerAspectCrop(width, height, newAspect));
        }
    };

    const downloadResult = () => {
        if (!completedCrop || !previewCanvasRef.current) return;
        
        const canvas = previewCanvasRef.current;
        const url = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.download = `resized-${platform}-${format}.jpg`;
        link.href = url;
        link.click();
    };

    // Effect to update canvas preview
    useEffect(() => {
        if (
          completedCrop?.width &&
          completedCrop?.height &&
          imgRef.current &&
          previewCanvasRef.current
        ) {
          const image = imgRef.current;
          const canvas = previewCanvasRef.current;
          const crop = completedCrop;
    
          const scaleX = image.naturalWidth / image.width;
          const scaleY = image.naturalHeight / image.height;
          const ctx = canvas.getContext('2d');
          const pixelRatio = window.devicePixelRatio;
    
          canvas.width = crop.width * pixelRatio * scaleX;
          canvas.height = crop.height * pixelRatio * scaleY;
    
          ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          ctx.imageSmoothingQuality = 'high';
    
          ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY,
          );
        }
    }, [completedCrop]);

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Social Media Image Resizer | MiniTools by Spinotek</title>
                <meta name="description" content="Resize and crop images perfectly for Instagram, Twitter, Facebook, and LinkedIn." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-200">
                        <Maximize size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.img-resizer.title')}</h1>
                        <p className="text-slate-500">{t('tools.img-resizer.subtitle')}</p>
                    </div>
                </div>
                {completedCrop && (
                    <button 
                        onClick={downloadResult}
                        className="px-6 py-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-lg shadow-pink-200"
                    >
                        <Download size={20} /> {t('tools.img-resizer.buttons.download')}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
                        {!imgSrc && (
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:bg-slate-50 transition-colors text-center cursor-pointer relative">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleSelectFile}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <Upload className="mx-auto text-pink-500 mb-4" size={48} />
                                <p className="font-bold text-slate-700">{t('tools.img-resizer.labels.upload')}</p>
                            </div>
                        )}

                        {imgSrc && (
                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="p-2 bg-white rounded-lg border border-slate-200 text-pink-500">
                                    <ImageIcon size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-700 truncate">{t('tools.img-resizer.labels.loaded')}</p>
                                    <button onClick={() => setImgSrc('')} className="text-xs text-red-500 hover:text-red-700 font-medium">{t('tools.img-resizer.buttons.remove')}</button>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.img-resizer.labels.platform')}</label>
                            <div className="space-y-2">
                                {Object.keys(platforms).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => handlePlatformChange(p)}
                                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                                            platform === p 
                                                ? 'border-pink-500 bg-pink-50 text-pink-700 ring-1 ring-pink-500' 
                                                : 'border-slate-200 hover:border-pink-300 hover:bg-pink-50'
                                        }`}
                                    >
                                        {platforms[p].name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('tools.img-resizer.labels.format')}</label>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.keys(platforms[platform].formats).map(f => (
                                    <button
                                        key={f}
                                        onClick={() => handleFormatChange(f)}
                                        className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                                            format === f
                                                ? 'bg-slate-800 text-white border-slate-800'
                                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        {platforms[platform].formats[f].label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor/Preview */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-4 md:p-8 flex items-center justify-center min-h-[500px] overflow-hidden">
                        {imgSrc ? (
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={aspect}
                                className="max-h-[600px]"
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imgSrc}
                                    onLoad={onImageLoad}
                                    style={{ transform: `scale(1)` }} // Fix for some browsers
                                />
                            </ReactCrop>
                        ) : (
                            <div className="text-slate-500 flex flex-col items-center">
                                <Maximize size={48} className="mb-4 opacity-20" />
                                <p>{t('tools.img-resizer.placeholders.empty')}</p>
                            </div>
                        )}
                    </div>
                    {/* Hidden canvas for processing */}
                    <canvas
                        ref={previewCanvasRef}
                        className="hidden"
                    />
                </div>
            </div>

            <RelatedTools currentToolId="img-resizer" categoryId="content" />
        </ToolPageLayout>
    );
}
