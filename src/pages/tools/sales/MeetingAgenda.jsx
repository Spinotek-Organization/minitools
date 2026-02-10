import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Plus, Trash2, Printer, Copy, Check, FileText } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function MeetingAgenda() {
    const [data, setData] = useState({
        title: 'Project Kickoff',
        date: new Date().toISOString().split('T')[0],
        time: '10:00 AM',
        attendees: '',
        objective: 'Align on project goals and timeline.',
        discussionPoints: ['Scope review', 'Timeline planning', 'Resource allocation'],
        actionItems: []
    });

    const [newPoint, setNewPoint] = useState('');
    const [newItem, setNewItem] = useState('');
    const [copied, setCopied] = useState(false);
    const agendaRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const addPoint = () => {
        if (!newPoint.trim()) return;
        setData(prev => ({ ...prev, discussionPoints: [...prev.discussionPoints, newPoint] }));
        setNewPoint('');
    };

    const removePoint = (index) => {
        setData(prev => ({
            ...prev,
            discussionPoints: prev.discussionPoints.filter((_, i) => i !== index)
        }));
    };

    const addItem = () => {
        if (!newItem.trim()) return;
        setData(prev => ({ ...prev, actionItems: [...prev.actionItems, newItem] }));
        setNewItem('');
    };

    const removeItem = (index) => {
        setData(prev => ({
            ...prev,
            actionItems: prev.actionItems.filter((_, i) => i !== index)
        }));
    };

    const handleCopy = () => {
        if (!agendaRef.current) return;
        const text = agendaRef.current.innerText;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Meeting Agenda Builder | MiniTools by Spinotek</title>
                <meta name="description" content="Plan and structure productive business meetings." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 print:hidden">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Meeting Agenda Builder</h1>
                        <p className="text-slate-500 text-sm">Plan and structure productive business meetings.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Editor - Hidden when printing */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit print:hidden">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <FileText size={20} className="text-emerald-600" />
                        Meeting Details
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Meeting Title</label>
                            <input
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={handleInputChange}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={data.date}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                                <input
                                    type="text"
                                    name="time"
                                    value={data.time}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Attendees</label>
                            <input
                                type="text"
                                name="attendees"
                                value={data.attendees}
                                onChange={handleInputChange}
                                placeholder="e.g. John, Sarah, Mike"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Objective</label>
                            <textarea
                                name="objective"
                                value={data.objective}
                                onChange={handleInputChange}
                                rows={2}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                            />
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Discussion Points</label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={newPoint}
                                    onChange={(e) => setNewPoint(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addPoint()}
                                    placeholder="Add point..."
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                                />
                                <button
                                    onClick={addPoint}
                                    className="bg-emerald-100 text-emerald-700 p-2 rounded-xl hover:bg-emerald-200 transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <ul className="space-y-2">
                                {data.discussionPoints.map((point, i) => (
                                    <li key={i} className="flex items-center justify-between text-sm bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <span>• {point}</span>
                                        <button onClick={() => removePoint(i)} className="text-slate-400 hover:text-red-500">
                                            <Trash2 size={14} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Action Items (Optional)</label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addItem()}
                                    placeholder="Add action item..."
                                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                                />
                                <button
                                    onClick={addItem}
                                    className="bg-emerald-100 text-emerald-700 p-2 rounded-xl hover:bg-emerald-200 transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <ul className="space-y-2">
                                {data.actionItems.map((item, i) => (
                                    <li key={i} className="flex items-center justify-between text-sm bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <span>☐ {item}</span>
                                        <button onClick={() => removeItem(i)} className="text-slate-400 hover:text-red-500">
                                            <Trash2 size={14} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2 print:hidden">
                        <h2 className="text-lg font-bold text-slate-900">Agenda Preview</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopy}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                                    copied ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? 'Copied' : 'Copy Text'}
                            </button>
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                                <Printer size={16} />
                                Print / PDF
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex-1 p-8 print:p-0 print:border-none print:shadow-none">
                        <div ref={agendaRef} className="max-w-2xl mx-auto space-y-8 print:w-full print:max-w-none">
                            <div className="border-b-2 border-slate-900 pb-4">
                                <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">{data.title}</h1>
                                <div className="flex flex-wrap gap-x-8 gap-y-2 text-slate-600 font-medium">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-900">Date:</span> {data.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-900">Time:</span> {data.time}
                                    </div>
                                </div>
                            </div>

                            {data.attendees && (
                                <div>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Attendees</h3>
                                    <p className="text-slate-800 text-lg leading-relaxed">{data.attendees}</p>
                                </div>
                            )}

                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Objective</h3>
                                <div className="text-slate-800 text-lg leading-relaxed italic border-l-4 border-emerald-500 pl-4 bg-emerald-50/50 py-2">
                                    {data.objective || 'No objective specified.'}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Discussion Points</h3>
                                {data.discussionPoints.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-2 text-slate-800 text-lg">
                                        {data.discussionPoints.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-slate-400 italic">No discussion points added.</p>
                                )}
                            </div>

                            {data.actionItems.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Action Items</h3>
                                    <ul className="space-y-3">
                                        {data.actionItems.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="mt-1 w-5 h-5 border-2 border-slate-300 rounded flex-shrink-0" />
                                                <span className="text-slate-800 text-lg">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        #root {
                            display: none;
                        }
                        .print\\:hidden {
                            display: none !important;
                        }
                        /* We want to show only the preview content */
                        .bg-white.rounded-3xl.border.border-slate-100.shadow-sm.overflow-hidden.flex-1.p-8,
                        .bg-white.rounded-3xl.border.border-slate-100.shadow-sm.overflow-hidden.flex-1.p-8 * {
                            visibility: visible;
                        }
                        .bg-white.rounded-3xl.border.border-slate-100.shadow-sm.overflow-hidden.flex-1.p-8 {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: auto;
                            margin: 0;
                            padding: 2rem !important;
                            border: none;
                            box-shadow: none;
                        }
                    }
                `}
            </style>

            <RelatedTools currentToolId="meeting-agenda" categoryId="sales" />
        </ToolPageLayout>
    );
}
