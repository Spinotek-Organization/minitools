import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function DateDifference() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Date Difference Calc | MiniTools by Spinotek</title>
                <meta name="description" content="Calculate the exact number of days between two dates." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Date Difference Calc</h1>
                        <p className="text-slate-500 text-sm">Calculate the exact number of days between two dates.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="date-diff" categoryId="academic" />
        </ToolPageLayout>
    );
}
