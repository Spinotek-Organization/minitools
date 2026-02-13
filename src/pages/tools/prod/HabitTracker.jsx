import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Plus, Flame, Trash2, ChevronLeft, ChevronRight, Trophy, Calendar, Layout, Star, X } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function HabitTracker() {
    const { t, i18n } = useTranslation();
    const [habits, setHabits] = useState(() => {
        const saved = localStorage.getItem('minitools-habits');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Drink 2L Water', days: {} },
            { id: 2, name: 'Read for 30 mins', days: {} },
        ];
    });
    const [newHabit, setNewHabit] = useState('');
    const [viewMode, setViewMode] = useState('week'); // 'week' | 'calendar'
    const [weekOffset, setWeekOffset] = useState(0); // For Week View
    const [monthOffset, setMonthOffset] = useState(0); // For Calendar View
    const [selectedDay, setSelectedDay] = useState(null); // For Calendar View detail

    useEffect(() => {
        localStorage.setItem('minitools-habits', JSON.stringify(habits));
    }, [habits]);

    // --- Time Helpers ---
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    // Week View Helpers
    // Start week on Monday. 
    // Note: getDay() returns 0 for Sunday.
    const getWeekDays = (offset) => {
        const d = new Date(today);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1) + (offset * 7); // adjust when day is sunday
        d.setDate(diff);
        
        const days = [];
        for (let i = 0; i < 7; i++) {
            const current = new Date(d);
            current.setDate(d.getDate() + i);
            days.push(current);
        }
        return days;
    };
    const weekDays = getWeekDays(weekOffset);

    // Calendar View Helpers
    const getMonthDays = (offset) => {
        const d = new Date(today.getFullYear(), today.getMonth() + offset, 1);
        const monthName = d.toLocaleDateString(i18n.language, { month: 'long', year: 'numeric' });
        const startDay = d.getDay() === 0 ? 6 : d.getDay() - 1; // 0=Mon, 6=Sun (adjusting JS 0=Sun)
        const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
        
        const days = [];
        // Padding
        for(let i=0; i<startDay; i++) days.push(null);
        // Days
        for(let i=1; i<=daysInMonth; i++) {
            days.push(new Date(d.getFullYear(), d.getMonth(), i));
        }
        return { monthName, days };
    };
    const { monthName, days: monthDays } = getMonthDays(monthOffset);

    // --- Core Logic ---
    const toggleDay = (habitId, dateStr) => {
        setHabits(habits.map(h => {
            if (h.id === habitId) {
                const newDays = { ...h.days };
                if (newDays[dateStr]) delete newDays[dateStr];
                else newDays[dateStr] = true;
                return { ...h, days: newDays };
            }
            return h;
        }));
    };

    const addHabit = (e) => {
        e.preventDefault();
        if (!newHabit.trim()) return;
        setHabits([...habits, { id: Date.now(), name: newHabit, days: {} }]);
        setNewHabit('');
    };

    const deleteHabit = (id) => {
        if(window.confirm(t('tools.habit-tracker.weekView.deleteConfirm'))) {
            setHabits(habits.filter(h => h.id !== id));
        }
    };

    // --- Gamification Logic ---
    const stats = useMemo(() => {
        let totalXP = 0;
        let totalStreaks = 0;

        const processedHabits = habits.map(h => {
            const dates = Object.keys(h.days).sort();
            totalXP += dates.length;

            // Calculate current streak
            let streak = 0;
            // logic same as before...
            let currentCheckDate = new Date(today);
            let broken = false;
            
            // Check today
            if (h.days[currentCheckDate.toISOString().split('T')[0]]) {
                streak++;
            } else {
                // Today not done. Check yesterday.
                currentCheckDate.setDate(currentCheckDate.getDate() - 1);
                if (!h.days[currentCheckDate.toISOString().split('T')[0]]) {
                    broken = true;
                }
            }

            if (!broken) {
                // Continue checking backwards
                while (true) {
                   currentCheckDate.setDate(currentCheckDate.getDate() - 1);
                   if (h.days[currentCheckDate.toISOString().split('T')[0]]) {
                       streak++;
                   } else {
                       break;
                   }
                   if (streak > 365) break; // safety
                }
            }

            totalStreaks = Math.max(totalStreaks, streak);
            return { ...h, streak };
        });

        const level = Math.floor(totalXP / 20) + 1;
        const currentLevelXP = (level - 1) * 20;
        const nextLevelXP = level * 20;
        const progressToNext = ((totalXP - currentLevelXP) / 20) * 100;

        return { totalXP, level, nextLevelXP, progressToNext, processedHabits };
    }, [habits]);

    const calendarHeaderDays = t('tools.habit-tracker.calendarView.days', { returnObjects: true });

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('tools.habit-tracker.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.habit-tracker.desc')} />
            </Helmet>

            {/* Header & Gamification Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.habit-tracker.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.habit-tracker.subtitle')}</p>
                    </div>
                </div>

                {/* Level Card */}
                <div className="flex items-center gap-4 bg-slate-900 text-white p-4 rounded-2xl shadow-lg w-full md:w-auto min-w-[300px]">
                    <div className="relative flex-shrink-0">
                         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center font-black text-xl border-4 border-slate-800 shadow-md">
                            {stats.level}
                         </div>
                         <div className="absolute -bottom-2 -right-1 bg-emerald-500 text-[10px] font-bold px-1.5 py-0.5 rounded text-slate-900 border-2 border-slate-900">
                            {t('tools.habit-tracker.stats.lvl')}
                         </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-xs font-bold mb-1 text-slate-400">
                            <span>{t('tools.habit-tracker.stats.xp')}: {stats.totalXP}</span>
                            <span>{t('tools.habit-tracker.stats.goal')}: {stats.nextLevelXP}</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                            <div 
                                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                                style={{ width: `${Math.max(5, stats.progressToNext)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                 {/* Add Habit */}
                 <form onSubmit={addHabit} className="flex gap-2 flex-1 max-w-lg">
                    <input 
                        type="text" 
                        value={newHabit}
                        onChange={(e) => setNewHabit(e.target.value)}
                        placeholder={t('tools.habit-tracker.placeholder')} 
                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm font-medium text-slate-700"
                    />
                    <button 
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-xl font-medium transition-colors shadow-sm"
                    >
                        <Plus size={20} />
                    </button>
                </form>

                {/* View Switcher */}
                <div className="bg-slate-100 p-1 rounded-xl flex font-bold text-sm h-fit self-start md:self-center">
                    <button 
                        onClick={() => setViewMode('week')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'week' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Layout size={16} /> {t('tools.habit-tracker.views.week')}
                    </button>
                    <button 
                         onClick={() => setViewMode('calendar')}
                         className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Calendar size={16} /> {t('tools.habit-tracker.views.calendar')}
                    </button>
                </div>
            </div>

            {/* --- WEEK VIEW --- */}
            {viewMode === 'week' && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
                        <button onClick={() => setWeekOffset(weekOffset - 1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors"><ChevronLeft size={20} /></button>
                        <span className="font-bold text-slate-700 text-sm md:text-base">
                            {weekDays[0].toLocaleDateString(i18n.language, { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString(i18n.language, { month: 'short', day: 'numeric' })}
                        </span>
                        <button onClick={() => setWeekOffset(weekOffset + 1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors"><ChevronRight size={20} /></button>
                    </div>

                    <div className="grid grid-cols-[1.5fr_repeat(7,1fr)_40px] md:grid-cols-[2fr_repeat(7,1fr)_60px] gap-1 p-4 border-b border-slate-100 bg-slate-50 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider text-center items-center">
                        <div className="text-left pl-2">{t('tools.habit-tracker.weekView.task')}</div>
                        {weekDays.map(d => (
                            <div key={d.toString()} className={d.toISOString().split('T')[0] === todayStr ? 'text-emerald-600 bg-emerald-50 rounded py-1' : ''}>
                                <span className="md:hidden">{d.toLocaleDateString(i18n.language, { weekday: 'narrow' })}</span>
                                <span className="hidden md:inline">{d.toLocaleDateString(i18n.language, { weekday: 'short' })}</span>
                            </div>
                        ))}
                        <div><Flame size={16} className="mx-auto text-orange-400" /></div>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {stats.processedHabits.length === 0 ? (
                            <div className="p-12 text-center text-slate-400">
                                <Trophy size={48} className="mx-auto mb-4 opacity-20" />
                                <p>{t('tools.habit-tracker.weekView.empty')}</p>
                            </div>
                        ) : (
                            stats.processedHabits.map(habit => (
                                <div key={habit.id} className="grid grid-cols-[1.5fr_repeat(7,1fr)_40px] md:grid-cols-[2fr_repeat(7,1fr)_60px] gap-1 p-3 md:p-4 items-center hover:bg-slate-50/50 transition-colors group">
                                    <div className="font-medium text-slate-900 pl-2 text-sm md:text-base truncate flex items-center justify-between gap-1 pr-2">
                                        <span className="truncate" title={habit.name}>{habit.name}</span>
                                        <button 
                                            onClick={() => deleteHabit(habit.id)}
                                            className="text-slate-300 hover:text-rose-500 focus:opacity-100 opacity-0 group-hover:opacity-100 transition-all p-1 flex-shrink-0"
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    {weekDays.map(d => {
                                        const dStr = d.toISOString().split('T')[0];
                                        const isDone = habit.days[dStr];
                                        const isToday = dStr === todayStr;
                                        return (
                                            <div key={dStr} className="flex justify-center">
                                                <button
                                                    onClick={() => toggleDay(habit.id, dStr)}
                                                    className={`w-6 h-6 md:w-8 md:h-8 rounded-lg md:rounded-xl flex items-center justify-center transition-all ${
                                                        isDone 
                                                        ? 'bg-emerald-500 text-white scale-100 shadow-md shadow-emerald-200' 
                                                        : 'bg-slate-100 text-slate-300 hover:bg-slate-200 scale-95'
                                                    } ${isToday && !isDone ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}`}
                                                >
                                                    {isDone && <CheckCircle2 size={16} strokeWidth={3} />}
                                                </button>
                                            </div>
                                        );
                                    })}
                                    <div className="flex justify-center font-black text-orange-500 text-xs md:text-sm">
                                        {habit.streak}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* --- CALENDAR VIEW --- */}
            {viewMode === 'calendar' && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6">
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={() => setMonthOffset(monthOffset - 1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700"><ChevronLeft size={20} /></button>
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{monthName}</h2>
                        <button onClick={() => setMonthOffset(monthOffset + 1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700"><ChevronRight size={20} /></button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
                        {Array.isArray(calendarHeaderDays) && calendarHeaderDays.map(day => (
                            <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase">{day}</div>
                        ))}
                        {monthDays.map((d, i) => {
                            if(!d) return <div key={i} className="aspect-square"></div>;
                            const dStr = d.toISOString().split('T')[0];
                            const isToday = dStr === todayStr;
                            
                            // Calc daily progress
                            let doneCount = 0;
                            habits.forEach(h => { if(h.days[dStr]) doneCount++; });
                            const total = habits.length;
                            const percentage = total > 0 ? (doneCount / total) : 0;
                            
                            // Color intensity based on % done
                            let bgClass = 'bg-slate-50 hover:bg-slate-100';
                            let textClass = 'text-slate-500';
                            
                            if (habits.length > 0 && doneCount > 0) {
                                if (percentage < 0.4) {
                                    bgClass = 'bg-emerald-100 hover:bg-emerald-200';
                                    textClass = 'text-emerald-700';
                                }
                                else if (percentage < 0.8) {
                                    bgClass = 'bg-emerald-300 hover:bg-emerald-400';
                                    textClass = 'text-emerald-900';
                                }
                                else {
                                    bgClass = 'bg-emerald-500 hover:bg-emerald-600 shadow-md shadow-emerald-200';
                                    textClass = 'text-white';
                                }
                            }

                            return (
                                <button 
                                    key={dStr}
                                    onClick={() => setSelectedDay(d)}
                                    className={`aspect-square rounded-xl md:rounded-2xl flex flex-col items-center justify-center gap-1 transition-all relative group ${bgClass} ${isToday ? 'ring-2 ring-emerald-500 ring-offset-2 z-10' : ''}`}
                                >
                                    <span className={`text-xs md:text-sm font-bold ${textClass}`}>{d.getDate()}</span>
                                    {total > 0 && percentage === 1 && (
                                        <div className="absolute top-1 right-1 md:top-2 md:right-2">
                                            <Star size={10} className="text-yellow-400 fill-yellow-400" />
                                        </div>
                                    )}
                                    <div className="block md:hidden w-1 h-1 rounded-full bg-current opacity-50"></div>
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-4 font-medium">{t('tools.habit-tracker.calendarView.hint')}</p>
                </div>
            )}

            {/* Calendar Detail Modal */}
            {selectedDay && viewMode === 'calendar' && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedDay(null)}
                >
                    <div 
                        className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                            <div>
                                <h3 className="text-lg font-black text-slate-800">
                                    {selectedDay.toLocaleDateString(i18n.language, { weekday: 'long', month: 'long', day: 'numeric' })}
                                </h3>
                                <p className="text-slate-500 text-sm font-medium">{t('tools.habit-tracker.modal.title')}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedDay(null)} 
                                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="space-y-3 mb-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {habits.length === 0 && <p className="text-center text-slate-400 py-4">{t('tools.habit-tracker.modal.empty')}</p>}
                            {habits.map(h => {
                                const dStr = selectedDay.toISOString().split('T')[0];
                                const isDone = h.days[dStr];
                                return (
                                    <button 
                                        key={h.id}
                                        onClick={() => toggleDay(h.id, dStr)}
                                        className={`w-full p-4 rounded-xl flex items-center justify-between transition-all border group ${
                                            isDone 
                                            ? 'bg-emerald-50 border-emerald-200' 
                                            : 'bg-white border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        <span className={`font-bold transition-colors ${isDone ? 'text-emerald-900' : 'text-slate-600 group-hover:text-emerald-700'}`}>{h.name}</span>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                            isDone ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-100 text-slate-300 group-hover:bg-emerald-100 group-hover:text-emerald-400'
                                        }`}>
                                            {isDone && <CheckCircle2 size={18} strokeWidth={3} />}
                                            {!isDone && <div className="w-4 h-4 rounded-full border-2 border-current opacity-50"></div>}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        
                        <button 
                            onClick={() => setSelectedDay(null)} 
                            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors shadow-lg shadow-slate-200"
                        >
                            {t('tools.habit-tracker.modal.done')}
                        </button>
                    </div>
                </div>
            )}

            <RelatedTools currentToolId="habit-tracker" categoryId="productivity" />
        </ToolPageLayout>
    );
}
