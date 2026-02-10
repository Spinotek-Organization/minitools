import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Save, BookOpen, Calendar, Download } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function GratitudeJournal() {
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem('minitools-gratitude');
        return saved ? JSON.parse(saved) : [];
    });
    
    // Form State
    const [q1, setQ1] = useState('');
    const [q2, setQ2] = useState('');
    const [q3, setQ3] = useState('');
    const [activeTab, setActiveTab] = useState('write'); // 'write', 'history'

    useEffect(() => {
        localStorage.setItem('minitools-gratitude', JSON.stringify(entries));
    }, [entries]);

    const handleSave = (e) => {
        e.preventDefault();
        if (!q1.trim() && !q2.trim() && !q3.trim()) return;

        const newEntry = {
            id: Date.now(),
            date: new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            timestamp: new Date().toISOString(),
            q1,
            q2,
            q3
        };

        setEntries([newEntry, ...entries]);
        setQ1('');
        setQ2('');
        setQ3('');
        setActiveTab('history');
    };

    const downloadJournal = () => {
        const text = entries.map(e => 
            `Date: ${e.date}\n\n1. I am grateful for...\n${e.q1}\n\n2. What would make today great?\n${e.q2}\n\n3. Daily Affirmation\n${e.q3}\n\n-------------------\n`
        ).join('\n');
        
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-gratitude-journal.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Gratitude Journal | MiniTools by Spinotek</title>
                <meta name="description" content="Improve your well-being by reflecting on positive moments." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Heart size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Gratitude Journal</h1>
                        <p className="text-slate-500 text-sm">Improve your well-being by reflecting on positive moments.</p>
                    </div>
                </div>
                <div className="bg-slate-100 p-1 rounded-xl flex">
                    <button 
                        onClick={() => setActiveTab('write')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'write' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Write Entry
                    </button>
                    <button 
                         onClick={() => setActiveTab('history')}
                         className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        History ({entries.length})
                    </button>
                </div>
            </div>

            {activeTab === 'write' ? (
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                        <div className="text-center mb-8">
                            <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Daily Check-in</span>
                            <h2 className="text-xl font-bold mt-2 text-slate-800">
                                {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                            </h2>
                        </div>

                        <form onSubmit={handleSave} className="space-y-8">
                            <div>
                                <label className="block text-slate-900 font-semibold mb-2">1. I am grateful for...</label>
                                <textarea 
                                    value={q1}
                                    onChange={(e) => setQ1(e.target.value)}
                                    placeholder="List three things you are thankful for today..."
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px]"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-900 font-semibold mb-2">2. What would make today great?</label>
                                <textarea 
                                    value={q2}
                                    onChange={(e) => setQ2(e.target.value)}
                                    placeholder="Mention small wins or goals..."
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px]"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-900 font-semibold mb-2">3. Daily Affirmation</label>
                                <textarea 
                                    value={q3}
                                    onChange={(e) => setQ3(e.target.value)}
                                    placeholder="I am..."
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px]"
                                />
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-pink-200 transition-all flex items-center justify-center gap-2"
                            >
                                <Save size={20} />
                                Save Entry
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto space-y-6">
                    {entries.length > 0 && (
                         <div className="flex justify-end">
                            <button 
                                onClick={downloadJournal}
                                className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-xl transition-colors"
                            >
                                <Download size={18} />
                                Download Journal (TXT)
                            </button>
                         </div>
                    )}

                    {entries.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
                             <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                             <p className="text-slate-500">No entries yet. Start writing your first one!</p>
                             <button onClick={() => setActiveTab('write')} className="mt-4 text-pink-600 font-bold hover:underline">
                                Write Now
                             </button>
                        </div>
                    ) : (
                        entries.map(entry => (
                            <div key={entry.id} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                                    <Calendar size={18} className="text-pink-500" />
                                    <h3 className="font-bold text-slate-900">{entry.date}</h3>
                                </div>
                                <div className="space-y-6">
                                    {entry.q1 && (
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">I am grateful for...</h4>
                                            <p className="text-slate-700 whitespace-pre-wrap">{entry.q1}</p>
                                        </div>
                                    )}
                                    {entry.q2 && (
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Make today great</h4>
                                            <p className="text-slate-700 whitespace-pre-wrap">{entry.q2}</p>
                                        </div>
                                    )}
                                    {entry.q3 && (
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Affirmation</h4>
                                            <p className="text-slate-700 whitespace-pre-wrap">{entry.q3}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <RelatedTools currentToolId="gratitude-journal" categoryId="productivity" />
        </ToolPageLayout>
    );
}
