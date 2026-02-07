import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Volume2 } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function TtsPreview() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Text-to-Speech Preview | MiniTools by Spinotek</title>
                <meta name="description" content="Listen to how your scripts sound with AI voices." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Volume2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Text-to-Speech Preview</h1>
                        <p className="text-slate-500 text-sm">Listen to how your scripts sound with AI voices.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="tts-preview" categoryId="content" />
        </ToolPageLayout>
    );
}
