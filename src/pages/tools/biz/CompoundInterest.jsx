import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart3 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function CompoundInterest() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Compound Interest Calculator | Mini Tools by Spinotek</title>
                <meta name="description" content="Project your investment growth with compound interest." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Compound Interest Calculator</h1>
                        <p className="text-slate-500 text-sm">Project your investment growth with compound interest.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="compound-interest" categoryId="biz" />
        </ToolPageLayout>
    );
}
