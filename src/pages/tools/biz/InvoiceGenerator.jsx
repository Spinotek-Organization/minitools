import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Download, Plus, Trash2, RefreshCw } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function InvoiceGenerator() {
    const { t } = useTranslation();
    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: 'INV-001',
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        currency: '$',
        taxRate: 10,
        discount: 0,
        from: {
            name: 'Your Company Name',
            address: '123 Business St, City, Country',
            email: 'contact@yourcompany.com'
        },
        to: {
            name: 'Client Name',
            address: '456 Client Rd, City, Country',
            email: 'client@example.com'
        },
        items: [
            { id: 1, description: 'Service A', quantity: 1, price: 1000 },
            { id: 2, description: 'Service B', quantity: 2, price: 500 }
        ],
        notes: 'Thank you for your business!'
    });

    const handleChange = (section, field, value) => {
        if (section === 'root') {
            setInvoiceData(prev => ({ ...prev, [field]: value }));
        } else {
            setInvoiceData(prev => ({
                ...prev,
                [section]: { ...prev[section], [field]: value }
            }));
        }
    };

    const handleItemChange = (id, field, value) => {
        setInvoiceData(prev => ({
            ...prev,
            items: prev.items.map(item => 
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addItem = () => {
        setInvoiceData(prev => ({
            ...prev,
            items: [...prev.items, { id: Date.now(), description: 'New Item', quantity: 1, price: 0 }]
        }));
    };

    const removeItem = (id) => {
        setInvoiceData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    const calculateTotals = () => {
        const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        const tax = subtotal * (invoiceData.taxRate / 100);
        const discountAmount = subtotal * (invoiceData.discount / 100); // Percentage discount
        const total = subtotal + tax - discountAmount;
        return { subtotal, tax, discountAmount, total };
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const totals = calculateTotals();

        // Header
        doc.setFontSize(20);
        doc.text(t('tools.invoice-gen.preview'), 14, 22);
        
        doc.setFontSize(10);
        doc.text(`${t('tools.invoice-gen.invoiceNum')} ${invoiceData.invoiceNumber}`, 14, 30);
        doc.text(`${t('tools.invoice-gen.date')}: ${invoiceData.date}`, 14, 35);
        doc.text(`${t('tools.invoice-gen.dueDate')}: ${invoiceData.dueDate}`, 14, 40);

        // From / To
        doc.text(`${t('tools.invoice-gen.from')}:`, 14, 55);
        doc.setFontSize(11);
        doc.text(invoiceData.from.name, 14, 60);
        doc.setFontSize(10);
        doc.text(invoiceData.from.address, 14, 65);
        doc.text(invoiceData.from.email, 14, 70);

        doc.text(`${t('tools.invoice-gen.to')}:`, 105, 55);
        doc.setFontSize(11);
        doc.text(invoiceData.to.name, 105, 60);
        doc.setFontSize(10);
        doc.text(invoiceData.to.address, 105, 65);
        doc.text(invoiceData.to.email, 105, 70);

        // Table
        const tableBody = invoiceData.items.map(item => [
            item.description,
            item.quantity,
            `${invoiceData.currency}${item.price.toFixed(2)}`,
            `${invoiceData.currency}${(item.quantity * item.price).toFixed(2)}`
        ]);

        autoTable(doc, {
            startY: 85,
            head: [[
                t('tools.invoice-gen.table.desc'), 
                t('tools.invoice-gen.table.qty'), 
                t('tools.invoice-gen.table.price'), 
                t('tools.invoice-gen.table.total')
            ]],
            body: tableBody,
        });

        const finalY = (doc).lastAutoTable.finalY + 10;

        // Totals
        doc.text(`${t('tools.invoice-gen.subtotal')}:`, 140, finalY);
        doc.text(`${invoiceData.currency}${totals.subtotal.toFixed(2)}`, 190, finalY, { align: 'right' });

        doc.text(`${t('tools.invoice-gen.tax')} (${invoiceData.taxRate}%):`, 140, finalY + 5);
        doc.text(`${invoiceData.currency}${totals.tax.toFixed(2)}`, 190, finalY + 5, { align: 'right' });

        if (invoiceData.discount > 0) {
             doc.text(`${t('tools.invoice-gen.discount')} (${invoiceData.discount}%):`, 140, finalY + 10);
             doc.text(`-${invoiceData.currency}${totals.discountAmount.toFixed(2)}`, 190, finalY + 10, { align: 'right' });
        }
        
        const totalY = finalY + (invoiceData.discount > 0 ? 18 : 13);

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(`${t('tools.invoice-gen.total')}:`, 140, totalY);
        doc.text(`${invoiceData.currency}${totals.total.toFixed(2)}`, 190, totalY, { align: 'right' });

        // Notes
        if (invoiceData.notes) {
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text(`${t('tools.invoice-gen.notes')}:`, 14, totalY + 10);
            doc.text(invoiceData.notes, 14, totalY + 15, { maxWidth: 100 });
        }

        doc.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);
    };

    const totals = calculateTotals();

    return (
        <ToolPageLayout toolId="invoice-gen">
            <Helmet>
                <title>{t('tools.invoice-gen.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('tools.invoice-gen.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('tools.invoice-gen.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('tools.invoice-gen.desc')}</p>
                    </div>
                </div>
                <button
                    onClick={generatePDF}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg"
                >
                    <Download size={20} />
                    {t('tools.invoice-gen.download')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Form */}
                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">{t('tools.invoice-gen.details')}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.invoice-gen.invoiceNum')}</label>
                                <input
                                    type="text"
                                    value={invoiceData.invoiceNumber}
                                    onChange={(e) => handleChange('root', 'invoiceNumber', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.invoice-gen.currency')}</label>
                                <input
                                    type="text"
                                    value={invoiceData.currency}
                                    onChange={(e) => handleChange('root', 'currency', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.invoice-gen.date')}</label>
                                <input
                                    type="date"
                                    value={invoiceData.date}
                                    onChange={(e) => handleChange('root', 'date', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.invoice-gen.dueDate')}</label>
                                <input
                                    type="date"
                                    value={invoiceData.dueDate}
                                    onChange={(e) => handleChange('root', 'dueDate', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* From / To */}
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 mb-4">{t('tools.invoice-gen.from')}</h2>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Your Company"
                                        value={invoiceData.from.name}
                                        onChange={(e) => handleChange('from', 'name', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                    />
                                    <textarea
                                        placeholder="Address"
                                        value={invoiceData.from.address}
                                        onChange={(e) => handleChange('from', 'address', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 resize-none"
                                        rows={3}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={invoiceData.from.email}
                                        onChange={(e) => handleChange('from', 'email', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 mb-4">{t('tools.invoice-gen.to')}</h2>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Client Name"
                                        value={invoiceData.to.name}
                                        onChange={(e) => handleChange('to', 'name', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                    />
                                    <textarea
                                        placeholder="Client Address"
                                        value={invoiceData.to.address}
                                        onChange={(e) => handleChange('to', 'address', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 resize-none"
                                        rows={3}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Client Email"
                                        value={invoiceData.to.email}
                                        onChange={(e) => handleChange('to', 'email', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                    />
                                </div>
                            </div>
                         </div>
                    </div>

                    {/* Items */}
                     <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">{t('tools.invoice-gen.items')}</h2>
                        <div className="space-y-4">
                            {invoiceData.items.map(item => (
                                <div key={item.id} className="flex gap-2 items-start">
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Qty"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value))}
                                        className="w-16 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value))}
                                        className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                    />
                                    <button onClick={() => removeItem(item.id)} className="p-2 text-slate-400 hover:text-red-500">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            <button onClick={addItem} className="text-sm font-bold text-green-600 flex items-center gap-1">
                                <Plus size={16} /> {t('tools.invoice-gen.addItem')}
                            </button>
                        </div>
                    </div>

                     <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.invoice-gen.taxRate')}</label>
                                <input
                                    type="number"
                                    value={invoiceData.taxRate}
                                    onChange={(e) => handleChange('root', 'taxRate', parseFloat(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.invoice-gen.discount')}</label>
                                <input
                                    type="number"
                                    value={invoiceData.discount}
                                    onChange={(e) => handleChange('root', 'discount', parseFloat(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1">{t('tools.invoice-gen.notes')}</label>
                            <textarea
                                value={invoiceData.notes}
                                onChange={(e) => handleChange('root', 'notes', e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 resize-none"
                                rows={2}
                            />
                        </div>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="sticky top-8 h-fit">
                    <div className="bg-white rounded-none md:rounded-3xl border border-slate-100 shadow-xl p-8 text-sm" id="invoice-preview">
                        {/* Preview Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">{t('tools.invoice-gen.preview')}</h1>
                                <p className="text-slate-500 font-medium mt-1">#{invoiceData.invoiceNumber}</p>
                            </div>
                            <div className="text-right text-slate-500">
                                <p>Date: {invoiceData.date}</p>
                                <p>Due: {invoiceData.dueDate}</p>
                            </div>
                        </div>

                        {/* Addresses */}
                        <div className="flex justify-between mb-8">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">{t('tools.invoice-gen.from')}</p>
                                <p className="font-bold text-slate-900">{invoiceData.from.name}</p>
                                <p className="text-slate-600 whitespace-pre-wrap">{invoiceData.from.address}</p>
                                <p className="text-slate-600">{invoiceData.from.email}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">{t('tools.invoice-gen.to')}</p>
                                <p className="font-bold text-slate-900">{invoiceData.to.name}</p>
                                <p className="text-slate-600 whitespace-pre-wrap">{invoiceData.to.address}</p>
                                <p className="text-slate-600">{invoiceData.to.email}</p>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="mb-8">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-slate-900">
                                        <th className="text-left py-2 font-bold text-slate-900">{t('tools.invoice-gen.table.desc')}</th>
                                        <th className="text-center py-2 font-bold text-slate-900">{t('tools.invoice-gen.table.qty')}</th>
                                        <th className="text-right py-2 font-bold text-slate-900">{t('tools.invoice-gen.table.price')}</th>
                                        <th className="text-right py-2 font-bold text-slate-900">{t('tools.invoice-gen.table.total')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceData.items.map(item => (
                                        <tr key={item.id} className="border-b border-slate-100">
                                            <td className="py-3 text-slate-700">{item.description}</td>
                                            <td className="py-3 text-center text-slate-700">{item.quantity}</td>
                                            <td className="py-3 text-right text-slate-700">{invoiceData.currency}{item.price.toFixed(2)}</td>
                                            <td className="py-3 text-right font-bold text-slate-900">{invoiceData.currency}{(item.quantity * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end mb-8">
                            <div className="w-1/2 space-y-2">
                                <div className="flex justify-between text-slate-600">
                                    <span>{t('tools.invoice-gen.subtotal')}</span>
                                    <span>{invoiceData.currency}{totals.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>{t('tools.invoice-gen.tax')} ({invoiceData.taxRate}%)</span>
                                    <span>{invoiceData.currency}{totals.tax.toFixed(2)}</span>
                                </div>
                                {invoiceData.discount > 0 && (
                                    <div className="flex justify-between text-green-600 font-medium">
                                        <span>{t('tools.invoice-gen.discount')} ({invoiceData.discount}%)</span>
                                        <span>-{invoiceData.currency}{totals.discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-black text-slate-900 pt-2 border-t-2 border-slate-900">
                                    <span>{t('tools.invoice-gen.total')}</span>
                                    <span>{invoiceData.currency}{totals.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {invoiceData.notes && (
                            <div className="border-t border-slate-100 pt-4">
                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">{t('tools.invoice-gen.notes')}</p>
                                <p className="text-slate-600">{invoiceData.notes}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="invoice-gen" categoryId="biz" />
        </ToolPageLayout>
    );
}
