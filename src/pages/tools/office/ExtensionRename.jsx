import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileType } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';
import { useTranslation } from 'react-i18next';

export default function ExtensionRename() {
    const { t } = useTranslation('tools');
    return (
        <ToolPageLayout toolId="extension-rename">
            <Helmet>
                <title>{t('extension-rename.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('extension-rename.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <FileType size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('extension-rename.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('extension-rename.desc')}</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="extension-rename" categoryId="office" />
        </ToolPageLayout>
    );
}
