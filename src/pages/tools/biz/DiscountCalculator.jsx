import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Percent } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function DiscountCalculator() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Discount & Sale Calculator | MiniTools by Spinotek</title>
                <meta name="description" content="Calculate final prices after discounts and sales taxes." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Percent size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Discount & Sale Calculator</h1>
                        <p className="text-slate-500 text-sm">Calculate final prices after discounts and sales taxes.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="discount-calc" categoryId="biz" />
        </ToolPageLayout>
    );
}
