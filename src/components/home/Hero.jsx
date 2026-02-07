import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function Hero() {
    const toggleSearch = () => {
        window.dispatchEvent(new CustomEvent('toggle-search'));
    };

    // Productivity icons for floating ornaments
    const ornaments = [
        { Icon: Icons.Code, size: 32, pos: "top-10 left-[8%]", color: "text-blue-500/60", delay: "0s" },
        { Icon: Icons.Settings, size: 28, pos: "top-20 right-[12%]", color: "text-blue-400/60", delay: "1s" },
        { Icon: Icons.FileText, size: 30, pos: "bottom-20 left-[12%]", color: "text-blue-600/60", delay: "2s" },
        { Icon: Icons.Share2, size: 24, pos: "bottom-40 right-[8%]", color: "text-blue-500/60", delay: "1.5s" },
        { Icon: Icons.Cpu, size: 32, pos: "top-40 left-[18%]", color: "text-blue-400/60", delay: "3s" },
        { Icon: Icons.Layers, size: 28, pos: "bottom-10 right-[22%]", color: "text-blue-600/60", delay: "2.5s" },
    ];

    return (
        <div className="relative pt-10 pb-20 mb-16 overflow-hidden">
            {/* Background Decorative Layers */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                {/* Technical Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle, rgba(37, 99, 235, 0.4) 1.5px, transparent 1.5px),
                            linear-gradient(to right, rgba(37, 99, 235, 0.2) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(37, 99, 235, 0.2) 1px, transparent 1px)
                        `,
                        backgroundSize: '32px 32px, 32px 32px, 32px 32px'
                    }}
                />

                {/* Scanning Beams */}
                <div className="absolute top-0 right-1/3 h-full w-96 bg-gradient-to-r from-transparent via-blue-500/[0.15] to-transparent skew-x-[-45deg] blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
                <div className="absolute top-0 left-1/4 h-full w-64 bg-gradient-to-r from-transparent via-blue-400/[0.2] to-transparent skew-x-[-45deg] blur-2xl" />

                {/* Floating Productivity Ornaments */}
                <div className="absolute inset-0">
                    {ornaments.map((item, idx) => (
                        <div
                            key={idx}
                            // PERBAIKAN 1: Menghapus opacity-0 agar terlihat di mobile
                            // PERBAIKAN 2: Memastikan class animate-float bekerja (lihat config di bawah)
                            className={`absolute ${item.pos} ${item.color} animate-float opacity-80 sm:opacity-100 transition-opacity duration-1000`}
                            style={{ animationDelay: item.delay, animationDuration: '6s' }}
                        >
                            <item.Icon size={item.size} strokeWidth={1.5} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Content with Original Wording Reverted */}
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
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Press</span>
                        <kbd className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono text-xs group-hover:border-blue-300 transition-colors">/</kbd>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">to search</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
