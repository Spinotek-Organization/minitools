import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileBarChart } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PriceQuote() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Price Quote Generator | Mini Tools by Spinotek</title>
                <meta name="description" content="Quickly generate professional quotes for clients." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
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

            <ToolPlaceholder />

            <RelatedTools currentToolId="price-quote" categoryId="sales" />
        </ToolPageLayout>
    );
}
