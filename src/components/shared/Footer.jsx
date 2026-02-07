import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 pb-12 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4 space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                                <img src="/img/spinotek-symbol.png" alt="Spinotek" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xl font-black text-slate-900 tracking-tighter">Spinotek Tools</span>
                        </Link>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
                            Handcrafted utility suite for modern makers. Built with focus on speed, privacy, and visual excellence.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://spinotek.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                <Globe size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Services</h4>
                        <ul className="space-y-3 text-sm font-bold text-slate-400">
                            <li><a href="https://spinotek.com/web-development" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">Web Dev</a></li>
                            <li><a href="https://spinotek.com/mobile-development" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">Mobile App</a></li>
                            <li><a href="https://spinotek.com/showcase" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">Portfolio</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Platform</h4>
                        <ul className="space-y-3 text-sm font-bold text-slate-400">
                            <li><a href="https://spinotek.com/products" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">Our Products</a></li>
                            <li><a href="https://spinotek.com/about" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">About</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-4 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between">
                        <div className="space-y-2">
                            <h4 className="text-sm font-black text-slate-900">Spinotek</h4>
                            <p className="text-xs text-slate-400 font-medium">Build <span className="text-blue-600 font-bold">Web & App</span> for Your Business.</p>
                        </div>
                        <a href="https://spinotek.com/contact" target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-between px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-900 hover:border-blue-200 hover:bg-blue-50 transition-all">
                            Contact Us
                            <ArrowRight size={14} className="text-blue-600" />
                        </a>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        © {new Date().getFullYear()} <a href="https://spinotek.com" target="_blank" rel="noreferrer" className="text-slate-900 hover:text-blue-600">Spinotek</a>. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>Made in Indonesia</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span>Proprietary Software</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
