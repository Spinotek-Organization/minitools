import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Video, Copy, Download, RefreshCw, GripVertical, Plus, Trash2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function VideoScript() {
    const { t } = useTranslation('tools');
    const [topic, setTopic] = useState('');
    const [framework, setFramework] = useState('educational');
    const [blocks, setBlocks] = useState([]);
    const [copied, setCopied] = useState(false);

    const frameworks = t('video-outline.frameworks', { returnObjects: true }) || {};

    const generateOutline = () => {
        const newBlocks = (frameworks[framework]?.blocks || []).map(b => ({
            ...b,
            content: ''
        }));
        setBlocks(newBlocks);
    };

    const updateBlock = (index, content) => {
        const newBlocks = [...blocks];
        newBlocks[index].content = content;
        setBlocks(newBlocks);
    };

    const addBlock = () => {
        setBlocks([...blocks, { label: 'New Section', hint: 'Custom section', content: '' }]);
    };

    const removeBlock = (index) => {
        setBlocks(blocks.filter((_, i) => i !== index));
    };

    const copyScript = () => {
        const text = blocks.map(b => `[${b.label}]\n${b.content}\n`).join('\n');
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadScript = () => {
        const text = blocks.map(b => `[${b.label}]\n${b.content}\n`).join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${topic.replace(/\s+/g, '-').toLowerCase() || 'script'}.txt`;
        link.href = url;
        link.click();
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('video-outline.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('video-outline.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200">
                        <Video size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('video-outline.title')}</h1>
                        <p className="text-slate-500">{t('video-outline.subtitle')}</p>
                    </div>
                </div>
                {blocks.length > 0 && (
                    <div className="flex gap-2">
                        <button 
                            onClick={copyScript}
                            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
                        >
                            {copied ? t('video-outline.buttons.copied') : t('video-outline.buttons.copy')}
                        </button>
                        <button 
                            onClick={downloadScript}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-200"
                        >
                            <Download size={16} /> {t('video-outline.buttons.download')}
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Setup */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('video-outline.labels.topic')}</label>
                            <input 
                                type="text" 
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder={t('video-outline.placeholders.topic')}
                                className="w-full rounded-xl border-slate-200 focus:border-red-500 focus:ring-red-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('video-outline.labels.framework')}</label>
                            <div className="space-y-2">
                                {Object.keys(frameworks).map(key => (
                                    <button
                                        key={key}
                                        onClick={() => setFramework(key)}
                                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                                            framework === key 
                                                ? 'border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500' 
                                                : 'border-slate-200 hover:border-red-300 hover:bg-red-50'
                                        }`}
                                    >
                                        {frameworks[key].title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={generateOutline}
                            className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                        >
                            {t('video-outline.buttons.generate')}
                        </button>
                    </div>
                </div>

                {/* Editor */}
                <div className="lg:col-span-2 space-y-6">
                    {blocks.length > 0 ? (
                        <div className="space-y-4">
                            {blocks.map((block, index) => (
                                <div key={index} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:border-red-200 transition-colors">
                                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 bg-white border border-slate-200 rounded text-slate-400 cursor-grab active:cursor-grabbing">
                                                <GripVertical size={14} />
                                            </div>
                                            <div>
                                                <span className="font-bold text-slate-700 text-sm block">{block.label}</span>
                                                <span className="text-xs text-slate-500">{block.hint}</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => removeBlock(index)}
                                            className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <textarea 
                                        value={block.content}
                                        onChange={(e) => updateBlock(index, e.target.value)}
                                        placeholder={t('video-outline.placeholders.write', { label: block.label.toLowerCase() })}
                                        className="w-full p-4 min-h-[100px] border-none focus:ring-0 resize-y text-slate-700 placeholder-slate-300"
                                    />
                                </div>
                            ))}
                            
                            <button 
                                onClick={addBlock}
                                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus size={20} /> {t('video-outline.buttons.add')}
                            </button>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                            <Video size={48} className="mb-4 opacity-50" />
                            <p className="font-medium">{t('video-outline.messages.empty')}</p>
                        </div>
                    )}
                </div>
            </div>

            <RelatedTools currentToolId="video-outline" categoryId="content" />
        </ToolPageLayout>
    );
}
