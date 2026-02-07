import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Smile } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function EmojiPicker() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Emoji Keyboard/Picker | MiniTools by Spinotek</title>
                <meta name="description" content="Quickly find and copy the perfect emojis." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Smile size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Emoji Keyboard/Picker</h1>
                        <p className="text-slate-500 text-sm">Quickly find and copy the perfect emojis.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="emoji-picker" categoryId="content" />
        </ToolPageLayout>
    );
}
