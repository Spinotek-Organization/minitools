import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Droplets, Plus, Minus, History, Trash2, Trophy } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function WaterReminder() {
    const { t } = useTranslation();
    const [goal, setGoal] = useState(2500);
    const [intake, setIntake] = useState(0);
    const [history, setHistory] = useState([]);
    
    // Load data
    useEffect(() => {
        const savedData = localStorage.getItem('minitools-water');
        if (savedData) {
            const data = JSON.parse(savedData);
            // Check if it's a new day
            const today = new Date().toDateString();
            if (data.date !== today) {
                 setIntake(0);
                 setHistory([]);
            } else {
                setIntake(data.intake || 0);
                setHistory(data.history || []);
            }
            if (data.goal) setGoal(data.goal);
        }
    }, []);

    // Save data
    useEffect(() => {
        localStorage.setItem('minitools-water', JSON.stringify({
            date: new Date().toDateString(),
            intake,
            history,
            goal
        }));
    }, [intake, history, goal]);

    const addWater = (amount) => {
        setIntake(prev => prev + amount);
        setHistory(prev => [{ time: new Date().toLocaleTimeString(), amount }, ...prev]);
    };

    const resetDay = () => {
        if (window.confirm(t('tools.water-reminder.actions.confirmReset'))) {
            setIntake(0);
            setHistory([]);
        }
    };

    const percentage = Math.min(100, Math.round((intake / goal) * 100));

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.water-reminder.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.water-reminder.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Droplets size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.water-reminder.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.water-reminder.desc')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-500">{t('tools.water-reminder.goal')}:</span>
                    <input 
                        type="number" 
                        value={goal}
                        onChange={(e) => setGoal(Number(e.target.value))}
                        className="w-20 p-2 border border-slate-200 rounded-xl text-center font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-500">ml</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Visual */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                     {/* Progress Wave Background (Simplified as gradient height) */}
                     <div className="absolute bottom-0 left-0 w-full bg-blue-50 transition-all duration-1000 ease-in-out z-0" style={{ height: `${percentage}%` }}>
                        <div className="absolute top-0 left-0 w-full h-2 bg-blue-100 opacity-50"></div>
                     </div>

                     <div className="relative z-10 text-center">
                        <div className="text-6xl font-black text-blue-600 mb-2 drop-shadow-sm transition-all">
                            {percentage}%
                        </div>
                        <div className="text-slate-500 font-medium mb-8">
                            {intake} / {goal} ml
                        </div>

                        {percentage >= 100 && (
                            <div className="mb-6 animate-bounce bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold flex items-center gap-2 justify-center">
                                <Trophy size={20} />
                                {t('tools.water-reminder.status.reached')}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                            <button 
                                onClick={() => addWater(250)}
                                className="bg-white border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 text-blue-600 py-3 rounded-2xl font-bold transition-all flex flex-col items-center gap-1 group shadow-sm"
                            >
                                <Plus size={24} className="group-hover:scale-110 transition-transform" />
                                <span>250 ml</span>
                            </button>
                            <button 
                                onClick={() => addWater(500)}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-bold transition-all flex flex-col items-center gap-1 shadow-lg shadow-blue-200"
                            >
                                <Plus size={24} />
                                <span>500 ml</span>
                            </button>
                        </div>
                        
                        <div className="mt-8 flex gap-2">
                             <button onClick={() => addWater(100)} className="px-4 py-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 font-medium transition-colors">
                                +100ml
                             </button>
                             <button onClick={resetDay} className="px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 rounded-xl font-medium transition-colors">
                                {t('tools.water-reminder.actions.reset')}
                             </button>
                        </div>
                     </div>
                </div>

                {/* History Log */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col h-full">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <History size={20} className="text-slate-400" />
                        {t('tools.water-reminder.status.history')}
                    </h3>
                    
                    <div className="flex-1 overflow-y-auto max-h-[400px] pr-2 space-y-3 custom-scrollbar">
                        {history.length === 0 ? (
                            <div className="text-center text-slate-400 py-12">
                                <Droplets size={48} className="mx-auto mb-4 opacity-20" />
                                <p>{t('tools.water-reminder.status.empty')}</p>
                            </div>
                        ) : (
                            history.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <span className="text-slate-500 font-medium text-sm">{item.time}</span>
                                    <span className="font-bold text-blue-600">+{item.amount} ml</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="water-reminder" categoryId="productivity" />
        </ToolPageLayout>
    );
}
