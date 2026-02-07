import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileSpreadsheet } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function ReceiptMaker() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Receipt Maker | MiniTools by Spinotek</title>
                <meta name="description" content="Generate simple digital receipts for your customers." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileSpreadsheet size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Receipt Maker</h1>
                        <p className="text-slate-500 text-sm">Generate simple digital receipts for your customers.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="receipt-maker" categoryId="biz" />
        </ToolPageLayout>
    );
}
