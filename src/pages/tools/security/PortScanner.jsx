import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Terminal } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PortScanner() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Port Scanner | MiniTools by Spinotek</title>
                <meta name="description" content="Check for open ports on a specific IP or domain." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Terminal size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Port Scanner</h1>
                        <p className="text-slate-500 text-sm">Check for open ports on a specific IP or domain.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="port-scanner" categoryId="security" />
        </ToolPageLayout>
    );
}
