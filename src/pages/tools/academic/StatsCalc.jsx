import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function StatsCalc() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Mean/Median/Mode Calc | MiniTools by Spinotek</title>
                <meta name="description" content="Find the average, middle, and most common values in a set." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <BarChart2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Mean/Median/Mode Calc</h1>
                        <p className="text-slate-500 text-sm">Find the average, middle, and most common values in a set.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="stats-calc" categoryId="academic" />
        </ToolPageLayout>
    );
}
