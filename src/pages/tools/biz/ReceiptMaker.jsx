import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileSpreadsheet, Download, Plus, Trash2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function ReceiptMaker() {
    const { t } = useTranslation();
    const [receiptData, setReceiptData] = useState({
        storeName: 'My Store',
        address: '123 Main St, City',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        currency: '$',
        items: [
            { id: 1, name: 'Item 1', price: 10.00 },
            { id: 2, name: 'Item 2', price: 5.50 }
        ],
        taxRate: 5,
        footerMessage: 'Thank you for shopping!'
    });

    const handleChange = (field, value) => {
        setReceiptData(prev => ({ ...prev, [field]: value }));
    };

    const handleItemChange = (id, field, value) => {
        setReceiptData(prev => ({
            ...prev,
            items: prev.items.map(item => 
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addItem = () => {
        setReceiptData(prev => ({
            ...prev,
            items: [...prev.items, { id: Date.now(), name: 'New Item', price: 0 }]
        }));
    };

    const removeItem = (id) => {
        setReceiptData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    const calculateTotals = () => {
        const subtotal = receiptData.items.reduce((sum, item) => sum + item.price, 0);
        const tax = subtotal * (receiptData.taxRate / 100);
        const total = subtotal + tax;
        return { subtotal, tax, total };
    };

    const downloadReceipt = async () => {
        const element = document.getElementById('receipt-preview');
        try {
            const dataUrl = await toPng(element, { backgroundColor: '#ffffff', pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `Receipt-${receiptData.date}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('oops, something went wrong!', error);
        }
    };

    const totals = calculateTotals();

    return (
        <ToolPageLayout toolId="receipt-maker">
            <Helmet>
                <title>{t('tools.receipt-maker.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.receipt-maker.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileSpreadsheet size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.receipt-maker.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.receipt-maker.desc')}</p>
                    </div>
                </div>
                <button
                    onClick={downloadReceipt}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg"
                >
                    <Download size={20} />
                    Download Image
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Inputs */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Store Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Store Name</label>
                                <input
                                    type="text"
                                    value={receiptData.storeName}
                                    onChange={(e) => handleChange('storeName', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    value={receiptData.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={receiptData.date}
                                        onChange={(e) => handleChange('date', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                                    <input
                                        type="time"
                                        value={receiptData.time}
                                        onChange={(e) => handleChange('time', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Items</h2>
                        <div className="space-y-3">
                            {receiptData.items.map(item => (
                                <div key={item.id} className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                        placeholder="Item Name"
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                    />
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value))}
                                        placeholder="Price"
                                        className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                    />
                                    <button onClick={() => removeItem(item.id)} className="p-2 text-slate-400 hover:text-red-500">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            <button onClick={addItem} className="text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 mt-2">
                                <Plus size={16} /> Add Item
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tax Rate (%)</label>
                                <input
                                    type="number"
                                    value={receiptData.taxRate}
                                    onChange={(e) => handleChange('taxRate', parseFloat(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Currency Symbol</label>
                                <input
                                    type="text"
                                    value={receiptData.currency}
                                    onChange={(e) => handleChange('currency', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                             <label className="block text-sm font-medium text-slate-700 mb-1">Footer Message</label>
                             <input
                                type="text"
                                value={receiptData.footerMessage}
                                onChange={(e) => handleChange('footerMessage', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="flex justify-center items-start lg:pt-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-8">
                    <div id="receipt-preview" className="bg-white shadow-lg w-[320px] p-6 text-sm font-mono border-t-8 border-slate-800">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider mb-1">{receiptData.storeName}</h2>
                            <p className="text-slate-500 text-xs">{receiptData.address}</p>
                            <p className="text-slate-500 text-xs mt-2">{receiptData.date} {receiptData.time}</p>
                        </div>

                        <div className="border-b-2 border-dashed border-slate-300 mb-4 pb-2">
                            <div className="flex justify-between font-bold text-xs uppercase text-slate-400 mb-2">
                                <span>Item</span>
                                <span>Price</span>
                            </div>
                            {receiptData.items.map(item => (
                                <div key={item.id} className="flex justify-between mb-1">
                                    <span>{item.name}</span>
                                    <span>{receiptData.currency}{item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-1 mb-6">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Subtotal</span>
                                <span>{receiptData.currency}{totals.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Tax ({receiptData.taxRate}%)</span>
                                <span>{receiptData.currency}{totals.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t-2 border-slate-800 pt-2 mt-2">
                                <span>TOTAL</span>
                                <span>{receiptData.currency}{totals.total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-xs text-slate-500 italic">*{receiptData.footerMessage}*</p>
                            <div className="mt-4 opacity-50">
                                {/* Barcode Simulation */}
                                <div className="h-8 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAYAAAD5PA/NAAAAFklEQVR42mN8//79fwZoYYAxBEjgAA2QA/0C8/UAAAAASUVORK5CYII=')] bg-repeat-x"></div>
                                <p className="text-[10px] mt-1 tracking-[4px]">1234 5678 9012</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="receipt-maker" categoryId="biz" />
        </ToolPageLayout>
    );
}
