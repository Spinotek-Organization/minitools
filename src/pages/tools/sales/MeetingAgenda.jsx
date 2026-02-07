import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function MeetingAgenda() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Meeting Agenda Builder | MiniTools by Spinotek</title>
                <meta name="description" content="Plan and structure productive business meetings." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Meeting Agenda Builder</h1>
                        <p className="text-slate-500 text-sm">Plan and structure productive business meetings.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="meeting-agenda" categoryId="sales" />
        </ToolPageLayout>
    );
}
