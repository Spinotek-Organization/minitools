import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Table } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function CsvToJson() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>CSV to JSON Converter | MiniTools by Spinotek</title>
                <meta name="description" content="Convert spreadsheet or CSV data to JSON format easily." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Table size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">CSV to JSON Converter</h1>
                        <p className="text-slate-500 text-sm">Convert spreadsheet data to JSON format.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="csv-json" categoryId="office" />
        </ToolPageLayout>
    );
}
