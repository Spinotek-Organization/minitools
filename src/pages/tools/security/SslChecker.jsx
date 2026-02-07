import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Lock } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function SslChecker() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>SSL Certificate Checker | Mini Tools by Spinotek</title>
                <meta name="description" content="Verify the validity and details of a websites SSL certificate." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Lock size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">SSL Certificate Checker</h1>
                        <p className="text-slate-500 text-sm">Verify the validity and details of a websites SSL certificate.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="ssl-checker" categoryId="security" />
        </ToolPageLayout>
    );
}
