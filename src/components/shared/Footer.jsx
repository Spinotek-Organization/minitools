import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowRight, Instagram, Linkedin, Cpu, Github } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-100 pb-12 pt-24 relative overflow-hidden">
            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

                    {/* Brand Section */}
                    <div className="md:col-span-5 space-y-8">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 flex items-center justify-center p-1.5 bg-slate-50 rounded-xl group-hover:bg-blue-50 group-hover:rotate-[10deg] transition-all duration-500 shadow-sm border border-slate-100">
                                <Logo size={28} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">Mini Tools</span>
                                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.3em] mt-1">By Spinotek</span>
                            </div>
                        </Link>

                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
                            120+ browser-based productivity tools for <span className="text-slate-900">developers</span>, <span className="text-slate-900">creators</span>, and <span className="text-slate-900">professionals</span>. Zero friction. Instant results.
                        </p>

                        {/* Social Media - Premium Style */}
                        <div className="flex items-center gap-3">
                            <SocialLink href="https://spinotek.com" icon={<Globe size={18} />} label="Website" />
                            <SocialLink href="https://github.com/Spinotek-Organization/minitools" icon={<Github size={18} />} label="GitHub" />
                            <SocialLink href="https://www.instagram.com/spinotekcorp/" icon={<Instagram size={18} />} label="Instagram" />
                            <SocialLink href="https://www.linkedin.com/company/spinotek-corp/" icon={<Linkedin size={18} />} label="LinkedIn" />
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-3 grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Services</h4>
                            <ul className="space-y-4 text-sm font-bold text-slate-400">
                                <li><a href="https://spinotek.com/web-development" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">Web Dev <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></a></li>
                                <li><a href="https://spinotek.com/mobile-development" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">Mobile <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></a></li>
                                <li><a href="https://spinotek.com/showcase" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">Showcase <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></a></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Platform</h4>
                            <ul className="space-y-4 text-sm font-bold text-slate-400">
                                <li><a href="https://spinotek.com/products" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">Products</a></li>
                                <li><a href="https://spinotek.com/about" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">Company</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact CTA Card */}
                    <div className="md:col-span-4 group/card">
                        <div className="h-full p-8 bg-slate-950 rounded-[2rem] flex flex-col justify-between relative overflow-hidden transition-transform duration-500 hover:-translate-y-1">
                            {/* Abstract Decor for the card */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[50px] rounded-full -mr-10 -mt-10" />

                            <div className="relative z-10 space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-blue-900/40 p-1.5">
                                    <img src="/img/spinotek-symbol.png" alt="Spinotek" className="w-full h-full object-contain" />
                                </div>
                                <h4 className="text-lg font-bold text-white tracking-tight">Need custom software?</h4>
                                <p className="text-slate-400 text-xs font-medium leading-relaxed">
                                    Spinotek helps businesses build high-performance Web and Mobile applications.
                                </p>
                            </div>

                            <a href="https://spinotek.com/contact" target="_blank" rel="noreferrer" className="relative z-10 mt-8 flex items-center justify-between px-6 py-4 bg-white rounded-2xl text-xs font-black text-slate-900 hover:bg-blue-50 transition-all group/btn">
                                Start Your Project
                                <ArrowRight size={16} className="text-blue-600 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-24 pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            © {currentYear} <a href="https://spinotek.com" target="_blank" rel="noreferrer" className="text-slate-900 hover:text-blue-600 transition-colors">Spinotek Corp</a>
                        </p>
                    </div>

                    <div className="flex items-center gap-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                        <a
                            href="https://github.com/Spinotek-Organization/minitools"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 hover:text-blue-600 transition-colors group"
                        >
                            <Github size={14} className="group-hover:scale-110 transition-transform" />
                            Contribute Here
                            <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                        <div className="flex items-center gap-4">
                            <span className="hover:text-slate-900 cursor-help transition-colors">Privacy</span>
                            <span className="hover:text-slate-900 cursor-help transition-colors">Terms</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Helper Component for Social Links
function SocialLink({ href, icon, label }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300"
        >
            {icon}
        </a>
    );
}