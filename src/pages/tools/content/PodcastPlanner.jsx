import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mic } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PodcastPlanner() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Podcast Episode Planner | Mini Tools by Spinotek</title>
                <meta name="description" content="Organize your podcast episodes and guest notes." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Mic size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Podcast Episode Planner</h1>
                        <p className="text-slate-500 text-sm">Organize your podcast episodes and guest notes.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="podcast-planner" categoryId="content" />
        </ToolPageLayout>
    );
}
