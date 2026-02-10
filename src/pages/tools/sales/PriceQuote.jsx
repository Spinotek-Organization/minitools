import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileBarChart, Plus, Trash2, Printer, Download } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PriceQuote() {
    const [data, setData] = useState({
        quoteNumber: 'Q-1001',
        date: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        providerName: 'Our Company',
        providerAddress: '123 Business Rd, City, Country',
        clientName: 'Client Company',
        clientAddress: '456 Client St, City, Country',
        items: [
            { id: 1, description: 'Service A', quantity: 1, price: 1000 },
            { id: 2, description: 'Service B', quantity: 5, price: 100 },
        ],
        taxRate: 10,
        currency: '$',
        notes: 'This project includes 2 rounds of revisions.',
        terms: 'This is an estimate. Final price may vary by +/- 10%.'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (id, field, value) => {
        setData(prev => ({
            ...prev,
            items: prev.items.map(item => 
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addItem = () => {
        setData(prev => ({
            ...prev,
            items: [...prev.items, { id: Date.now(), description: 'New Item', quantity: 1, price: 0 }]
        }));
    };

    const removeItem = (id) => {
        setData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    const calculateTotals = () => {
        const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        const tax = subtotal * (data.taxRate / 100);
        const total = subtotal + tax;
        return { subtotal, tax, total };
    };

    const totals = calculateTotals();

    const handlePrint = () => {
        window.print();
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Price Quote Generator | MiniTools by Spinotek</title>
                <meta name="description" content="Quickly generate professional quotes for clients." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 print:hidden">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileBarChart size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Price Quote Generator</h1>
                        <p className="text-slate-500 text-sm">Quickly generate professional quotes for clients.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Editor */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-fit print:hidden">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <FileBarChart size={20} className="text-slate-600" />
                        Edit Quote Details
                    </h2>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Quote #</label>
                                <input type="text" name="quoteNumber" value={data.quoteNumber} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Currency Symbol</label>
                                <input type="text" name="currency" value={data.currency} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                                <input type="date" name="date" value={data.date} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Valid Until</label>
                                <input type="date" name="validUntil" value={data.validUntil} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Provider Info</label>
                                <input type="text" name="providerName" value={data.providerName} onChange={handleChange} placeholder="Company Name" className="w-full mb-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none" />
                                <textarea name="providerAddress" value={data.providerAddress} onChange={handleChange} placeholder="Address" rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none resize-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Client Info</label>
                                <input type="text" name="clientName" value={data.clientName} onChange={handleChange} placeholder="Client Name" className="w-full mb-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none" />
                                <textarea name="clientAddress" value={data.clientAddress} onChange={handleChange} placeholder="Address" rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none resize-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Line Items</label>
                            <div className="space-y-3">
                                {data.items.map((item, index) => (
                                    <div key={item.id} className="flex gap-2 items-start">
                                        <div className="flex-1">
                                            <input 
                                                type="text" 
                                                value={item.description} 
                                                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                                placeholder="Description"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-sm outline-none"
                                            />
                                        </div>
                                        <div className="w-20">
                                            <input 
                                                type="number" 
                                                value={item.quantity} 
                                                onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value))}
                                                placeholder="Qty"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-sm outline-none"
                                            />
                                        </div>
                                        <div className="w-24">
                                            <input 
                                                type="number" 
                                                value={item.price} 
                                                onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value))}
                                                placeholder="Price"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-sm outline-none"
                                            />
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="p-2 text-slate-400 hover:text-red-500">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={addItem} className="mt-3 text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                                <Plus size={16} /> Add Item
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tax Rate (%)</label>
                            <input type="number" name="taxRate" value={data.taxRate} onChange={handleChange} className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none" />
                        </div>
                        
                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                             <textarea name="notes" value={data.notes} onChange={handleChange} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none resize-none" />
                        </div>
                         <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Terms / Disclaimer</label>
                             <textarea name="terms" value={data.terms} onChange={handleChange} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-900 outline-none resize-none" />
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="flex flex-col">
                    <div className="flex justify-end mb-4 print:hidden">
                         <button
                            onClick={handlePrint}
                            className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                        >
                            <Printer size={18} />
                            Print / PDF
                        </button>
                    </div>

                    <div id="quote-preview" className="bg-white rounded-none md:rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 print:p-0 print:shadow-none print:border-none print:w-full overflow-hidden flex-1">
                        {/* Quote Header */}
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <div className="text-4xl font-black text-slate-900 mb-2 tracking-tight">QUOTATION</div>
                                <div className="text-slate-500 font-medium">#{data.quoteNumber}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-bold text-slate-900">{data.providerName}</div>
                                <div className="text-slate-500 whitespace-pre-wrap text-sm max-w-[200px] ml-auto">
                                    {data.providerAddress}
                                </div>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="flex justify-between mb-12 border-b border-slate-100 pb-8">
                            <div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quoted For</div>
                                <div className="text-lg font-bold text-slate-900">{data.clientName}</div>
                                <div className="text-slate-500 whitespace-pre-wrap max-w-[250px]">
                                    {data.clientAddress}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="mb-4">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date</div>
                                    <div className="font-medium text-slate-900">{data.date}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Valid Until</div>
                                    <div className="font-medium text-slate-900">{data.validUntil}</div>
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="mb-8">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-slate-900">
                                        <th className="text-left font-bold text-slate-900 py-3 w-1/2">Description</th>
                                        <th className="text-center font-bold text-slate-900 py-3">Qty</th>
                                        <th className="text-right font-bold text-slate-900 py-3">Price</th>
                                        <th className="text-right font-bold text-slate-900 py-3">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.items.map((item) => (
                                        <tr key={item.id} className="border-b border-slate-100">
                                            <td className="py-4 text-slate-700">{item.description}</td>
                                            <td className="py-4 text-center text-slate-700">{item.quantity}</td>
                                            <td className="py-4 text-right text-slate-700">{data.currency}{item.price.toFixed(2)}</td>
                                            <td className="py-4 text-right font-bold text-slate-900">{data.currency}{(item.quantity * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end mb-12">
                            <div className="w-1/2 md:w-1/3 space-y-3">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>{data.currency}{totals.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Tax ({data.taxRate}%)</span>
                                    <span>{data.currency}{totals.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-black text-slate-900 pt-3 border-t-2 border-slate-900">
                                    <span>Total</span>
                                    <span>{data.currency}{totals.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="space-y-6">
                            {(data.notes) && (
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Notes</div>
                                    <p className="text-slate-600 text-sm whitespace-pre-wrap">{data.notes}</p>
                                </div>
                            )}
                            {(data.terms) && (
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Terms</div>
                                    <p className="text-slate-600 text-sm whitespace-pre-wrap italic">{data.terms}</p>
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
                        .print\\:hidden {
                            display: none !important;
                        }
                        #quote-preview,
                        #quote-preview * {
                            visibility: visible;
                        }
                        #quote-preview {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: auto;
                            margin: 0;
                            padding: 2rem !important;
                            border: none;
                            box-shadow: none;
                            background: white;
                            z-index: 9999;
                        }
                    }
                `}
            </style>

            <RelatedTools currentToolId="price-quote" categoryId="sales" />
        </ToolPageLayout>
    );
}
