import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileCode } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function MarkdownEditor() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Markdown Editor | MiniTools by Spinotek</title>
                <meta name="description" content="Write and preview Markdown code with a real-time editor." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-fuchsia-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileCode size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Markdown Editor</h1>
                        <p className="text-slate-500 text-sm">Write and preview Markdown with a live editor.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="md-editor" categoryId="office" />
        </ToolPageLayout>
    );
}
