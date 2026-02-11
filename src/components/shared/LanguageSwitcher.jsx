import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown, Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
    ];

    // Handle potential region codes (e.g., 'en-US')
    const currentLangCode = i18n.resolvedLanguage?.split('-')[0] || 'en';
    const currentLanguage = languages.find((l) => l.code === currentLangCode) || languages[0];

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-white/10 border border-white/10 rounded-xl text-white/90 hover:text-white hover:bg-white/20 transition-all group">
                    <Globe size={16} className="text-white/70 group-hover:text-white transition-colors" />
                    <span className="text-xs font-bold uppercase tracking-wide">{currentLanguage.code}</span>
                    <ChevronDown size={14} className="text-white/50 group-hover:text-white transition-colors" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none overflow-hidden">
                    <div className="p-1">
                        {languages.map((language) => (
                            <Menu.Item key={language.code}>
                                {({ active }) => (
                                    <button
                                        onClick={() => changeLanguage(language.code)}
                                        className={`${
                                            active ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
                                        } flex w-full items-center gap-3 px-3 py-2 text-sm font-bold rounded-lg transition-colors`}
                                    >
                                        <span className="text-lg">{language.flag}</span>
                                        {language.name}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
