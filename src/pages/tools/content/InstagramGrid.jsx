import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function InstagramGrid() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Instagram Grid Preview | MiniTools by Spinotek</title>
                <meta name="description" content="Plan and visualize your Instagram feed aesthetic." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-fuchsia-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Grid size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Instagram Grid Preview</h1>
                        <p className="text-slate-500 text-sm">Plan and visualize your Instagram feed aesthetic.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="ig-grid" categoryId="content" />
        </ToolPageLayout>
    );
}
