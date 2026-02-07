import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function CronEditor() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Crontab Guru | MiniTools by Spinotek</title>
                <meta name="description" content="Visualize and edit cron schedule expressions easily." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Crontab Guru</h1>
                        <p className="text-slate-500 text-sm">Visualize and edit cron schedule expressions easily.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="cron-guru" categoryId="dev" />
        </ToolPageLayout>
    );
}
