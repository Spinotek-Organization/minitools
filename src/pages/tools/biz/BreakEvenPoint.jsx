import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Target } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function BreakEvenPoint() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Break-Even Point Calculator | MiniTools by Spinotek</title>
                <meta name="description" content="Calculate when your business will become profitable." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Target size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Break-Even Point Calculator</h1>
                        <p className="text-slate-500 text-sm">Calculate when your business will become profitable.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="break-even-calc" categoryId="biz" />
        </ToolPageLayout>
    );
}
