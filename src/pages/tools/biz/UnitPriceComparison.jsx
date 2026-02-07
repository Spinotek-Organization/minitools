import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Scale } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function UnitPriceComparison() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Unit Price Comparison | Mini Tools by Spinotek</title>
                <meta name="description" content="Find the best deal by comparing unit prices." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Scale size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Unit Price Comparison</h1>
                        <p className="text-slate-500 text-sm">Find the best deal by comparing unit prices.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="unit-price-comp" categoryId="biz" />
        </ToolPageLayout>
    );
}
