import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Maximize } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function AspectRatioCalc() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Aspect Ratio Calculator | Mini Tools by Spinotek</title>
                <meta name="description" content="Calculate dimensions and ratios for various displays." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Maximize size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Aspect Ratio Calculator</h1>
                        <p className="text-slate-500 text-sm">Calculate dimensions and ratios for various displays.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="aspect-calc" categoryId="design" />
        </ToolPageLayout>
    );
}
