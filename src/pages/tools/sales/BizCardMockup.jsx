import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CreditCard } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function BizCardMockup() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Business Card Mockup | Mini Tools by Spinotek</title>
                <meta name="description" content="Visualize your business card design in realistic mockups." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Business Card Mockup</h1>
                        <p className="text-slate-500 text-sm">Visualize your business card design in realistic mockups.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="biz-card-mockup" categoryId="sales" />
        </ToolPageLayout>
    );
}
