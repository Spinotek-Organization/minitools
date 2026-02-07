import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function HeadlineAnalyzer() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Headline Analyzer | Mini Tools by Spinotek</title>
                <meta name="description" content="Improve your headlines for better CTR and engagement." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Headline Analyzer</h1>
                        <p className="text-slate-500 text-sm">Improve your headlines for better CTR and engagement.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="headline-analyzer" categoryId="marketing" />
        </ToolPageLayout>
    );
}
