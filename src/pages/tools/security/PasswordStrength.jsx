import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Key, Eye, EyeOff, ShieldCheck, AlertTriangle, CheckCircle, Clock, Zap, Check, X, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import zxcvbn from 'zxcvbn';
import ToolPageLayout from '../../../components/shared/ToolPageLayout';
import RelatedTools from '../../../components/shared/RelatedTools';

const SCORE_LABELS = ['Very Weak', 'Weak', 'So-so', 'Good', 'Strong'];
const SCORE_COLORS = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
const SCORE_TEXT_COLORS = ['text-red-600', 'text-orange-600', 'text-yellow-600', 'text-lime-600', 'text-green-600'];

export default function PasswordStrength() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    // Calculate strength using zxcvbn
    const result = password ? zxcvbn(password) : null;
    const score = result ? result.score : 0;
    
    // Feedback
    const warning = result?.feedback?.warning;
    const suggestions = result?.feedback?.suggestions || [];

    // Composition Checks
    const checks = [
        { label: 'At least 12 characters', valid: password.length >= 12 },
        { label: 'Contains uppercase', valid: /[A-Z]/.test(password) },
        { label: 'Contains lowercase', valid: /[a-z]/.test(password) },
        { label: 'Contains number', valid: /[0-9]/.test(password) },
        { label: 'Contains symbol', valid: /[^A-Za-z0-9]/.test(password) },
    ];

    // Simple Entropy Calculation
    const getEntropy = () => {
        if (!password) return 0;
        let pool = 0;
        if (/[a-z]/.test(password)) pool += 26;
        if (/[A-Z]/.test(password)) pool += 26;
        if (/[0-9]/.test(password)) pool += 10;
        if (/[^A-Za-z0-9]/.test(password)) pool += 32; // Approx symbols
        if (pool === 0) return 0;
        return Math.floor(Math.log2(Math.pow(pool, password.length)));
    };
    const entropy = getEntropy();

    return (
        <ToolPageLayout>
            <Helmet>
                <title>Password Strength Checker | MiniTools by Spinotek</title>
                <meta name="description" content="Test how secure your password is against brute-force attacks with detailed feedback." />
            </Helmet>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                        <Key size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Password Strength Checker</h1>
                        <p className="text-slate-500 text-sm">Analyze your password's resistance to hacking attempts.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Input Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                        <label className="block text-slate-700 font-bold mb-2">My Password</label>
                        <div className="relative mb-4">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Type a password..."
                                className="w-full pl-4 pr-12 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-mono text-lg transition-colors"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        
                        {/* Quick Meter */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                                <span>Strength</span>
                                <span className={result ? SCORE_TEXT_COLORS[score] : 'text-slate-400'}>
                                    {result ? SCORE_LABELS[score] : 'Enter Password'}
                                </span>
                            </div>
                            <div className="flex gap-1 h-2">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 rounded-full transition-all duration-300 ${
                                            result && i <= score ? SCORE_COLORS[score] : 'bg-slate-100'
                                        }`}
                                    ></div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Composition Checklist - NEW */}
                    {password && (
                        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                                <CheckCircle size={18} className="text-slate-400" />
                                Composition Check
                            </h3>
                            <div className="space-y-3">
                                {checks.map((check, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <span className={check.valid ? 'text-slate-700 font-medium' : 'text-slate-400'}>
                                            {check.label}
                                        </span>
                                        {check.valid ? (
                                            <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Check size={14} />
                                            </div>
                                        ) : (
                                            <div className="w-6 h-6 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center flex-shrink-0">
                                                <X size={14} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Analysis Results */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Crack Times & Entropy */}
                    {result && (
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Clock size={20} className="text-slate-400" />
                                    Time to Crack
                                </h3>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                                    <Calculator size={12} />
                                    {entropy} Bits of Entropy
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                                <div className="p-6">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Online Attack</div>
                                    <div className="text-2xl font-black text-slate-800 mb-1">
                                        {result.crack_times_display.online_throttling_100_per_hour}
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Scenario: Attacker guessing via a login form (throttled).
                                    </p>
                                </div>
                                <div className="p-6">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Offline Attack</div>
                                    <div className="text-2xl font-black text-slate-800 mb-1">
                                        {result.crack_times_display.offline_fast_hashing_1e10_per_second}
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Scenario: Attacker has your database hash and a GPU farm.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Feedback & Suggestions */}
                    {result && (
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <ShieldCheck size={20} className="text-slate-400" />
                                    Weakness Analysis
                                </h3>
                            </div>
                            <div className="p-6 space-y-4">
                                
                                {/* Warning */}
                                {warning && (
                                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
                                        <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <h4 className="font-bold text-red-700 text-sm mb-1">Critical Weakness</h4>
                                            <p className="text-red-600 text-sm">{warning}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Suggestions */}
                                {suggestions.length > 0 ? (
                                    <div>
                                        <h4 className="font-bold text-slate-700 text-sm mb-3">Improvement Suggestions:</h4>
                                        <ul className="space-y-2">
                                            {suggestions.map((s, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    score === 4 && (
                                        <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                            <CheckCircle size={24} />
                                            <div>
                                                <div className="font-bold">Excellent Password</div>
                                                <div className="text-sm">No common patterns found. This password is cryptographically strong.</div>
                                            </div>
                                        </div>
                                    )
                                )}

                                {score < 4 && !warning && suggestions.length === 0 && (
                                     <div className="text-slate-500 text-sm italic">
                                        Consider adding more random words or characters to increase entropy.
                                     </div>
                                )}
                            </div>
                        </div>
                    )}

                    {!result && (
                        <div className="bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center text-slate-400">
                            <Key size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="font-medium">Enter a password to see its analysis.</p>
                            <p className="text-sm mt-2">All checking is done locally in your browser. No data is sent anywhere.</p>
                        </div>
                    )}
                </div>
            </div>

            <RelatedTools currentToolId="password-strength" categoryId="security" />
        </ToolPageLayout>
    );
}
