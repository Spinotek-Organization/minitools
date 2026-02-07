import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Zap } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function TiktokHooks() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>TikTok Viral Hook Ideas | Mini Tools by Spinotek</title>
                <meta name="description" content="Get attention-grabbing hooks for your TikToks." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">TikTok Viral Hook Ideas</h1>
                        <p className="text-slate-500 text-sm">Get attention-grabbing hooks for your TikToks.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="tiktok-hooks" categoryId="content" />
        </ToolPageLayout>
    );
}
