import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LineChart } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function GraphPlotter() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Simple Graph Plotter | MiniTools by Spinotek</title>
                <meta name="description" content="Visualize your data with simple bar or line graphs easily." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <LineChart size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Simple Graph Plotter</h1>
                        <p className="text-slate-500 text-sm">Visualize your data with simple bar or line graphs.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="graph-plotter" categoryId="academic" />
        </ToolPageLayout>
    );
}
