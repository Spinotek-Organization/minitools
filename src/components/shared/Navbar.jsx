import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu as MenuIcon, X, ChevronDown, Github } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { CATEGORIES } from '../../data/categories';
import Logo from './Logo';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSearch = () => {
        window.dispatchEvent(new CustomEvent('toggle-search'));
    };

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/20 bg-blue-700 text-white shadow-lg transition-colors duration-500">
            {/* Background Decorative Layers - Enhanced visibility technical vibe */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* High-visibility Technical Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.22]"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle, rgba(255,255,255,0.4) 1.5px, transparent 1.5px),
                            linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
                        `,
                        backgroundSize: '24px 24px, 24px 24px, 24px 24px'
                    }}
                />

                {/* Brighter Scanning Beams / Data Streams */}
                <div className="absolute top-0 right-1/4 h-full w-80 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent skew-x-[-45deg] blur-2xl animate-[pulse_5s_ease-in-out_infinite]" />
                <div className="absolute top-0 left-1/3 h-full w-48 bg-gradient-to-r from-transparent via-blue-300/25 to-transparent skew-x-[-45deg] blur-xl" />

                {/* Brighter High-precision Details */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/30" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/30" />
                <div className="absolute bottom-0 right-1/4 w-32 h-px bg-white/25" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        {/* Branding */}
                        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                            <div className="h-8 w-8 overflow-hidden rounded-lg bg-white p-1 shadow-inner">
                                <Logo size={24} />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">MiniTools</span>
                                <span className="text-[8px] font-bold opacity-80 tracking-widest leading-none uppercase">by Spinotek</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/" className="text-sm font-bold text-white/70 hover:text-white transition-colors">Home</Link>
                            <Link to="/explore" className="text-sm font-bold text-white/70 hover:text-white transition-colors">Explore Tools</Link>

                            <Menu as="div" className="relative">
                                <Menu.Button className="text-sm font-bold text-white/70 hover:text-white transition-colors flex items-center gap-1 outline-none group">
                                    Categories <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform opacity-60" />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95 translate-y-2"
                                    enterTo="transform opacity-100 scale-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="transform opacity-100 scale-100 translate-y-0"
                                    leaveTo="transform opacity-0 scale-95 translate-y-2"
                                >
                                    <Menu.Items className="absolute left-0 mt-4 w-60 origin-top-left border border-white/10 rounded-2xl bg-blue-800 text-white shadow-2xl focus:outline-none z-50 overflow-hidden p-1.5 ring-1 ring-white/10 backdrop-blur-xl">
                                        <div className="space-y-0.5">
                                            {CATEGORIES.map((cat) => (
                                                <Menu.Item key={cat.id}>
                                                    {({ active }) => (
                                                        <Link
                                                            to={`/category/${cat.id}`}
                                                            className={`${active ? 'bg-white/10 text-white' : 'text-white/70'
                                                                } group flex w-full items-center rounded-xl px-4 py-2 text-sm font-bold transition-all`}
                                                        >
                                                            {cat.name}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <button
                            onClick={toggleSearch}
                            className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 bg-white/10 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/20 transition-all group"
                        >
                            <Search size={16} />
                            <span className="text-xs font-bold tracking-wide">Search tools...</span>
                            <div className="ml-4 flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-all">
                                <kbd className="px-1.5 py-0.5 text-[10px] font-black bg-blue-600 border border-white/20 rounded text-white shadow-sm">
                                    {window.navigator.platform.toLowerCase().includes('mac') ? '⌘' : 'Ctrl'}
                                </kbd>
                                <kbd className="px-1.5 py-0.5 text-[10px] font-black bg-blue-600 border border-white/20 rounded text-white shadow-sm">/</kbd>
                            </div>
                        </button>

                        {/* GitHub Link */}
                        <a
                            href="https://github.com/Spinotek-Organization/minitools"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden md:flex items-center justify-center w-9 h-9 bg-white/10 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/20 transition-all"
                            title="View on GitHub"
                        >
                            <Github size={18} />
                        </a>

                        <div className="flex items-center gap-2">
                            {/* Mobile Menu Toggle */}
                            <button className="md:hidden p-2 text-white/70 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-blue-800 border-b border-white/10 p-4 space-y-1 relative z-50 shadow-2xl">
                    <Link to="/" className="block px-6 py-3 text-white/70 font-bold hover:bg-white/10 hover:text-white rounded-xl transition-all">Home</Link>
                    <Link to="/explore" className="block px-6 py-3 text-white/70 font-bold hover:bg-white/10 hover:text-white rounded-xl transition-all">Explore Tools</Link>
                    <div className="px-6 py-2 text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Categories</div>
                    <div className="grid grid-cols-1 gap-1">
                        {CATEGORIES.map((cat) => (
                            <Link key={cat.id} to={`/category/${cat.id}`} className="block px-6 py-2.5 text-white/70 font-bold hover:bg-white/10 hover:text-white rounded-xl transition-all text-sm">
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
