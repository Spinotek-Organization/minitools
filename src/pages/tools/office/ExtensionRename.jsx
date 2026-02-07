import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileType } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function ExtensionRename() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>File Extension Renamer | Mini Tools by Spinotek</title>
                <meta name="description" content="Batch change file extensions easily and safely." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileType size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">File Extension Renamer</h1>
                        <p className="text-slate-500 text-sm">Batch change file extensions easily and safely.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="extension-rename" categoryId="office" />
        </ToolPageLayout>
    );
}
