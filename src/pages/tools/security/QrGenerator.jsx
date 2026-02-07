import React from 'react';
import { Helmet } from 'react-helmet-async';
import { QrCode } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function QrGenerator() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>QR Code Generator | Mini Tools by Spinotek</title>
                <meta name="description" content="Generate QR codes for URLs, text, or contact information." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <QrCode size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">QR Code Generator</h1>
                        <p className="text-slate-500 text-sm">Generate QR codes for URLs, text, or contact information.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="qr-gen" categoryId="security" />
        </ToolPageLayout>
    );
}
