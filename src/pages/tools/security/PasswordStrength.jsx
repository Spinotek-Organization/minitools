import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Key } from 'lucide-react';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import ToolPlaceholder from '../../../components/shared/ToolPlaceholder';
import RelatedTools from '../../../components/shared/RelatedTools';

export default function PasswordStrength() {
    return (
        <ToolPageLayout>
            <Helmet>
                <title>Password Strength Checker | Mini Tools by Spinotek</title>
                <meta name="description" content="Test how secure your password is against brute-force attacks." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Key size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Password Strength Checker</h1>
                        <p className="text-slate-500 text-sm">Test how secure your password is against brute-force attacks.</p>
                    </div>
                </div>
            </div>

            <ToolPlaceholder />

            <RelatedTools currentToolId="password-strength" categoryId="security" />
        </ToolPageLayout>
    );
}
