import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CommandPalette from '../command/CommandPalette';

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
