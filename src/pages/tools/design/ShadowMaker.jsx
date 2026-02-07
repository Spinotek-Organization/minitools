import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BoxSelect } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function ShadowMaker() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>CSS Shadow Maker | MiniTools by Spinotek</title>
                <meta name="description" content="Visual editor for complex CSS box-shadows." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <BoxSelect size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">CSS Shadow Maker</h1>
                        <p className="text-slate-500 text-sm">Visual editor for complex CSS box-shadows.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="shadow-maker" categoryId="design" />
        </ToolPageLayout>
    );
}
