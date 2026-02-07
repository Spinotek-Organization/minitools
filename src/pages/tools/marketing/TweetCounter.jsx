import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Twitter } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function TweetCounter() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Twitter/X Thread Counter | MiniTools by Spinotek</title>
                <meta name="description" content="Count characters and manage your X/Twitter thread limits." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Twitter size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Twitter/X Thread Counter</h1>
                        <p className="text-slate-500 text-sm">Count characters and manage your X/Twitter thread limits.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="tweet-counter" categoryId="marketing" />
        </ToolPageLayout>
    );
}
