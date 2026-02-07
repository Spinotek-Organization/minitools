import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function GratitudeJournal() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Gratitude Journal | MiniTools by Spinotek</title>
                <meta name="description" content="Improve your well-being by reflecting on positive moments." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Heart size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Gratitude Journal</h1>
                        <p className="text-slate-500 text-sm">Improve your well-being by reflecting on positive moments.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="gratitude-journal" categoryId="productivity" />
        </ToolPageLayout>
    );
}
