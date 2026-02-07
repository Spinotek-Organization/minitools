import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function Hero() {
    const toggleSearch = () => {
        window.dispatchEvent(new CustomEvent('toggle-search'));
    };

    // Productivity icons for floating ornaments
    const ornaments = [
        { Icon: Icons.Code, size: 32, pos: "top-10 left-[15%]", color: "text-blue-500", delay: "0s" },
        { Icon: Icons.Settings, size: 28, pos: "top-20 right-[15%]", color: "text-blue-400", delay: "1s" },
        { Icon: Icons.FileText, size: 30, pos: "bottom-20 left-[20%]", color: "text-blue-600", delay: "2s" },
        { Icon: Icons.Share2, size: 24, pos: "bottom-40 right-[15%]", color: "text-blue-500", delay: "1.5s" },
        { Icon: Icons.Cpu, size: 32, pos: "top-40 left-[25%]", color: "text-blue-400", delay: "3s" },
        { Icon: Icons.Layers, size: 28, pos: "bottom-10 right-[25%]", color: "text-blue-600", delay: "2.5s" },
    ];

    return (
        <div className="relative pt-10 pb-20 mb-16 isolate">
            {/* 1. Grid Background - Bottom Layer */}
            <div
                className="absolute inset-0 opacity-[0.3] pointer-events-none"
                style={{
                    backgroundImage: `
                        radial-gradient(circle, rgba(37, 99, 235, 0.4) 1.5px, transparent 1.5px),
                        linear-gradient(to right, rgba(37, 99, 235, 0.2) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(37, 99, 235, 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px, 32px 32px, 32px 32px'
                }}
            />

            {/* 2. Scanning Beams - Middle Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/3 h-full w-96 bg-gradient-to-r from-transparent via-blue-500/[0.1] to-transparent skew-x-[-45deg] blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
                <div className="absolute top-0 left-1/4 h-full w-64 bg-gradient-to-r from-transparent via-blue-400/[0.1] to-transparent skew-x-[-45deg] blur-2xl" />
            </div>

            {/* 3. Floating Ornaments - Above Grid, Below Content */}
            <div className="absolute inset-0 pointer-events-none z-1">
                {ornaments.map((item, idx) => (
                    <div
                        key={idx}
                        className={`absolute ${item.pos} ${item.color} animate-float opacity-100 transition-opacity duration-1000 hidden sm:block`}
                        style={{ animationDelay: item.delay, animationDuration: '6s' }}
                    >
                        <item.Icon size={item.size} strokeWidth={1.5} />
                    </div>
                ))}
            </div>

            {/* 4. Content - Top Layer */}
            <div className="text-center space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] animate-float">
                    <Icons.Zap size={12} /> 120+ Tools and Counting
                </div>

                <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1]">
                    Utility Suite for <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                        Modern Makers.
                    </span>
                </h2>

                <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                    Professional collection of specialized tools for <span className="text-slate-900">developers</span>,
                    <span className="text-slate-900"> marketers</span>, and <span className="text-slate-900">builders</span>.
                    No sign-up. Fast. Flat. Free.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                    <Link to="/explore" className="px-8 py-4 bg-blue-600 text-white font-extrabold rounded-2xl hover:bg-blue-700 transition-all active:scale-95 text-base flex items-center justify-center">
                        Explore Tools
                    </Link>
                    <button className="px-8 py-4 bg-white text-slate-700 font-extrabold rounded-2xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all text-base">
                        View Roadmap
                    </button>
                </div>

                <div className="pt-8 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3 text-slate-400 group cursor-pointer" onClick={toggleSearch}>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Quick Search</span>
                        <div className="flex items-center gap-1.5">
                            <kbd className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono text-[10px] group-hover:border-blue-300 transition-colors shadow-sm uppercase">
                                {window.navigator.platform.toLowerCase().includes('mac') ? '⌘' : 'Ctrl'}
                            </kbd>
                            <span className="text-slate-400 font-black">+</span>
                            <kbd className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono text-[10px] group-hover:border-blue-300 transition-colors shadow-sm">/</kbd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
