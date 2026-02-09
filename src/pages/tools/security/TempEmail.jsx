import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, ExternalLink, ShieldAlert, Clock, Info } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const PROVIDERS = [
    {
        name: 'Temp Mail',
        url: 'https://temp-mail.org/',
        desc: 'Most popular temporary email service. Simple and fast.',
        lifespan: 'Until browser closed (or manual delete)',
        color: 'bg-green-50 text-green-600',
        borderColor: 'border-green-100'
    },
    {
        name: '10 Minute Mail',
        url: 'https://10minutemail.com/',
        desc: 'Classic disposable email. Gives you 10 minutes, extendable.',
        lifespan: '10 Minutes (Extendable)',
        color: 'bg-orange-50 text-orange-600',
        borderColor: 'border-orange-100'
    },
    {
        name: 'Guerrilla Mail',
        url: 'https://www.guerrillamail.com/',
        desc: 'Feature-rich, customizable addresses. No registration.',
        lifespan: 'Emails kept for 1 hour',
        color: 'bg-slate-50 text-slate-600',
        borderColor: 'border-slate-100'
    },
    {
        name: 'EmailOnDeck',
        url: 'https://www.emailondeck.com/',
        desc: 'Secure and private. Good for strict spam filters.',
        lifespan: 'Variable (usually hours)',
        color: 'bg-blue-50 text-blue-600',
        borderColor: 'border-blue-100'
    },
    {
        name: 'MailDrop',
        url: 'https://maildrop.cc/',
        desc: 'Open inbox system. Great for quick signups.',
        lifespan: 'Files < 100k, cleared inactive',
        color: 'bg-purple-50 text-purple-600',
        borderColor: 'border-purple-100'
    },
    {
        name: 'Burner Mail',
        url: 'https://burnermail.io/',
        desc: 'Forward emails to your real inbox privately.',
        lifespan: 'Requires Extension/Signup',
        color: 'bg-rose-50 text-rose-600',
        borderColor: 'border-rose-100'
    }
];

export default function TempEmail() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Disposable Email Linker | MiniTools by Spinotek</title>
                <meta name="description" content="Quick links to top temporary email services for privacy." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Disposable Email Linker</h1>
                        <p className="text-slate-500 text-sm">Quick links to top temporary email services for privacy.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Email Providers */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PROVIDERS.map((provider) => (
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
                                {provider.desc}
                            </p>
                            
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-50 py-1.5 px-3 rounded-lg w-fit">
                                <Clock size={12} />
                                {provider.lifespan}
                            </div>
                        </a>
                    ))}
                </div>

                {/* Sidebar: Privacy Tips */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6">
                        <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
                            <ShieldAlert size={20} />
                            Important Warnings
                        </h3>
                        <ul className="space-y-3 text-sm text-amber-700">
                            <li className="flex gap-2">
                                <span className="select-none">•</span>
                                Do not use these emails for banking, government services, or sensitive accounts.
                            </li>
                            <li className="flex gap-2">
                                <span className="select-none">•</span>
                                Anyone who guesses the address (for open inboxes) can read your emails.
                            </li>
                            <li className="flex gap-2">
                                <span className="select-none">•</span>
                                Once expired, you cannot recover the emails or the address.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
                        <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-3">
                            <Info size={20} />
                            Why use disposable email?
                        </h3>
                        <p className="text-sm text-blue-700 mb-3">
                            When you sign up for a service just to test it or get a freebie, they often sell your email or spam you.
                        </p>
                        <p className="text-sm text-blue-700">
                            Using a disposable address keeps your real inbox clean and protects your identity.
                        </p>
                    </div>
                </div>
            </div>

            <RelatedTools currentToolId="temp-email" categoryId="security" />
        </ToolPageLayout>
    );
}
