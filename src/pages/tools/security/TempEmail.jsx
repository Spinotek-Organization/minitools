import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Mail, ExternalLink, ShieldAlert, Clock, Info } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';



export default function TempEmail() {
    const { t } = useTranslation('tools');

    const PROVIDERS_DATA = [
        {
            id: 'temp-mail',
            name: 'Temp Mail',
            url: 'https://temp-mail.org/',
            color: 'bg-green-50 text-green-600',
            borderColor: 'border-green-100'
        },
        {
            id: '10-min',
            name: '10 Minute Mail',
            url: 'https://10minutemail.com/',
            color: 'bg-orange-50 text-orange-600',
            borderColor: 'border-orange-100'
        },
        {
            id: 'guerrilla',
            name: 'Guerrilla Mail',
            url: 'https://www.guerrillamail.com/',
            color: 'bg-slate-50 text-slate-600',
            borderColor: 'border-slate-100'
        },
        {
            id: 'emailondeck',
            name: 'EmailOnDeck',
            url: 'https://www.emailondeck.com/',
            color: 'bg-blue-50 text-blue-600',
            borderColor: 'border-blue-100'
        },
        {
            id: 'maildrop',
            name: 'MailDrop',
            url: 'https://maildrop.cc/',
            color: 'bg-purple-50 text-purple-600',
            borderColor: 'border-purple-100'
        },
        {
            id: 'burner',
            name: 'Burner Mail',
            url: 'https://burnermail.io/',
            color: 'bg-rose-50 text-rose-600',
            borderColor: 'border-rose-100'
        }
    ];

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('temp-email.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('temp-email.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('temp-email.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('temp-email.desc')}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Email Providers */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PROVIDERS_DATA.map((provider) => (
                        <a 
                            key={provider.name}
                            href={provider.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block p-6 rounded-2xl border ${provider.borderColor} bg-white hover:shadow-md transition-all group relative overflow-hidden`}
                        >
                            
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                                    {provider.name}
                                </h3>
                                <ExternalLink size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                            </div>
                            
                            <p className="text-slate-500 text-sm mb-4 min-h-[40px]">
                                {t(`temp-email.providers.${provider.id}.desc`)}
                            </p>
                            
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-50 py-1.5 px-3 rounded-lg w-fit">
                                <Clock size={12} />
                                {t(`temp-email.providers.${provider.id}.lifespan`)}
                            </div>
                        </a>
                    ))}
                </div>

                {/* Sidebar: Privacy Tips */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6">
                        <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
                            <ShieldAlert size={20} />
                            {t('temp-email.warnings.title')}
                        </h3>
                        <ul className="space-y-3 text-sm text-amber-700">
                            {(t('temp-email.warnings.list', { returnObjects: true }) || []).map((warning, idx) => (
                                <li key={idx} className="flex gap-2">
                                    <span className="select-none">•</span>
                                    {warning}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
                        <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-3">
                            <Info size={20} />
                            {t('temp-email.info.title')}
                        </h3>
                        <p className="text-sm text-blue-700 mb-3">
                            {t('temp-email.info.p1')}
                        </p>
                        <p className="text-sm text-blue-700">
                            {t('temp-email.info.p2')}
                        </p>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="temp-email" categoryId="security" />
        </ToolPageLayout>
    );
}
