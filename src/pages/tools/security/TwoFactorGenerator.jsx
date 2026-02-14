import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Plus, Trash2, Copy, RefreshCw, KeyRound } from 'lucide-react';
import * as OTPAuth from 'otpauth';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function TwoFactorGenerator() {
    const { t } = useTranslation('tools');
    const [accounts, setAccounts] = useState(() => {
        const saved = localStorage.getItem('minitools_2fa_accounts');
        return saved ? JSON.parse(saved) : [];
    });

    const [newAccount, setNewAccount] = useState('');
    const [newSecret, setNewSecret] = useState('');
    const [tokens, setTokens] = useState({});
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        localStorage.setItem('minitools_2fa_accounts', JSON.stringify(accounts));
        updateTokens();
    }, [accounts]);

    useEffect(() => {
        const timer = setInterval(() => {
            updateTokens();
        }, 1000);
        return () => clearInterval(timer);
    }, [accounts]);

    const updateTokens = () => {
        const newTokens = {};
        const now = Math.floor(Date.now() / 1000);
        const period = 30;
        const newProgress = ((now % period) / period) * 100;
        
        setProgress(newProgress);

        accounts.forEach(acc => {
            try {
                // Clean input secret (remove spaces)
                const cleanSecret = acc.secret.replace(/\s/g, '').toUpperCase();
                
                const totp = new OTPAuth.TOTP({
                    issuer: 'MiniTools',
                    label: acc.name,
                    algorithm: 'SHA1',
                    digits: 6,
                    period: 30,
                    secret: OTPAuth.Secret.fromBase32(cleanSecret)
                });
                
                newTokens[acc.id] = totp.generate();
            } catch (err) {
                console.error("Invalid secret for account:", acc.name, err);
                newTokens[acc.id] = 'ERROR';
            }
        });

        setTokens(newTokens);
    };

    const handleAddAccount = (e) => {
        e.preventDefault();
        setError('');

        if (!newAccount.trim() || !newSecret.trim()) {
            setError(t('two-factor-gen.errors.fillAll'));
            return;
        }

        // Basic Base32 validation
        const cleanSecret = newSecret.replace(/\s/g, '').toUpperCase();
        if (!/^[A-Z2-7]+$/.test(cleanSecret)) {
            setError(t('two-factor-gen.errors.invalidSecret'));
            return;
        }

        try {
            // Verify secret works
            OTPAuth.Secret.fromBase32(cleanSecret);

            const newId = Date.now().toString();
            setAccounts([...accounts, { id: newId, name: newAccount, secret: cleanSecret }]);
            setNewAccount('');
            setNewSecret('');
        } catch (err) {
            setError(t('two-factor-gen.errors.invalidFormat'));
        }
    };

    const handleDelete = (id) => {
        if (window.confirm(t('two-factor-gen.list.deleteConfirm'))) {
            setAccounts(accounts.filter(acc => acc.id !== id));
        }
    };

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
    };

    return (
        <ToolPageLayout>
            <Helmet>
                <title>{t('two-factor-gen.title')} | MiniTools by Spinotek</title>
                <meta name="description" content={t('two-factor-gen.desc')} />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">{t('two-factor-gen.title')}</h1>
                        <p className="text-slate-500 text-sm">{t('two-factor-gen.headerDesc')}</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 sticky top-24">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Plus size={20} className="text-blue-600" />
                            {t('two-factor-gen.form.title')}
                        </h2>
                        
                        <form onSubmit={handleAddAccount} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('two-factor-gen.form.nameLabel')}</label>
                                <input
                                    type="text"
                                    value={newAccount}
                                    onChange={(e) => setNewAccount(e.target.value)}
                                    placeholder={t('two-factor-gen.form.namePlaceholder')}
                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">{t('two-factor-gen.form.secretLabel')}</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={newSecret}
                                        onChange={(e) => setNewSecret(e.target.value)}
                                        placeholder={t('two-factor-gen.form.secretPlaceholder')}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono uppercase"
                                    />
                                    <KeyRound size={16} className="absolute left-3 top-2.5 text-slate-400" />
                                </div>
                                <p className="text-xs text-slate-400 mt-1">{t('two-factor-gen.form.base32Note')}</p>
                            </div>

                            {error && (
                                <div className="text-xs text-red-500 bg-red-50 p-2 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                <Plus size={16} />
                                {t('two-factor-gen.form.submit')}
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-400">
                            <Trans i18nKey="two-factor-gen.form.privacy" components={{ strong: <strong /> }} />
                        </div>
                    </div>
                </div>

                {/* Accounts List Section */}
                <div className="lg:col-span-2">
                    {accounts.length === 0 ? (
                        <div className="bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
                            <ShieldCheck size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-slate-900 font-medium mb-1">{t('two-factor-gen.list.emptyTitle')}</h3>
                            <p className="text-slate-500 text-sm">{t('two-factor-gen.list.emptyDesc')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {accounts.map(account => (
                                <div key={account.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                                    {/* Progress background indicator */}
                                    <div 
                                        className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-1000 ease-linear"
                                        style={{ width: `${100 - progress}%` }}
                                    ></div>

                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-bold text-slate-800 text-lg truncate pr-8" title={account.name}>
                                            {account.name}
                                        </h3>
                                        <button 
                                            onClick={() => handleDelete(account.id)}
                                            className="text-slate-300 hover:text-red-500 transition-colors p-1"
                                            title={t('two-factor-gen.list.deleteTooltip')}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mb-2">
                                        <div className="font-mono text-3xl font-black text-blue-600 tracking-wider">
                                            {tokens[account.id] ? (
                                                <>
                                                    {tokens[account.id].slice(0, 3)} <span className="text-blue-300"> </span> {tokens[account.id].slice(3)}
                                                </>
                                            ) : (
                                                <span className="text-slate-200">------</span>
                                            )}
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleCopy(tokens[account.id])}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title={t('two-factor-gen.list.copyTooltip')}
                                        >
                                            <Copy size={20} />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                        <span className="font-mono truncate w-32" title={account.secret}>
                                            {account.secret.substring(0, 4)}...{account.secret.slice(-4)}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <RefreshCw size={10} className={progress > 90 ? "animate-spin" : ""} />
                                            <span>{Math.ceil(30 - (30 * (progress / 100)))}s</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <RelatedTools currentToolId="2fa-gen" categoryId="security" />
        </ToolPageLayout>
    );
}
