import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function ColdEmail() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Cold Email Templates | Mini Tools by Spinotek</title>
                <meta name="description" content="High-converting templates for your outreach." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Cold Email Templates</h1>
                        <p className="text-slate-500 text-sm">High-converting templates for your outreach.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="cold-email" categoryId="sales" />
        </ToolPageLayout>
    );
}
