import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Upload, Trash2, Move, Download } from 'lucide-react';
import { toBlob } from 'html-to-image';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function InstagramGrid() {
    const [images, setImages] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const fileInputRef = useRef(null);
    const gridRef = useRef(null);

    const downloadGrid = async () => {
        if (!gridRef.current || images.length === 0) return;
        setIsDownloading(true);

        try {
            // Small delay to ensure any hover states (if any stuck) are cleared
            await new Promise(resolve => setTimeout(resolve, 100));

            const blob = await toBlob(gridRef.current, { 
                cacheBust: false,
                backgroundColor: '#ffffff',
                filter: (node) => {
                    // Safe filter for UI elements
                    if (node.tagName === 'BUTTON') return false;
                    if (node.classList && node.classList.contains && node.classList.contains('exclude-from-export')) return false;
                    return true;
                }
            });

            if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = 'instagram-grid.png';
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
            }
        } catch (err) {
            console.error('Failed to download grid:', err);
            alert('Download failed. Please try fewer images or a different browser.');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleFiles = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            url: URL.createObjectURL(file),
            file
        }));
        setImages([...images, ...newImages].slice(0, 12)); // Max 12
    }

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    }

    const onDragStart = (e, index) => {
        setDraggedItem(index);
        e.dataTransfer.effectAllowed = "move";
        // e.dataTransfer.setDragImage(e.target, 20, 20); // Optional: customize drag image
    };

    const onDragOver = (e, index) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const onDrop = (e, index) => {
        e.preventDefault();
        const draggedIdx = draggedItem;
        const dropIdx = index;

        if (draggedIdx === dropIdx) return;

        const newImages = [...images];
        const [removed] = newImages.splice(draggedIdx, 1);
        newImages.splice(dropIdx, 0, removed);

        setImages(newImages);
        setDraggedItem(null);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Instagram Grid Preview | MiniTools by Spinotek</title>
                <meta name="description" content="Visualize and plan your Instagram feed aesthetic with our grid planner." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-fuchsia-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-fuchsia-200">
                        <Grid size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Instagram Grid Preview</h1>
                        <p className="text-slate-500">Plan your feed aesthetic (Drag to Reorder).</p>
                    </div>
                </div>
                <button 
                    onClick={() => setImages([])}
                    className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                    Clear All
                </button>
                {images.length > 0 && (
                    <button 
                        onClick={downloadGrid}
                        disabled={isDownloading}
                        className="px-4 py-2 text-sm font-medium bg-fuchsia-600 text-white hover:bg-fuchsia-700 rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-fuchsia-200 disabled:opacity-50 disabled:cursor-wait"
                    >
                        <Download size={16} /> {isDownloading ? 'Saving...' : 'Download Grid'}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload */}
                <div className="lg:col-span-1 space-y-6">
                    <div 
                        onClick={() => fileInputRef.current.click()}
                        className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 hover:bg-slate-50 transition-colors text-center cursor-pointer group"
                    >
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            multiple 
                            accept="image/*"
                            className="hidden" 
                            onChange={handleFiles}
                        />
                        <div className="w-16 h-16 bg-fuchsia-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-fuchsia-100 text-fuchsia-500 transition-colors">
                            <Upload size={32} />
                        </div>
                        <h3 className="font-bold text-slate-700 text-lg mb-2">Upload Photos</h3>
                        <p className="text-slate-400 text-sm">Select up to 12 images to preview your grid layout.</p>
                    </div>

                    <div className="bg-fuchsia-50 rounded-2xl p-6 border border-fuchsia-100">
                        <h4 className="font-bold text-fuchsia-800 mb-2 flex items-center gap-2">
                            <Move size={16} /> How to use
                        </h4>
                        <ul className="text-sm text-fuchsia-700/80 space-y-2 list-disc pl-4">
                            <li>Upload multiple images at once.</li>
                            <li>Drag and drop images in the preview to reorder them based on your posting schedule.</li>
                            <li>The top-left image represents your newest post.</li>
                        </ul>
                    </div>
                </div>

                {/* Grid Preview */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden max-w-md mx-auto">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <span className="font-bold text-slate-700">Preview</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Posts</span>
                        </div>
                        
                        {images.length > 0 ? (
                            <div ref={gridRef} className="grid grid-cols-3 gap-0.5 bg-white">
                                {images.map((img, idx) => (
                                    <div 
                                        key={img.id}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, idx)}
                                        onDragOver={(e) => onDragOver(e, idx)}
                                        onDrop={(e) => onDrop(e, idx)}
                                        className={`aspect-square relative group cursor-move overflow-hidden bg-slate-100 transition-opacity ${draggedItem === idx ? 'opacity-50' : 'opacity-100'}`}
                                    >
                                        <img 
                                            src={img.url} 
                                            alt="Post" 
                                            className="w-full h-full object-cover pointer-events-none"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center exclude-from-export">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                                className="p-2 bg-white/20 rounded-full hover:bg-red-500 hover:text-white text-white transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                        <div className="absolute top-1 left-1 bg-black/40 text-white text-[10px] px-1.5 rounded font-mono opacity-0 group-hover:opacity-100 exclude-from-export">
                                            {idx + 1}
                                        </div>
                                    </div>
                                ))}
                                {/* Fill empty slots to maintain 3-col look if needed */}
                                {[...Array(Math.max(0, (3 - (images.length % 3)) % 3))].map((_, i) => (
                                    <div key={`empty-${i}`} className="aspect-square bg-slate-50 border border-slate-100 flex items-center justify-center">
                                        <span className="text-slate-200 text-xs">Empty</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="aspect-[3/4] flex flex-col items-center justify-center text-slate-300 bg-slate-50/50">
                                <Grid size={48} className="mb-4 opacity-30" />
                                <p>Grid is empty</p>
                            </div>
                        )}
                        
                        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-around text-slate-400">
                             <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                             <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                             <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                             <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                             <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="ig-grid" categoryId="content" />
        </ToolPageLayout>
    );
}
