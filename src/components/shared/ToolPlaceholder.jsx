import React from 'react';
import { Info } from 'lucide-react';
import Card from './Card';
import { useTranslation } from 'react-i18next';

export default function ToolPlaceholder() {
    const { t } = useTranslation();

    return (
        <Card className="flex flex-col items-center justify-center py-24 text-center border-dashed border-2 border-slate-100 bg-slate-50/30">
            <div className="w-20 h-20 bg-white rounded-full flex items-center mx-auto justify-center text-slate-400 mb-6 shadow-sm border border-slate-50">
                <Info size={40} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                {t('placeholder.title')}
            </h2>
            <p className="text-slate-500 max-w-md font-medium px-4">
                {t('placeholder.desc')}
            </p>
        </Card>
    );
}
