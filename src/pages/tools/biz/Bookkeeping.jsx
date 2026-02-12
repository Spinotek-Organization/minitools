import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, TrendingUp, TrendingDown, Trash2, Download, Plus } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function Bookkeeping() {
    const { t } = useTranslation();
    // Load from local storage or default
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('minitools_bookkeeping');
        return saved ? JSON.parse(saved) : [
            { id: 1, type: 'income', desc: 'Client Payment', amount: 5000, date: new Date().toISOString().split('T')[0] },
            { id: 2, type: 'expense', desc: 'Software Subscription', amount: 50, date: new Date().toISOString().split('T')[0] }
        ];
    });

    const [newTrans, setNewTrans] = useState({
        type: 'income',
        desc: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        localStorage.setItem('minitools_bookkeeping', JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = () => {
        if (!newTrans.desc || !newTrans.amount) return;
        
        const transaction = {
            id: Date.now(),
            ...newTrans,
            amount: parseFloat(newTrans.amount)
        };
        
        setTransactions([transaction, ...transactions]);
        setNewTrans({ ...newTrans, desc: '', amount: '' });
    };

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    const calculateTotals = () => {
        const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
        return { income, expense, balance: income - expense };
    };

    const totals = calculateTotals();

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    };

    const downloadCSV = () => {
        const headers = [
            t('tools.bookkeeping.form.date'),
            t('tools.bookkeeping.form.type'),
            t('tools.bookkeeping.form.desc'),
            t('tools.bookkeeping.form.amount')
        ];
        const rows = transactions.map(t => [t.date, t.type, t.desc, t.amount]);
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "bookkeeping-data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <ToolPageLayout toolId="bookkeeping">
            <Helmet>
                <title>{t('tools.bookkeeping.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.bookkeeping.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.bookkeeping.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.bookkeeping.desc')}</p>
                    </div>
                </div>
                <button 
                    onClick={downloadCSV}
                    className="flex items-center gap-2 bg-white text-slate-600 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded-xl font-bold transition-all hover:bg-slate-50"
                >
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl">
                    <div className="flex items-center gap-2 text-emerald-600 mb-2">
                        <TrendingUp size={20} />
                        <span className="font-bold text-sm uppercase">{t('tools.bookkeeping.stats.income')}</span>
                    </div>
                    <div className="text-3xl font-black text-emerald-700">{formatCurrency(totals.income)}</div>
                </div>
                <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl">
                    <div className="flex items-center gap-2 text-rose-600 mb-2">
                        <TrendingDown size={20} />
                        <span className="font-bold text-sm uppercase">{t('tools.bookkeeping.stats.expense')}</span>
                    </div>
                    <div className="text-3xl font-black text-rose-700">{formatCurrency(totals.expense)}</div>
                </div>
                <div className="bg-violet-600 text-white p-6 rounded-3xl shadow-lg shadow-violet-200">
                    <div className="flex items-center gap-2 text-violet-200 mb-2">
                        <BookOpen size={20} />
                        <span className="font-bold text-sm uppercase">{t('tools.bookkeeping.stats.balance')}</span>
                    </div>
                    <div className="text-3xl font-black">{formatCurrency(totals.balance)}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Transaction Form */}
                <div className="lg:col-span-1 h-fit">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm sticky top-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Plus size={20} className="text-violet-600" />
                            {t('tools.bookkeeping.form.title')}
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.bookkeeping.form.type')}</label>
                                <div className="flex bg-slate-100 p-1 rounded-xl">
                                    <button
                                        onClick={() => setNewTrans({...newTrans, type: 'income'})}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${newTrans.type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
                                    >
                                        {t('tools.bookkeeping.form.types.income')}
                                    </button>
                                    <button
                                        onClick={() => setNewTrans({...newTrans, type: 'expense'})}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${newTrans.type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'}`}
                                    >
                                        {t('tools.bookkeeping.form.types.expense')}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.bookkeeping.form.date')}</label>
                                <input
                                    type="date"
                                    value={newTrans.date}
                                    onChange={(e) => setNewTrans({...newTrans, date: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.bookkeeping.form.desc')}</label>
                                <input
                                    type="text"
                                    value={newTrans.desc}
                                    onChange={(e) => setNewTrans({...newTrans, desc: e.target.value})}
                                    placeholder={t('tools.bookkeeping.form.descPlaceholder')}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.bookkeeping.form.amount')}</label>
                                <input
                                    type="number"
                                    value={newTrans.amount}
                                    onChange={(e) => setNewTrans({...newTrans, amount: e.target.value})}
                                    onKeyDown={(e) => e.key === 'Enter' && addTransaction()}
                                    placeholder="0.00"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
                                />
                            </div>

                            <button
                                onClick={addTransaction}
                                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-violet-200"
                            >
                                {t('tools.bookkeeping.form.add')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Transaction List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-900">{t('tools.bookkeeping.list.title')}</h2>
                            {transactions.length > 0 && (
                                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                                    {transactions.length} {t('tools.bookkeeping.list.items')}
                                </span>
                            )}
                        </div>

                        {transactions.length === 0 ? (
                            <div className="p-12 text-center text-slate-400">
                                <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
                                <p>{t('tools.bookkeeping.list.empty')}</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {transactions.map((t) => (
                                    <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                                {t.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{t.desc}</div>
                                                <div className="text-xs text-slate-400">{t.date}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-800'}`}>
                                                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                                            </span>
                                            <button 
                                                onClick={() => deleteTransaction(t.id)}
                                                className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="bookkeeping" categoryId="biz" />
        </ToolPageLayout>
    );
}
