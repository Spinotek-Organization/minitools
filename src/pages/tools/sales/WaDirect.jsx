import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageSquare } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function WaDirect() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>WhatsApp Direct Link | Mini Tools by Spinotek</title>
                <meta name="description" content="Send WhatsApp messages without saving numbers." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">WhatsApp Direct Link</h1>
                        <p className="text-slate-500 text-sm">Send WhatsApp messages without saving numbers.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="wa-direct" categoryId="sales" />
        </ToolPageLayout>
    );
}
