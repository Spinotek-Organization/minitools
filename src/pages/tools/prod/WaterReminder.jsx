import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Droplets } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function WaterReminder() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Water Intake Reminder | MiniTools by Spinotek</title>
                <meta name="description" content="Stay hydrated with smart reminders throughout the day." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Droplets size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Water Intake Reminder</h1>
                        <p className="text-slate-500 text-sm">Stay hydrated with smart reminders throughout the day.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="water-reminder" categoryId="productivity" />
        </ToolPageLayout>
    );
}
