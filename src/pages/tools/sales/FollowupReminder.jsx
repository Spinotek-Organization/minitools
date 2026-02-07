import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Bell } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function FollowupReminder() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Follow-up Reminder | Mini Tools by Spinotek</title>
                <meta name="description" content="Schedule and track your client follow-up timing." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Bell size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Follow-up Reminder</h1>
                        <p className="text-slate-500 text-sm">Schedule and track your client follow-up timing.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="followup-calc" categoryId="sales" />
        </ToolPageLayout>
    );
}
