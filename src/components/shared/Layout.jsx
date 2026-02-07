import { useNavigate, Link } from 'react-router-dom';
import { Search, Menu as MenuIcon, X, Twitter, ChevronDown, Globe, Smartphone, Briefcase, Layout as LayoutIcon, ArrowRight } from 'lucide-react';
import { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import CommandPalette from '../command/CommandPalette';
import { CATEGORIES } from '../../data/categories';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-900">
            <Navbar />
            <CommandPalette />

            <main className="flex-grow pt-16">
                {children}
            </main>

            <Footer />
        </div>
    );
}

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSearch = () => {
        window.dispatchEvent(new CustomEvent('toggle-search'));
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                                <img src="/img/spinotek-symbol.png" alt="Spinotek" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 tracking-tighter">
                                Spinotek Tools
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">Home</Link>

                            <Menu as="div" className="relative">
                                <Menu.Button className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1 outline-none group">
                                    Categories <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
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
                                    <Menu.Items className="absolute left-0 mt-4 w-60 origin-top-left border border-slate-100 rounded-2xl bg-white shadow-2xl shadow-slate-200/50 focus:outline-none z-50 overflow-hidden p-1.5">
                                        <div className="space-y-0.5">
                                            {CATEGORIES.map((cat) => (
                                                <Menu.Item key={cat.id}>
                                                    {({ active }) => (
                                                        <Link
                                                            to={`/category/${cat.id}`}
                                                            className={`${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
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
                        <button
                            onClick={toggleSearch}
                            className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all group"
                        >
                            <Search size={16} />
                            <span className="text-xs font-bold tracking-wide">Search tools...</span>
                            <kbd className="ml-4 px-1.5 py-0.5 text-[10px] font-black bg-white border border-slate-200 rounded text-slate-300 group-hover:border-blue-200 group-hover:text-blue-400 transition-colors">/</kbd>
                        </button>

                        <div className="flex items-center gap-2">
                            <button className="md:hidden p-2 text-slate-400 hover:text-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-1">
                    <Link to="/" className="block px-6 py-3 text-slate-500 font-bold hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">Home</Link>
                    <div className="px-6 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Categories</div>
                    <div className="grid grid-cols-1 gap-1">
                        {CATEGORIES.map((cat) => (
                            <Link key={cat.id} to={`/category/${cat.id}`} className="block px-6 py-2.5 text-slate-500 font-bold hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all text-sm">
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

function Footer() {
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
                            <h4 className="text-sm font-black text-slate-900">SpinoEcosystem</h4>
                            <p className="text-xs text-slate-400 font-medium">Part of the professional Spinotek infrastructure.</p>
                        </div>
                        <a href="https://spinotek.com" target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-between px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-900 hover:border-blue-200 hover:bg-blue-50 transition-all">
                            Visit spinotek.com
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
