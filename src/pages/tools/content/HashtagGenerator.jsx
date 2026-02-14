import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hash, Save, Copy, Trash2, Check, RefreshCw } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function HashtagManager() {
    const { t } = useTranslation('tools');
    const [text, setText] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [savedGroups, setSavedGroups] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('minitools_hashtags');
            if (saved) {
                setSavedGroups(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Failed to load saved hashtags:', error);
            // Optionally clear corrupt data
            localStorage.removeItem('minitools_hashtags');
        }
    }, []);

    useEffect(() => {
        // Parse hashtags from text
        if (!text) {
            setHashtags([]);
            return;
        }
        // Allow comma, space, newline separators
        const tags = text.match(/#[a-z0-9_]+/gi) || [];
        setHashtags(tags);
    }, [text]);

    const updateText = (newText) => {
        setText(newText);
    };

    const removeDuplicates = () => {
        const unique = [...new Set(hashtags)];
        setText(unique.join(' '));
    };

    const addSpaces = () => {
        setText(hashtags.join(' '));
    };

    const toLowercase = () => {
        setText(text.toLowerCase());
    };

    const saveGroup = () => {
        if (!groupName || hashtags.length === 0) return;
        const newGroup = {
            id: Date.now(),
            name: groupName,
            tags: hashtags.join(' ')
        };
        const updated = [newGroup, ...savedGroups];
        setSavedGroups(updated);
        localStorage.setItem('minitools_hashtags', JSON.stringify(updated));
        setGroupName('');
    };

    const deleteGroup = (id) => {
        const updated = savedGroups.filter(g => g.id !== id);
        setSavedGroups(updated);
        localStorage.setItem('minitools_hashtags', JSON.stringify(updated));
    };

    const loadGroup = (tags) => {
        setText(tags);
    };

    const copyToClipboard = (content) => {
        navigator.clipboard.writeText(content || text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('hashtag-manager.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('hashtag-manager.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <Hash size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('hashtag-manager.title')}</h1>
                        <p className="text-slate-500">{t('hashtag-manager.subtitle')}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setText('')}
                        className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
                    >
                        {t('hashtag-manager.buttons.clear')}
                    </button>
                    <button 
                        onClick={() => copyToClipboard()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
                    >
                        {copied ? t('hashtag-manager.buttons.copied') : t('hashtag-manager.buttons.copyAll')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4 shadow-sm">
                        <textarea 
                            value={text}
                            onChange={(e) => updateText(e.target.value)}
                            placeholder={t('hashtag-manager.placeholders.input')}
                            className="w-full h-48 p-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                        />
                        
                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                            <div className={`text-sm font-bold ${hashtags.length > 30 ? 'text-red-500' : 'text-slate-500'}`}>
                                {t('hashtag-manager.labels.count', { count: hashtags.length })}
                            </div>
                            
                            <div className="flex gap-2">
                                <button onClick={removeDuplicates} className="text-xs font-medium px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
                                    {t('hashtag-manager.buttons.removeDupes')}
                                </button>
                                <button onClick={addSpaces} className="text-xs font-medium px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
                                    {t('hashtag-manager.buttons.fixSpacing')}
                                </button>
                                <button onClick={toLowercase} className="text-xs font-medium px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
                                    {t('hashtag-manager.buttons.lowercase')}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4">
                        <h3 className="font-bold text-slate-700">{t('hashtag-manager.headings.saveGroup')}</h3>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                placeholder={t('hashtag-manager.placeholders.groupName')}
                                className="flex-1 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                            />
                            <button 
                                onClick={saveGroup} 
                                disabled={!groupName || hashtags.length === 0}
                                className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Save size={18} /> {t('hashtag-manager.buttons.save')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Saved Groups */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4 h-full max-h-[600px] overflow-y-auto">
                        <h3 className="font-bold text-slate-700 sticky top-0 bg-white py-2 border-b border-slate-100">{t('hashtag-manager.headings.savedGroups')}</h3>
                        
                        {savedGroups.length === 0 ? (
                            <div className="text-slate-400 text-center py-8">
                                <p>{t('hashtag-manager.messages.empty')}</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {savedGroups.map(group => (
                                    <div key={group.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors group relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-slate-700">{group.name}</h4>
                                            <div className="flex gap-1">
                                                 <button 
                                                    onClick={() => loadGroup(group.tags)}
                                                    className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                                                    title={t('hashtag-manager.tooltips.load')}
                                                >
                                                    <RefreshCw size={14} />
                                                </button>
                                                <button 
                                                    onClick={() => deleteGroup(group.id)}
                                                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                                                    title={t('hashtag-manager.tooltips.delete')}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-500 line-clamp-2 mb-3 bg-white p-2 rounded border border-slate-100 font-mono">
                                            {group.tags}
                                        </p>
                                        <button 
                                            onClick={() => copyToClipboard(group.tags)}
                                            className="w-full py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                                        >
                                            <Copy size={12} /> {t('hashtag-manager.buttons.copyGroup')}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="hashtag-manager" categoryId="content" />
        </ToolPageLayout>
    );
}
