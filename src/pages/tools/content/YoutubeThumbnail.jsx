import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Youtube } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function YoutubeThumbnail() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>YouTube Thumbnail Preview | MiniTools by Spinotek</title>
                <meta name="description" content="Test your thumbnails against various backgrounds." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-700 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Youtube size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">YouTube Thumbnail Preview</h1>
                        <p className="text-slate-500 text-sm">Test your thumbnails against various backgrounds.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="yt-thumbnail" categoryId="content" />
        </ToolPageLayout>
    );
}
