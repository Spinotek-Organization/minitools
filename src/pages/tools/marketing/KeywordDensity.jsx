import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Activity } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function KeywordDensity() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Keyword Density Checker | MiniTools by Spinotek</title>
                <meta name="description" content="Analyze how often keywords appear in your content." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Activity size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Keyword Density Checker</h1>
                        <p className="text-slate-500 text-sm">Analyze how often keywords appear in your content.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="keyword-density" categoryId="marketing" />
        </ToolPageLayout>
    );
}
