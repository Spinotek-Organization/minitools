import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layers } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function GradientMaker() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>CSS Gradient Maker | MiniTools by Spinotek</title>
                <meta name="description" content="Design and generate CSS linear and radial gradients visually." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Layers size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">CSS Gradient Maker</h1>
                        <p className="text-slate-500 text-sm">Design and generate CSS linear and radial gradients visually.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="gradient-maker" categoryId="design" />
        </ToolPageLayout>
    );
}
