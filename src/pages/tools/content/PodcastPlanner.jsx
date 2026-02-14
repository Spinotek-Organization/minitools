import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mic, Download, Plus, Trash2, GripVertical, Clock } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function PodcastPlanner() {
    const { t } = useTranslation('tools');
    const [title, setTitle] = useState('');
    const [sections, setSections] = useState([
        { id: 1, label: 'Intro Music', duration: 15, notes: 'Theme song fade in/out' },
        { id: 2, label: 'Host Intro', duration: 60, notes: 'Welcome listeners, introduce topic' },
        { id: 3, label: 'Guest Bio', duration: 120, notes: 'Introduce guest background' },
        { id: 4, label: 'Main Interview', duration: 1800, notes: 'Key questions...' },
        { id: 5, label: 'Sponsor Ad', duration: 60, notes: 'Read ad script' },
        { id: 6, label: 'Outro', duration: 30, notes: 'Wrap up, CTA, call out next episode' }
    ]);
    const [draggedItem, setDraggedItem] = useState(null);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const updateSection = (id, field, value) => {
         setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const addSection = () => {
        const newId = Math.max(...sections.map(s => s.id), 0) + 1;
        setSections([...sections, { id: newId, label: 'New Segment', duration: 60, notes: '' }]);
    };

    const removeSection = (id) => {
        setSections(sections.filter(s => s.id !== id));
    };

    // Drag and Drop Handlers
    const onDragStart = (e, index) => {
        setDraggedItem(index);
        e.dataTransfer.effectAllowed = "move";
        // e.dataTransfer.setDragImage(e.target, 20, 20);
    };

    const onDragOver = (e, index) => {
        e.preventDefault();
    };

    const onDrop = (e, index) => {
        e.preventDefault();
        const draggedIdx = draggedItem;
        const dropIdx = index;

        if (draggedIdx === null || draggedIdx === dropIdx) return;

        const newSections = [...sections];
        const [removed] = newSections.splice(draggedIdx, 1);
        newSections.splice(dropIdx, 0, removed);

        setSections(newSections);
        setDraggedItem(null);
    };

    const totalDuration = sections.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);

    const downloadAgenda = () => {
        const content = `PODCAST AGENDA: ${title || 'Untitled Episode'}\n` +
                        `Total Duration: ${formatTime(totalDuration)}\n\n` +
                        sections.map((s, i) => 
                            `${i + 1}. ${s.label} (${formatTime(s.duration)})\n   Notes: ${s.notes}\n`
                        ).join('\n');
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${(title || 'podcast-agenda').replace(/\s+/g, '-').toLowerCase()}.txt`;
        link.href = url;
        link.click();
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('podcast-planner.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('podcast-planner.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-violet-200">
                        <Mic size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('podcast-planner.title')}</h1>
                        <p className="text-slate-500">{t('podcast-planner.subtitle')}</p>
                    </div>
                </div>
                {sections.length > 0 && (
                    <button 
                        onClick={downloadAgenda}
                        className="px-6 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-colors flex items-center gap-2 shadow-lg shadow-violet-200"
                    >
                        <Download size={20} /> {t('podcast-planner.buttons.export')}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Overview */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">{t('podcast-planner.labels.episodeTitle')}</label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={t('podcast-planner.placeholders.title')}
                                className="w-full rounded-xl border-slate-200 focus:border-violet-500 focus:ring-violet-500"
                            />
                        </div>
                        
                        <div className="bg-violet-50 rounded-2xl p-6 border border-violet-100 text-center">
                             <div className="text-violet-500 mb-2 flex justify-center"><Clock size={32} /></div>
                             <div className="text-sm font-bold text-violet-400 uppercase tracking-widest mb-1">{t('podcast-planner.labels.totalDuration')}</div>
                             <div className="text-4xl font-black text-violet-900">{formatTime(totalDuration)}</div>
                             <div className="text-xs text-violet-400 mt-2">({t('podcast-planner.labels.totalMinutes', { count: Math.round(totalDuration / 60) })})</div>
                        </div>
                    </div>
                </div>

                {/* Agenda Builder */}
                <div className="lg:col-span-2 space-y-4">
                    {sections.map((section, index) => (
                        <div 
                            key={section.id} 
                            draggable
                            onDragStart={(e) => onDragStart(e, index)}
                            onDragOver={(e) => onDragOver(e, index)}
                            onDrop={(e) => onDrop(e, index)}
                            className={`bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-violet-200 transition-all group ${
                                draggedItem === index ? 'opacity-50 border-dashed border-violet-300' : 'opacity-100'
                            }`}
                        >
                            <div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                                <div className="p-2 text-slate-300 cursor-grab active:cursor-grabbing hidden md:block">
                                    <GripVertical size={20} />
                                </div>
                                <div className="flex-1 w-full space-y-2">
                                     <div className="flex gap-2">
                                         <input 
                                            type="text" 
                                            value={section.label}
                                            onChange={(e) => updateSection(section.id, 'label', e.target.value)}
                                            className="font-bold text-slate-700 border-none p-0 focus:ring-0 w-full placeholder-slate-300 text-lg"
                                            placeholder={t('podcast-planner.placeholders.segment')}
                                         />
                                     </div>
                                     <input 
                                        type="text" 
                                        value={section.notes}
                                        onChange={(e) => updateSection(section.id, 'notes', e.target.value)}
                                        className="text-sm text-slate-500 border-none p-0 focus:ring-0 w-full placeholder-slate-300"
                                        placeholder={t('podcast-planner.placeholders.notes')}
                                     />
                                </div>
                                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                        <Clock size={14} className="text-slate-400" />
                                        <input 
                                            type="number" 
                                            value={section.duration}
                                            onChange={(e) => updateSection(section.id, 'duration', Number(e.target.value))}
                                            className="w-12 bg-transparent border-none p-0 text-right text-sm font-mono font-bold text-slate-700 focus:ring-0"
                                        />
                                        <span className="text-xs text-slate-400">{t('podcast-planner.labels.seconds')}</span>
                                    </div>
                                    <button 
                                        onClick={() => removeSection(section.id)}
                                        className="text-slate-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <button 
                        onClick={addSection}
                        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:text-violet-500 hover:border-violet-300 hover:bg-violet-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={20} /> {t('podcast-planner.buttons.addSegment')}
                    </button>
                </div>
            </div>

            <RelatedTools currentToolId="podcast-planner" categoryId="content" />
        </ToolPageLayout>
    );
}
