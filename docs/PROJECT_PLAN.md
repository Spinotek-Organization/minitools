📑 Project Overview: Mini Tools
Platform Name: Mini Tools (Utility Suite) by Spinotek

Domain: tools.spinotek.com

Tech Stack: React.js, Vite, Tailwind CSS, Headless UI, Lucide Icons.

Core Feature: Command Palette Navigation (Ctrl + /), 120+ Tools, SEO Optimized.

🏗️ Struktur Folder (Clean & Scalable)
Menggunakan pendekatan Atomic Folders untuk manajemen 120+ tools:

Plaintext
src/
├── assets/             // Logo Spinotek & Icons
├── components/         // UI Reusable (Button, Input, Card)
│   ├── shared/         // Layout, Navbar, Footer
│   └── command/        // CommandPalette.jsx (Headless UI Dialog)
├── data/
│   ├── categories.js   // Definisi 10 kategori
│   └── toolsList.js    // Daftar 120 tools & metadatanya
├── hooks/              // useShortcut.js, useSearch.js
├── pages/
│   ├── Home.jsx        // Dashboard utama (Grid view)
│   └── tools/          // Sub-folder per kategori
│       └── dev/
│           └── PasswordGenerator.jsx
└── App.jsx
🛠️ Strategi SEO (Subdomain Optimized)
Dynamic Head Tags: Gunakan react-helmet-async untuk menyuntikkan Meta Title dan Description unik per tool.

Breadcrumbs: Struktur Home > Kategori > Nama Tool untuk mempermudah indexing Google.

Sitemap: File public/sitemap.xml statis berisi seluruh daftar path tools.

📋 Draft Metadata (Daftar Kategori & 120 Tools)
Contoh skema data untuk sistem routing dan pencarian:

JavaScript
// src/data/toolsList.js
export const TOOLS = [
  // CATEGORY: DEV KIT
  { id: 'json-fmt', title: 'JSON Formatter', cat: 'Dev Kit', path: '/dev/json-formatter', desc: 'Rapihkan kode JSON dalam sekejap.' },
  { id: 'pw-gen', title: 'Password Generator', cat: 'Dev Kit', path: '/dev/password-generator', desc: 'Buat password aman & custom.' },
  
  // CATEGORY: BUSINESS
  { id: 'ppn-calc', title: 'Kalkulator PPN', cat: 'Business', path: '/biz/ppn-calculator', desc: 'Hitung PPN 11% dengan mudah.' },
  { id: 'inv-gen', title: 'Invoice Maker', cat: 'Business', path: '/biz/invoice-generator', desc: 'Buat invoice simple format PDF.' },
  
  // ... Tambahkan hingga 120 tools
];
⌨️ Implementasi Command Palette (Headless UI + Tailwind)
Potongan kode ini menggunakan komponen Dialog dari Headless UI untuk transisi modal yang lebih profesional.

JavaScript
// src/components/command/CommandPalette.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { TOOLS } from '../../data/toolsList';
import { Search } from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleDown = (e) => {
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleDown);
    return () => window.removeEventListener("keydown", handleDown);
  }, []);

  const filteredTools = query === "" 
    ? [] 
    : TOOLS.filter((tool) => tool.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-slate-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm outline-none"
                  placeholder="Cari tool atau perintah... (Ctrl + /)"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              {filteredTools.length > 0 && (
                <ul className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-slate-800">
                  {filteredTools.map((tool) => (
                    <li
                      key={tool.id}
                      onClick={() => { navigate(tool.path); setIsOpen(false); }}
                      className="cursor-pointer select-none px-4 py-2 hover:bg-indigo-600 hover:text-white flex justify-between group"
                    >
                      <span className="font-medium">{tool.title}</span>
                      <span className="text-xs text-slate-400 group-hover:text-indigo-200">{tool.cat}</span>
                    </li>
                  ))}
                </ul>
              )}

              {query !== "" && filteredTools.length === 0 && (
                <p className="p-4 text-sm text-slate-500 text-center">Tools tidak ditemukan.</p>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
🚀 Langkah Selanjutnya (Action Plan)
Setup Vite: npm create vite@latest spinotek-tools -- --template react

Install Library Utama:

Bash
npm install -D tailwindcss postcss autoprefixer
npm install @headlessui/react lucide-react react-router-dom react-helmet-async
Inisialisasi Tailwind: npx tailwindcss init -p

Core Component: Bangun Layout.jsx yang membungkus CommandPalette.

Iterasi Tool: Mulai dari kategori Dev Kit karena kodenya paling sederhana.