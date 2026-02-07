import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shuffle } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function DecisionMatrix() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Decision Matrix (Pick for me) | Mini Tools by Spinotek</title>
                <meta name="description" content="Stuck? Let the logic help you decide what to do next." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Shuffle size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Decision Matrix</h1>
                        <p className="text-slate-500 text-sm">Stuck? Let the logic help you decide what to do next.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="decision-matrix" categoryId="productivity" />
        </ToolPageLayout>
    );
}
